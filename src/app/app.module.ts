import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SensorsPageComponent} from './pages/sensors-page/sensors-page.component';
import {RouterOutlet} from "@angular/router";
import {SensorsTableComponent} from './components/sensors-table/sensors-table.component';
import {AddSensorModalComponent} from './components/add-sensor-modal/add-sensor-modal.component';
import {StopPropagationDirective} from './directives/stop-propagation.directive';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    SensorsPageComponent,
    SensorsTableComponent,
    AddSensorModalComponent,
    StopPropagationDirective,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
