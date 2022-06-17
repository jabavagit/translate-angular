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
  uriOrigin: string = '';
  uriExcel: string = '';

  constructor(private activeModal: NgbActiveModal, private apiService: ApiService) {
    this.isLoading = false;
    this.showForm = true;
  }

  ngOnInit(): void {
    if (this.model) {
      this.uriOrigin = this.model.importOrigin;
      this.uriExcel = this.model.importExcel;
    }
  }

  closeModal(data?: any) {
    this.activeModal.close(data);
  }

  resetOrigin() {
    this.apiService.resetOrigin().subscribe({
      next: (data: any) => {
        if (data.code === 200) {
          this.closeModal('origin');
        }
      },
      error: (e) => console.error(e)
    });
  }

  importExcel() {
    this.apiService.getImport().subscribe({
      next: (data: any) => {
        if (data.code === 200) {
          this.dataImport = data.data;
          this.showForm = true;
          this.closeModal(this.dataImport);
        }
      },
      error: (e) => console.error(e)
    });
  }

}
