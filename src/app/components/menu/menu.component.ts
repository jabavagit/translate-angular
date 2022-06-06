import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() menu!: any;
  @Output() clickItemEvent = new EventEmitter<any>();
  @Output() btnImportEvent = new EventEmitter<any>();
  activeItem = {
    isActive: false,
    id: null
  };

  constructor() { }

  ngOnInit(): void {
  }

  getMenu(itemClick: any) {
    this.activeItem.id = itemClick.id;
    this.activeItem.isActive = true;
    this.clickItemEvent.emit(itemClick);
  }

  checkActiveItem(id: number) {
    return (id === this.activeItem.id && this.activeItem.isActive);
  }

  btnImport() {
    this.btnImportEvent.emit({});
  }
}
