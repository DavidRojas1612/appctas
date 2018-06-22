import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  logged:boolean;

  constructor( private _auth: AuthService,){
    this._auth.state().distinctUntilChanged().subscribe(
      result =>{
        this.logged = result;
      });
  }
  
}
