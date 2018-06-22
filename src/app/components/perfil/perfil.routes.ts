
import { Routes } from '@angular/router';


import { estudiantesComponent } from './perfil_son/estudiantes/estudiantes.component';
import { actasComponent} from './perfil_son/actas/actas.component';
import { MateriasComponent } from './perfil_son/materias/materias.component';
import { EditarComponent } from './perfil_son/editar/editar.component';
import { HistorialComponent } from './perfil_son/historial/historial.component';

export const USUARIO_ROUTES: Routes = [
    { path: 'estudiantes', component: estudiantesComponent },
    { path: 'home', component: actasComponent},
    {path: 'editar/:id', component: EditarComponent},
    { path: 'materias', component: MateriasComponent},
    {path: 'historial', component: HistorialComponent},
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', component: actasComponent }

];
