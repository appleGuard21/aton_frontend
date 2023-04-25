import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

// Закрывает доступ к роутам, которые требуют аутентификации при ее отсутствии
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }
  return router.navigate(['']);

};
