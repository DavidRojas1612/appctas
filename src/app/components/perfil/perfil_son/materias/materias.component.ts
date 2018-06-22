import { Component, OnInit,OnChanges } from '@angular/core';
import { SactasService } from '../../../../services/sactas.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit, OnChanges {

  constructor(private data: SactasService) {
    this.cargar();
   }

  mates:any[]=[];


  materia = {
    codigo: null,
    grupo: null,
    ID: null,
    nivel: null,
    nombre: null,
    profesor: null,
    students:[]
  }

  ngOnInit() {
   
  }


  ngOnChanges(){

    console.log("onchanges");
    this.cargar();
  }

  cargar(){
    this.data.listarbien().then(resp => {
      this.mates = resp.Items;
    })
  }

  guardarmateria(forma:NgForm){
   this.mates.push(this.materia);
    this.data.InsertarMateria(this.materia);    
    forma.reset();
  }

}
