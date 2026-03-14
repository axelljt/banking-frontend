import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente, Cuenta, Movimiento } from '../models/banco.models';

@Injectable({ providedIn: 'root' })
export class BancoService {
  // Ajusta esta URL según los controladores de tu Spring Boot
  private apiUrl = 'http://localhost:8080'; 

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
 registrarMovimiento(data: any): Observable<any> {
  // Aseguramos que el ID sea string para el parámetro de URL
  const params = new HttpParams().set('cuentaId', data.cuentaId.toString());

  // El cuerpo solo lleva la data del movimiento
  const body = {
    tipoMovimiento: data.tipoMovimiento,
    valor: data.valor
  };

  // POST(url, body, opciones)
  return this.http.post(`${this.apiUrl}/movimientos`, body, { params });
}

  
  // REPORTES
  getReporte(fechaInicio: string, fechaFin: string, clienteId: number): Observable<any[]> {
  const params = new HttpParams()
    .set('inicio', fechaInicio)   // Cambiado de 'fechaInicio' a 'inicio'
    .set('fin', fechaFin)         // Cambiado de 'fechaFin' a 'fin'
    .set('clienteId', clienteId.toString());

  return this.http.get<any[]>(`${this.apiUrl}/movimientos/reporte`, { params });
}
  
}