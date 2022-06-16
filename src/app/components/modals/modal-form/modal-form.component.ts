import { ARR_LANG } from './../../../constants';
import { Component, Input, OnInit } from '@angular/core';
import { MODEL_MODAL_FORM } from 'src/app/constants';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  @Input() fromParent: any;
  model: any;
  arrLangs: any;
  isLoading: boolean;
  translateForm: FormGroup;
  existName: boolean;
  private originModel: any;

  constructor(private activeModal: NgbActiveModal, private fb: FormBuilder, private apiService: ApiService) {
    this.model = _.cloneDeep(MODEL_MODAL_FORM);
    this.arrLangs = _.cloneDeep(ARR_LANG);
    this.isLoading = false;
    this.existName = false;
    this.translateForm = this.fb.group({
      messageText: new FormControl(this.model.lang.ES),
      nameLiteral: new FormControl(this.model.title),
    });
  }

  ngOnInit(): void {
    if (this.fromParent) {
      const element = document.getElementsByClassName('modal-dialog');
      const tabEs = document.getElementById('ES');

      for (var i = 0; i < element.length; i++) {
        element[i].className += " modal-lg modal-xl";
      }

      if (tabEs) {
        tabEs.classList.add('active');
      }

      if (this.fromParent.isNew) {
        this.model.title = `[${this.fromParent.name}] Literal nuevo`;
        //this.model.lang = this.fromParent.selectedLit.lang;
      } else {
        this.model.title = this.fromParent.selectedLit.name;
        this.model.lang = this.fromParent.selectedLit.langs;
        this.setValue(this.model.lang[this.model.selectedLangs], 'messageText');
      }
    }

    this.originModel = _.cloneDeep(this.model);
  }

  closeModal(data: any) {
    if (data.message === 'close') {
      this.model = this.originModel;
      this.fromParent.selectedLit.langs = this.originModel.langs;
    }
    this.activeModal.close(data);
  }

  selectTab(index: any, tab: string) {
    this.model.selected = index;
    this.model.selectedLang = tab;
    this.setValue(tab, 'messageText');
  }

  isActive(index: number) {
    return this.model.selected === index;
  }

  disabledBtnSubmit() {
    let isDisabled = true, isDisabledNew = true;
    const originData = this.originModel.lang[this.model.selectedLang];
    const editData = this.getValue('messageText');
    const isEqualData = originData !== editData;
    this.model.tabsEdit[this.model.selectedLang] = isEqualData;

    for (const key in this.model.tabsEdit) {
      if (Object.prototype.hasOwnProperty.call(this.model.tabsEdit, key) && isDisabled) {
        const element = this.model.tabsEdit[key];
        isDisabled = !element;
      }
    }

    if (this.fromParent.isNew) {
      const nameLiteral = this.getValue('nameLiteral');
      //this.model.title = nameLiteral;
      isDisabledNew = (nameLiteral?.length === 0 || this.existName);

      isDisabled = isDisabled || isDisabledNew;
    }


    return isDisabled;
  }

  checkEditData(tabLang: string) {
    return this.model.tabsEdit[tabLang];
  }

  changeDataTextarea() {
    const originData = this.originModel.lang[this.model.selectedLang];
    const editData = this.model.lang[this.model.selectedLang] = this.getValue('messageText');
    this.model.tabsEdit[this.model.selectedLang] = originData !== editData;
    this.disabledBtnSubmit();
  }

  checkClassActive() {
    return this.model.tabsEdit[this.model.selectedLang];
  }

  saveData() {
    let dataForm = {};
    this.isLoading = true;
    if (this.fromParent.isNew) {
      this.fromParent.selectedLit = {
        id: 0,
        isNew: true,
        name: this.model.nameLiteral,
        langs: this.model.lang
      };
    }

    this.apiService.setDataLit(this.fromParent).subscribe((data: any) => {
      if (data.code === 200) {
        this.closeModal(data);
      }
    });

  }

  getValue(name: string): string {
    return this.translateForm.get(name)?.value
  }

  setValue(_tab: string, name: string) {
    this.translateForm.get(name)?.setValue(this.model.lang[this.model.selectedLang]);
  }

  onFocusOutEvent(event: any) {
    this.existName = false;
    if (this.model.nameLiteral.length > 0) {
      this.fromParent.arrNames.forEach((name: string) => {
        if (!this.existName) {
          this.existName = name.includes(this.model.nameLiteral);
        }
      });
    }
  }

  nameLiteralChange(event: any) {
    if (event) {
      this.model.nameLiteral = event.toUpperCase();
      this.model.nameLiteral.replace(' ', '_');
      this.onFocusOutEvent(event);
    }
  }

}
