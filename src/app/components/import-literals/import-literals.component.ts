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
  importform: any = [];
  activeLangTabs: any = [];

  constructor() { }

  ngOnInit(): void {
    if(this.model.length > 0) {
      for (let i = 0; i < this.model.length; i++) {
        this.show.accordion.push(false);
        this.activeLangTabs.push('ES');
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

  selectTab(index: any, tab: string) {
    const idTab = document.getElementById(`tab-${index}-${tab}`);
    const divTextAreaActive = document.getElementById(`lang-${index}-${this.activeLangTabs[index]}`);
    const divTextAreaSelected = document.getElementById(`lang-${index}-${tab}`);
    if(divTextAreaActive?.classList && divTextAreaActive.classList.value.includes('show') && divTextAreaActive.classList.value.includes('active') && idTab?.classList) {
      divTextAreaActive.classList.remove('show', 'active');
      idTab.classList.remove('active');
    }
    if(divTextAreaSelected?.classList && idTab?.classList) {
      divTextAreaSelected.classList.add('show', 'active');
      idTab.classList.add('active');
      this.activeLangTabs[index] = tab;
    }
  }

}
