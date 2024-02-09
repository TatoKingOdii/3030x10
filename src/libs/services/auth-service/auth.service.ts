import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/user";
import {Endpoint, ENDPOINT_BASE, EndpointPaths} from "../../model/endpoints";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  authenticate(user: User, path: string, errHandler: (msg: string) => void) {
    // Validate user
    this.http.get<User[]>(ENDPOINT_BASE + EndpointPaths.get(Endpoint.USERS))
      .subscribe(resp => {
        let idx = resp.findIndex(rsp => user.user === rsp.user && user.pass === rsp.pass);
        if (idx !== -1) {
          this.router.navigate([path]);
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        } else {
          errHandler('Username / Password does not exist!');
        }
      });
  }

  deauthenticate() {
    sessionStorage.removeItem('currentUser');
  }

  isUserAuthenticated() : boolean {
    return sessionStorage.getItem('currentUser') !== null;
  }
}
