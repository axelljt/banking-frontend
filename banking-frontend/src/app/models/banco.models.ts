export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
}

export interface Cuenta {
  id?: number;
  numeroCuenta: string;
  saldo: number;
  tipoCuenta: 'AHORROS' | 'CORRIENTE';
}