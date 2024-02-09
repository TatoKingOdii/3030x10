import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth-service/auth.service";

export const alreadyLoggedInGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isUserAuthenticated()) {
    inject(Router).navigate(['/dashboard']);
  }
  return true;
};
