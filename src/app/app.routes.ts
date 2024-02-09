import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {authGuard} from "../libs/guards/auth.guard";
import {LoginComponent} from "./login/login.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {alreadyLoggedInGuard} from "../libs/guards/already-logged-in.guard";

export const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  {path: 'dashboard/:id', component: DashboardComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent, canActivate: [alreadyLoggedInGuard]},
  {path: '', component: LoginComponent, canActivate: [alreadyLoggedInGuard]},
  {path: '**', component: PageNotFoundComponent}
];
