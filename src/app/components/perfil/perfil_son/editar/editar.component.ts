import { Component, OnInit } from "@angular/core";
import {
  SactasService,
  studen,
  Acta
} from "../../../../services/sactas.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../../services/auth.service";
import { SharedService } from "../../../../services/shared.service";
import { Angular5Csv } from "angular5-csv/Angular5-csv";
import { NgForm } from "@angular/forms";

@Component({
  selector: "editar-acta",
  templateUrl: "./editar.component.html",
  styleUrls: ["./editar.component.css"]
})
export class EditarComponent implements OnInit {
  result: studen[];
  actas: any[] = [];
  cedula: string = "";
  editar: boolean = false;
  idActa: any = "";
  perfil: any = "";
  notas: any[] = [];
  materia: any = "";
 
  constructor(
    private _auth: AuthService,
    private data: SactasService,
    private rot: ActivatedRoute,
    private shared: SharedService
  ) {
    this._auth.Authenticated().subscribe(result => {
      this.perfil = result.signInUserSession.getIdToken().payload.profile;
    });

    this.cargar();


  }

  ngOnInit() {

  }

  cargar(){
    this.rot.params.subscribe(params => {
      this.idActa = params[ 'id' ];
      this.data.listarbien().then(resp => {
        this.actas = resp.Items;
        this.actas.forEach(element => {
          if (element.ID === params['id']) {
            this.result = element.students;
            this.materia = element;
          }
        });
      });
    });
  }

  editor(ced) {
    this.editar = !this.editar;
    this.cedula = ced.cedula;
    this.notas = Object.assign({}, ced.notas);
  }

  guardarnotas(form: NgForm) {
    this.result.forEach(student => {
      if (student.cedula === this.cedula) {
        student.notas[0] = this.notas[0];
        student.notas[1] = this.notas[1];
        student.notas[2] = this.notas[2];

        this.actas.forEach(element => {
          if (element.ID === this.idActa) {
            element.students = this.result;

            this.data.actualizarData(this.idActa, this.actas);
          }
        });
      }

      localStorage.setItem('data', JSON.stringify(this.result));
    });
    form.reset();
    this.editar = !this.editar;
  }

  eliminar(estudiante) {
    this.result.forEach(student => {
      if (student.cedula === estudiante.cedula) {
        this.actas.forEach(element => {
          if (element.ID === this.idActa) {
            element.students = element.students.filter(studentt => {
              return studentt.cedula !== estudiante.cedula;
            });

            this.data.actualizarData(this.idActa, this.actas);
            this.cargar();
          }
        });
      }
    });
  }

  exportar() {
    const data = [];
    const pre = {
      mate: '',
      grupo:'',
      profesor:''
    };

    pre.grupo = this.materia.grupo;
    pre.mate = this.materia.nombre;
    pre.profesor= this.materia.profesor;
    data.push(pre);
  for (let index = 0; index < this.materia.students.length; index++) {

    data.push(this.materia.students[index]);

  }

    // tslint:disable-next-line:no-unused-expression
    new Angular5Csv(data, 'My Report');

  }

  imprimir(){
    window.print();
  }


}
