import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-literals',
  templateUrl: './import-literals.component.html',
  styleUrls: ['./import-literals.component.scss']
})
export class ImportLiteralsComponent implements OnInit {
  @Input() model: any;
  show: any = {
    accordion: []
  }
  constructor() { }

  ngOnInit(): void {
    if(this.model.length > 0) {
      for (let i = 0; i < this.model.length; i++) {
        this.show.accordion.push(false);
      }

      this.show.accordion[0] = true;
    }
  }

  accordionClick(index: number) {
    for (let i = 0; i < this.show.accordion.length; i++) {
      if(index === i) {
        this.show.accordion[i] = true;
      } else {
        this.show.accordion[i] = false;
      }
    }
  }

}
