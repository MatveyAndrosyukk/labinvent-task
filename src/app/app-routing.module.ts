import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SensorsPageComponent} from "./pages/sensors-page/sensors-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {AuthGuard} from "./guards/auth-guard.service";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";

const routes: Routes = [
  {path: '', component: SensorsPageComponent, canActivate:  [AuthGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: '**', component: NotFoundPageComponent, pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
  constructor() {
  }
}
