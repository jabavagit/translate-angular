import { ApiService } from 'src/app/services/api.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-import',
  templateUrl: './modal-import.component.html',
  styleUrls: ['./modal-import.component.scss']
})
export class ModalImportComponent implements OnInit {
  @Input() model: any;
  isLoading: boolean;
  showForm: boolean;
  dataImport: any;

  constructor(private activeModal: NgbActiveModal, private apiService: ApiService) {
    this.isLoading = false;
    this.showForm = true;
  }

  ngOnInit(): void {
  }

  closeModal(data: any) {
    this.activeModal.close(data);
  }

  disabledBtnSubmit() {

  }

  clickSubmit() {
    this.apiService.getImport().subscribe((data: any) => {
      if (data.code === 200) {
        this.dataImport = data.data;
        this.showForm = true;
        this.closeModal(this.dataImport);
      }
    });
  }

}
