import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input()
  breadcrumb!: Array<string>;
  @Input()
  showBread!: boolean;

  @Output() generateJsonEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  arrayToString() {
    return ' > ' + this.breadcrumb.join(' > ');
  }

  /*search(event: any) {
    const isTrue: boolean = (event.target?.value.length > 0);
    const dataEvent = {
      status: isTrue,
      value: isTrue ? event.target.value : null
    }
    this.keyUpSearchEvent.emit(dataEvent);
  }*/

  generateJson() {
    this.generateJsonEvent.emit();
  }

}
