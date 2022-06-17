import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgPipesModule} from 'ngx-pipes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ModalFormComponent } from './components/modals/modal-form/modal-form.component';
import { MenuComponent } from './components/menu/menu.component';
import { LogComponent } from './components/log/log.component';
import { ListLiteralsComponent } from './components/list-literals/list-literals.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ArrayToStringPipe } from './pipes/array-to-string.pipe';
import { ModalImportComponent } from './components/modals/modal-import/modal-import.component';
import { ImportLiteralsComponent } from './components/import-literals/import-literals.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ModalFormComponent,
    MenuComponent,
    LogComponent,
    ListLiteralsComponent,
    NavbarComponent,
    ArrayToStringPipe,
    ModalImportComponent,
    ImportLiteralsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgPipesModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
