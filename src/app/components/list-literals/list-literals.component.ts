import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { ARR_LANG, FILTERS } from '../../constants';

@Component({
  selector: 'app-list-literals',
  templateUrl: './list-literals.component.html',
  styleUrls: ['./list-literals.component.scss']
})
export class ListLiteralsComponent implements OnInit {
  @Input() alerts!: any;
  @Input() selectedProject!: any;
  @Output() clickLiteralEvent = new EventEmitter<any>();

  originSelectedProject: any;
  styleAllEmpty: string;
  activeFilter = {
    isActive: true,
    id: FILTERS.ALL
  };
  show = {
    loading: {
      status: false
    }
  };

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.styleAllEmpty = 'text-muted';
  }

  ngOnInit(): void {
    this.originSelectedProject = _.cloneDeep(this.selectedProject);
    this.activeFiltersCss(FILTERS.ALL);
  }

  selectedLiteral(literal: any) {
    this.clickLiteralEvent.emit(literal);
  }

  checkDataEmpty(data: any): boolean {
    let existEmpty = false;
    let isAllEmpty = false;
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (element.length === 0 || element === '') {
          existEmpty = true;
          isAllEmpty = true;
        }
      }
    }

    this.styleAllEmpty = isAllEmpty ? 'text-danger' : 'text-muted';

    return existEmpty;
  }

  checkAlert(literal: any, idProject: number) {
    let styles = '';
    if (this.alerts?.length > 0) {
      const existWarning = this.alerts.find((alert: any) => {
        return typeof alert.data !== 'string' && idProject === alert.data.idProject && literal.id === alert.data.literal.id
      });
      if (existWarning) {
        styles = 'border border-success'
      }
    }

    return styles;
  }

  countFilterShow(type: string) {
    let countFilter = 0;
    let countUn = 0;

    for (let i = 0; i < this.originSelectedProject.literals.length; i++) {
      const literal = this.originSelectedProject.literals[i];
      let result = false;
      let count = 0;
      for (const key in literal.langs) {
        if (Object.prototype.hasOwnProperty.call(literal.langs, key) && literal.langs[key].length === 0) {
          result = true;
          count++;
        }
      }

      if (count === Object.keys(literal.langs).length) {
        countUn++;
      }

      if (result) {
        countFilter++;
      }
    }

    if (type === FILTERS.MISSING) {
      countFilter = countFilter;
    } else if (type === FILTERS.UNTRANSLATED) {
      countFilter = countUn;
    }

    const btnFilter: any = document.getElementById(`filter-${type}`);
    if (countFilter === 0) {
      btnFilter.toggleAttribute('disabled', true);
    } else {
      btnFilter.toggleAttribute('disabled', false);
    }


    return countFilter;
  }

  clickFilter(type: string) {
    let listData = [];
    let listDataUn = [];
    const origin = _.cloneDeep(this.originSelectedProject);
    this.show.loading.status = true;
    for (const key in origin.literals) {
      let count = 0;
      if (Object.prototype.hasOwnProperty.call(origin.literals, key)) {
        const __literal = origin.literals[key];
        let result = false;
        for (const key in __literal.langs) {
          if (Object.prototype.hasOwnProperty.call(__literal.langs, key) && __literal.langs[key].length === 0) {
            result = true;
            count++;
          }
        }

        if (result) {
          listData.push(__literal);
        }

        if (count === Object.keys(__literal.langs).length) {
          listDataUn.push(__literal);
        }
      }
    }

    if (type === FILTERS.MISSING) {
      if (listData.length > 0) {
        this.selectedProject.literals = listData;
      }
    } else if (type === FILTERS.ALL) {
      this.selectedProject.literals = _.cloneDeep(this.originSelectedProject.literals);
    } else if (type === FILTERS.UNTRANSLATED) {
      if (listDataUn.length > 0) {
        this.selectedProject.literals = listDataUn;
      }
    }

    this.show.loading.status = false;
    this.activeFiltersCss(type);
  }

  checkLangs(langs: any) {
    const arrLangs = ARR_LANG;

    const result = arrLangs.map(lang => {
      let res = lang;
      for (const key in langs) {
        if (Object.prototype.hasOwnProperty.call(langs, key)) {
          const element = langs[key];
          if (lang === key && element.length > 0) {
            res = `<span class="text-success">${lang}</span>`;
          }
        }
      }

      if (!res.includes('text-success')) {
        res = `<span class="text-danger">${res}</span>`;
      }

      return res;
    });

    return this.checkDataEmpty(langs) ? result : '';
  }

  checkColorLangs(langs: any) {
    let result = 'text-muted';
    const arrLangs = Object.keys(langs).map((name) => {
      let values = langs[name];
      return values;
    });

    const _isUntranslated = arrLangs.every(value => value !== '');
    if (_isUntranslated) {
      result = 'text-danger';
    }

    return result;
  }

  activeFiltersCss(filter: string) {
    const oldActive: any = document.getElementById(`filter-${this.activeFilter.id}`);
    oldActive.classList.remove("active");

    const newActive: any = document.getElementById(`filter-${filter}`);
    newActive.classList.add("active");

    this.activeFilter.id = filter;
  }

  newItem() {
    this.clickLiteralEvent.emit();
  }

}
