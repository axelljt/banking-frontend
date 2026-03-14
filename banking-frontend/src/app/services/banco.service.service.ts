import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente, Cuenta } from '../models/banco.models';

@Injectable({ providedIn: 'root' })
export class BancoService {
  private apiUrl = 'http://localhost:8080/api/banco';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes`);
  }

  getCuentasByCliente(clienteId: number): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(`${this.apiUrl}/clientes/${clienteId}/cuentas`);
  }

  crearCuenta(clienteId: number, cuenta: Cuenta): Observable<Cuenta> {
    return this.http.post<Cuenta>(`${this.apiUrl}/clientes/${clienteId}/cuentas`, cuenta);
  }
}