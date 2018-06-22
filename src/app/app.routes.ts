import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './components/login/login.component';
//import { IndexComponent } from './components/index/index.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { USUARIO_ROUTES } from './components/perfil/perfil.routes';


const routes: Routes = [
  // 2

  { path: '', component: LoginComponent },
  { path: 'profile/:id', component: PerfilComponent, children: USUARIO_ROUTES },
  { path: '', pathMatch:'full', redirectTo: '' },
  { path: '**', pathMatch:'full', redirectTo: 'login' }
];

export const appRouting = RouterModule.forRoot(routes);