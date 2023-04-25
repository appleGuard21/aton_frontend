import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {IAuthRequest} from "../interface/IAuthRequest";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  hide: boolean = true;

    registrationForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder, private router: Router,  private auth: AuthService) { }

  ngOnInit(): void {
  }
  // Создание текста ошибок валидатора поля "password"
  getPasswordErrorMessage(){
    if (this.registrationForm.controls.password.hasError('required')) {
      return 'The field must not be empty';
    }
    if (this.registrationForm.controls.password.hasError('minlength')) {
      return 'Password length must be at least 5 characters';
    }
    return '';
  }
  // Создание текста ошибок валидатора поля "email"
  getEmailErrorMessage(){
    if (this.registrationForm.controls.email.hasError('required')) {
      return 'The field must not be empty';
    }
    if (this.registrationForm.controls.email.hasError('email')) {
      return 'Please enter a valid e-mail';
    }
    return '';
  }
  // Регистрация и аутентификация осуществляется если форма валидна,
  // последующее перенаправление пользователя на страницу с табличными данными.
  //     "email": "eve.holt@reqres.in",
  //     "password": "pistol"
  onSubmit() {
    if (this.registrationForm.valid){
      const request: IAuthRequest = this.registrationForm.value as unknown as IAuthRequest;
      this.auth.register(request).subscribe(()=>{
        this.router.navigate(['table'])
      });
    }
  }
}
