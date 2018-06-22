import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";


//componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { actasComponent } from './components/perfil/perfil_son/actas/actas.component';
import { estudiantesComponent } from './components/perfil/perfil_son/estudiantes/estudiantes.component';
import { MateriasComponent } from './components/perfil/perfil_son/materias/materias.component';


//servicios
import { AuthService } from './services/auth.service';
import { SharedService } from './services/shared.service';
import { SactasService } from './services/sactas.service';

//routes
import {appRouting} from './app.routes';
import { EditarComponent } from './components/perfil/perfil_son/editar/editar.component';
import { HistorialComponent } from './components/perfil/perfil_son/historial/historial.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilComponent,
    NavbarComponent,
    actasComponent,
    estudiantesComponent,
    EditarComponent,
    MateriasComponent,
    HistorialComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    appRouting,
    HttpClientModule
  ],
  providers: [AuthService,SharedService,SactasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
