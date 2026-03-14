import { Routes } from '@angular/router';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { CuentaFormComponent } from './components/cuenta-form/cuenta-form.component';
import { MovimientoRegistroComponent } from './components/movimiento-registro/movimiento-registro.component';
import { CuentaListComponent } from './cuenta-list/cuenta-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClienteListComponent },
  //{ path: 'cuentas', component: CuentaFormComponent },
  { path: 'movimientos', component: MovimientoRegistroComponent },
  { path: 'reportes', component: ClienteListComponent },
  { path: 'cuentas', component: CuentaListComponent }
];
