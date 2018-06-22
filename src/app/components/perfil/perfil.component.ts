import { Component, OnInit, DoCheck } from '@angular/core';
import {AuthService } from '../../services/auth.service';
import {SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import 'rxjs/operator/map';
import { Subscriber } from 'rxjs/Subscriber';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit , DoCheck{

  info:any[] =[];
  user:any[] =[];
  ver:boolean;
  logged:boolean;
  constructor(
    private _auth: AuthService,
    private _router:Router,
    private shared: SharedService,    
  ) {

    this._auth.state().distinctUntilChanged().subscribe(
      result =>{
        this.logged = result;
        if (this.logged){

          this._auth.Authenticated().distinctUntilChanged()
            .subscribe(
              result =>{
            //this.logged = result;
              console.log(result.signInUserSession.getIdToken().payload);
              this.user = result.signInUserSession.getIdToken().payload;       
          })         

        }
        
      });
   
   }

  ngOnInit() {
     
  }

 
  ngDoCheck(){
    this.shared.changeEmitted$.subscribe(ver=>{    
      this.ver = ver;
       
  });
  }

  logout(){
    this._auth.signOut();
    

  }

}


