import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {authGuard} from "./authGuard";
import {StartComponent} from "../start/start.component";
import {LoginComponent} from "../login/login.component";
import {RegistrationComponent} from "../registration/registration.component";
import {TableComponent} from "../table/table.component";
import {signInUpGuard} from "./signInUpGuard";
import {DataUsersComponent} from "../data-users/data-users.component";
import {startGuard} from "./startGuard";

const routes: Routes = [
  { path: 'start', component: StartComponent, canActivate: [startGuard]},
  { path: 'login', component: LoginComponent, canActivate: [signInUpGuard]},
  { path: 'register', component: RegistrationComponent, canActivate: [signInUpGuard]},
  { path: 'table', component: TableComponent, canActivate: [authGuard]},
  { path: 'data', component: DataUsersComponent, canActivate: [authGuard]},
  { path: '', redirectTo: 'start', pathMatch: "full"}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
