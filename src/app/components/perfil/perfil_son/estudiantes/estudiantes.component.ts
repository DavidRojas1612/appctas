import { Component, OnInit } from "@angular/core";
import {
  SactasService,
  Acta,
  studen
} from "../../../../services/sactas.service";
import { NgForm } from "@angular/forms";
import { setTimeout } from "timers";

@Component({
  selector: "app-estudiantes",
  templateUrl: "./estudiantes.component.html",
  styleUrls: ['./estudiantes.component.css']
})
export class estudiantesComponent implements OnInit {
  info: any[] = [];
  actas: any[] = [];
  actasH: any[] = [];
  selected:boolean = false;
  mateChek:boolean = false;
  loading:boolean =false;
  materias:any[]=[];
  num:number = 0;
  estudiante:studen = {
    nombre: null,
    cedula: null,
    notas: [0, 0, 0]
  };

  constructor(private data: SactasService) {}

  ngOnInit() {

    this.data.listarbien().then(resp=>{
      this.actas = resp.Items;
      
    });
  }

  muestra(value:any){  
    
      let found = this.materias.some(acta=>{
        return acta ===value;
      });
      if (!found) { 
        this.materias.push(value);
        console.log(this.materias);
      }else if(found){
        let idx = this.materias.indexOf(value);
        console.log(idx);  
        this.materias.splice(idx,1);
        console.log(this.materias)
      }
    


  }

  guardar(forma:NgForm) {
    console.log(this.estudiante);

    this.data.listarbien().then(resp => {
      this.materias.forEach(id => {
        resp.Items.forEach(acta => {
          console.log(acta);
          if (acta.ID == id) {
            acta.students = [...acta.students, this.estudiante];

            this.data.Insertar(id, acta);
            this.loading = forma.valid;
            setTimeout( ()=>this.loading = false ,1000 )
            
          }
        });
        
      });
      
      forma.reset();
    });
    
  }

  historial(cedula = "00010") {
    this.data.listarbien().then(resp => {
      this.actasH = resp.Items.filter(acta => {
        return acta.students.find(result => {
          return result.cedula === cedula;
        });
      });
      console.log(this.actasH);
    });
  }

  
  ejecutar(forma:NgForm){
    this.loading = forma.valid;
    setTimeout( ()=>this.loading = false ,3000)
    
  }

   
}
