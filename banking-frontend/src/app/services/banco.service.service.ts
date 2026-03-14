import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente, Cuenta, Movimiento } from '../models/banco.models';

@Injectable({ providedIn: 'root' })
export class BancoService {
  // Ajusta esta URL según los controladores de tu Spring Boot
  private apiUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) {}

  // CLIENTES
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes`);
  }

  // CUENTAS
  // Si tu backend busca cuentas por cliente:
  getCuentasByCliente(clienteId: number): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(`${this.apiUrl}/cuentas/cliente/${clienteId}`);
  }

  crearCuenta(clienteId: number, cuenta: Cuenta): Observable<Cuenta> {
    return this.http.post<Cuenta>(`${this.apiUrl}/cuentas`, { ...cuenta, clienteId });
  }

  // MOVIMIENTOS (El punto crítico de la prueba)
  // Usamos HttpParams porque en el backend definimos @RequestParam("cuentaId")
  registrarMovimiento(cuentaId: number, movimiento: any): Observable<any> {
    const params = new HttpParams().set('cuentaId', cuentaId.toString());
    return this.http.post(`${this.apiUrl}/movimientos`, movimiento, { params });
  }

  // REPORTES
  getReporte(fechaInicio: string, fechaFin: string, clienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/movimientos/reporte`, {
      params: { fechaInicio, fechaFin, clienteId: clienteId.toString() }
    });
  }
}