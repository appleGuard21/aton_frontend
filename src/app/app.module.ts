import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { TableComponent } from './table/table.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { NavigationComponent } from './navigation/navigation.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import { AddDataComponent } from './add-data/add-data.component';
import { DataUserComponent } from './data-user/data-user.component';
import { DataUsersComponent } from './data-users/data-users.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ToastrModule } from 'ngx-toastr';
import {MessageInterceptorService} from "./services/message-interceptor.service";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: MessageInterceptorService, multi: true }
];

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    TableComponent,
    NavigationComponent,
    AddDataComponent,
    DataUserComponent,
    DataUsersComponent,
    UpdateDataComponent,
    LoginComponent,
    RegistrationComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        RouterOutlet,
        AppRoutingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatMenuModule,
        MatDialogModule,
        ToastrModule.forRoot()
    ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
