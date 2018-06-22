import { Component, OnInit, Output } from "@angular/core";
import { SactasService, Acta } from "../../../../services/sactas.service";
import { AuthService } from "../../../../services/auth.service";
import { SharedService } from "../../../../services/shared.service";
import { Router } from "@angular/router";
import { locateHostElement } from "@angular/core/src/render3/instructions";
import { element } from "protractor";

@Component({
  selector: "app-actas",
  templateUrl: "./actas.component.html",
  styleUrls: ["./actas.component.css"]
})
export class actasComponent implements OnInit {
  actas: any[] = [];
  actasp: any[] = [];
  perfil: any;
  nombre: any;
  ver:boolean = false;

  constructor(
    private data: SactasService,
    private _auth: AuthService,
    private router: Router,
    private shared: SharedService,
  ) {
    
  }

  ngVer() {
    this.ver = !this.ver
    console.log(this.ver);
    
    this.shared.emitChange(this.ver);
  }

  ngOnInit() {
    this._auth.Authenticated().subscribe(result => {
      this.perfil = result.signInUserSession.getIdToken().payload.profile;
      this.nombre = result.signInUserSession.getIdToken().payload.name;
      console.log(this.nombre);

      this.data.listarbien().then(resp => {
        this.actas = resp.Items;
        this.actas.forEach(element => {
          if (this.nombre === element.profesor) {
            this.actasp.push(element);
          } else if (this.perfil === "admin") {
            this.actasp.push(element);
          }
        });
      });
      console.log(this.actasp);
      
    });
  }

  cargar(){
    
  }

  eliminar(id){
    console.log(id);
    
    let i=0;
    let index=0;
    console.log(this.actasp);
    this.actas.forEach( (resp) => {
   
     if(resp.ID === id){
      index = i;
     }
     i++;
    });
    console.log(index);
    this.actasp.splice(index,1);
    this.data.DeleteMate(id);
    
    
  }
}
