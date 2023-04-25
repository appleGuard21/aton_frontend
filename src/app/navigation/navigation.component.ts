import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    //Подписка на проверку аутентификации пользователя для корректного отображения шаблона
    this.authService.isLoggedIn.subscribe(isLoggedIn=>{
      this.isLoggedIn = isLoggedIn;
    });
  }

  toLogin() {
    this.router.navigate(['login']);
  }

  toRegister() {
    this.router.navigate(['register']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
