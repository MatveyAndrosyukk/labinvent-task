import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

interface AppState{
  message: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
