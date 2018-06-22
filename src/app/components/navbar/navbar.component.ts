import { Component, OnInit, OnChanges} from '@angular/core';
import {AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {


  constructor(private _sharedService: SharedService,
    private _router:Router,
    private _auth: AuthService) { }


  logged: boolean = false;
  cambio: boolean = false;
  user:any[] = [];

  ngOnInit() {
    
  }

  ngOnChanges(){

    console.log("onchanges");
    
   
  }
 

  cambiar(){
    
    if (this.cambio == false){
      this.cambio = true;
    }else if(this.cambio == true) {
      this.cambio = false;
    }
}
}
