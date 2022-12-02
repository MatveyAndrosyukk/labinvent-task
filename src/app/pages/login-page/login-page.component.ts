import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      login: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    })
  }

  logIn(){
    this.authService.logIn(this.form.value.login, this.form.value.password).subscribe(response => {
      this.router.navigate([''])
    })
  }

  get login(){
    return this.form.controls.login
  }

  get password(){
    return this.form.controls.password
  }
}
