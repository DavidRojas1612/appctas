import { Component, OnInit } from "@angular/core";
import { SactasService } from "../../../../services/sactas.service";

@Component({
  selector: "app-historial",
  templateUrl: "./historial.component.html",
  styleUrls: ["./historial.component.css"]
})
export class HistorialComponent implements OnInit {
  constructor(private data: SactasService) {}
  actasH: any[] = [];
  notas = {
    nombre: [],
    notas: []
  };
  histo: any[] = [];
  ngOnInit() {}

  historial(cedula) {
    this.histo = [];
    this.notas = {
      nombre: [],
      notas: []
    };
    this.data.listarbien().then(resp => {
      this.actasH = resp.Items.filter(acta => {
        return acta.students.find(result => {
          return result.cedula === cedula;
        });
      });

      console.log(this.actasH);
      this.actasH.forEach(resp => {
        resp.students.find(n => {
          if (cedula === n.cedula) {
            this.notas.nombre.push(resp.nombre);
            this.notas.notas.push(n.notas);
          }
        });
      });

      for (let i = 0; i < this.notas.nombre.length; i++) {
        let obj = {
          nombre: this.notas.nombre[i],
          notas: this.notas.notas[i]
        };

        this.histo.push(obj);
      }
    });
  }

  notes(cedula) {}
}
