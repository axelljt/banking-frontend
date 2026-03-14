import { Routes } from '@angular/router';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { CuentaFormComponent } from './components/cuenta-form/cuenta-form.component';
import { MovimientoRegistroComponent } from './components/movimiento-registro/movimiento-registro.component';

export const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClienteListComponent },
  { path: 'cuentas', component: CuentaFormComponent },
  { path: 'movimientos', component: MovimientoRegistroComponent },
];
