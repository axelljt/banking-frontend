import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente, Cuenta, Movimiento } from '../models/banco.models';

@Injectable({ providedIn: 'root' })
export class BancoService {

  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) {}


  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/api/clientes`);
  }


  getCuentasByCliente(clienteId: number): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(`${this.apiUrl}/api/cuentas/cliente/${clienteId}`);
  }

  crearCuenta(clienteId: number, cuenta: Cuenta): Observable<Cuenta> {
    return this.http.post<Cuenta>(`${this.apiUrl}/cuentas`, { ...cuenta, clienteId });
  }


registrarMovimiento(cuentaId: number, monto: number, tipo: string): Observable<any> {
  const body = { 
    monto: monto, 
    tipo: tipo 
  };


  return this.http.post(`${this.apiUrl}/api/movimientos/cuenta/${cuentaId}`, body);
}

  
  // REPORTES
  getReporte(fechaInicio: string, fechaFin: string, clienteId: number): Observable<any[]> {
  const params = new HttpParams()
    .set('inicio', fechaInicio)  
    .set('fin', fechaFin)         
    .set('clienteId', clienteId.toString());

  return this.http.get<any[]>(`${this.apiUrl}/api/movimientos/reporte`, { params });
}
  
}