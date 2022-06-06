import { ModalImportComponent } from '../../components/modals/modal-import/modal-import.component';
import { ModalFormComponent } from './../../components/modals/modal-form/modal-form.component';
import { COLOR_TEXT, ICONS, LITERAL, LOG_DATA_FOR_TYPE, MODEL_DASHBOARD, SHOW, TYPE_LOG } from './../../constants';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  model: any = MODEL_DASHBOARD;
  show: any = SHOW;
  txtColor: any = COLOR_TEXT;
  icons: any = ICONS;
  typeLog: any = TYPE_LOG;

  constructor(private apiService: ApiService, public modalService: NgbModal) { }

  ngOnInit(): void {
    this.initModel();
    this.apiService.getData('init').subscribe((data: any) => {
      const isError = (data.error?.status) ? data.error?.status : false;
      if (!isError) {
        this.show.menu = true;
        this.show.loading.status = false;
        this.model.menu = data;

        this.setLog(this.typeLog.INFO, 'Inicio OK');
      } else {
        this.buildErrorSection(true, 'Error de conexión con el server', data.error.message)
      }

    }, (error: any) => {
      this.buildErrorSection(true, 'Error de conexión con el server', 'Revisa si has iniciado "translate-api" y luego recarga la página');
    });
  }

  buildErrorSection(status: boolean, title: string, message: string) {
    this.show.loading.status = !status;
    this.show.error.status = status;
    this.show.error.title = title;
    this.show.error.message = message;
  }

  initModel() {
    this.model.breadcrumb = [];
    this.show.breadcrumb = false;
  }

  /**
   * Event emit to click item menu.
   * @param selectedItem 
   */
  getProjectSelected(selectedItem?: any) {
    let id = null;
    if (selectedItem) {
      id = selectedItem.id
    } else {
      id = this.model.selectedProject.id;
    }
    this.show.data = false;
    this.show.list.loading.status = !this.show.data;

    this.apiService.getData(`projects/${id}`).subscribe((data: any) => {
      this.model.selectedProject = data;
      this.updateAlertIfNewLiteral();
      this.model.selectedProjectOrigin = _.cloneDeep(data);
      this.show.data = true;
      this.show.list.loading.status = !this.show.data;
      this.setLog(this.typeLog.INFO, 'GET ' + data.name);

      //Show breadcrumb in navbar
      this.model.breadcrumb = [data.name];
      this.show.breadcrumb = true;
    });
  }

  updateAlertIfNewLiteral() {
    if(this.model.alerts.length > 0 && this.model.alerts[this.model.alerts.length-1].data.literal?.isNew) {
      const dataAlert = this.model.alerts[this.model.alerts.length-1].data.literal;
      const data = this.model.selectedProject.literals.find((literal: any) => {
        return literal.name === dataAlert.name
      });
      dataAlert.id = data.id;
    }
  }

  openModalForm(selectedLiteral: any) {
    const data = LITERAL;

    data.isNew = !(typeof selectedLiteral === 'object');
    data.id = this.model.selectedProject.id;
    data.name = this.model.selectedProject.name;
    data.selectedLit = {};
    data.arrNames = [];

    if (!data.isNew) {
      data.selectedLit = selectedLiteral;
    } else {
      data.arrNames = this.model.selectedProject.literals.map((literal: any) => literal.name);
    }

    const modalRef = this.modalService.open(ModalFormComponent);
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      if (result !== 'close') {
        this.getProjectSelected();
        this.setLog(this.typeLog.SUCCESS, result);
      }

    }).catch((error) => {
      console.error('[error] [modal]' + error);
    });
  }

  setLog(_type: any, _data: any) {
    const typeLogs: any = LOG_DATA_FOR_TYPE;
    const isDataString = (typeof _data === 'string');
    const dataAlert: any = {
      info: {
        class: typeLogs[_type].CLASS,
        text: (isDataString) ? _data : _data.message,
        icon: typeLogs[_type].ICON
      },
      data: (isDataString) ? _data : _data.data
    };

    this.model.alerts.push(dataAlert);
    this.show.alert = this.model.alerts.length > 0;

    if (_type === this.typeLog.SUCCESS) {
      this.model.selectedProject.alerts = dataAlert.data
    }
  }

  /**
   * Event emit to keyup input search.
   * @param data 
   */
  eventSearch(data: any) {
    let result = [];
    if (data.status && this.model.selectedProjectOrigin?.literals && this.model.selectedProjectOrigin?.literals.length > 0) {
      const originLiterals = (this.model.selectedProjectOrigin?.literals) ? this.model.selectedProjectOrigin.literals : [];
      for (let i = 0; i < originLiterals.length; i++) {
        const element = originLiterals[i];
        if (element.name.includes(data.value.toUpperCase())) {
          result.push(element);
        }
      }
    }

    this.model.selectedProject.literals = result;
  }

  eventGenerateJson(event: Event) {
    this.apiService.generateJsonProject(this.model.selectedProject.id).subscribe((data: any) => {
      // TODO: show ok/ko
    });
  }

  btnImport(event: any) {
    const modalRef = this.modalService.open(ModalImportComponent);
    modalRef.componentInstance.model = null;
    modalRef.result.then((result) => {
      if (result !== 'close') {
        this.setLog(this.typeLog.SUCCESS, 'close');
        this.show.dataImport = true;
        this.model.importData = result;
      }

    }).catch((error) => {
      console.error('[error] [modal]' + error);
    });
  }

}
