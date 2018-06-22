import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import Amplify, { Auth } from 'aws-amplify';
import { environment } from './../../environments/environment';




@Injectable()
export class AuthService {

    public loggedIn = new BehaviorSubject(false);

  constructor(private _router:Router)
  {
  }

  //singIn
  public signIn(email, password): Observable<any> {
    return fromPromise(Auth.signIn(email, password))
      .pipe(
        tap(() => this.loggedIn.next(true))
      );
  }
 
  public state(): Observable<any>{ 
    return this.loggedIn.asObservable();
  }

  
  //state of aunthenticate
  public Authenticated(): Observable<any>{
    return fromPromise(Auth.currentAuthenticatedUser()).pipe(
        map(result =>{
            this.loggedIn.next(true);
            return result;
        }),
        catchError(error => {
            this.loggedIn.next(false);
            return of(false);
          })
    );
  }


  //Logout
  public signOut() {
    fromPromise(Auth.signOut())
      .subscribe(
        result => {
          this.loggedIn.next(false);
          this._router.navigate(['']);
        },
        error => console.log(error)
      );
  }


}
