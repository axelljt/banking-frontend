export interface Persona {
  id?: number;
  nombre: string;
  apellido: string;
  genero: string;
  edad: number;
  identificacion: string;
  direccion: string;
  telefono: string;
  email: string;
}

export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: string;
  email: string;
  estado: boolean;
  // Agregamos esto por si quieres mostrar cuántas cuentas tiene cada uno
  cuentas?: any[]; 
}

export interface Cuenta {
  id?: number;
  numeroCuenta: string;
  tipoCuenta: 'Ahorros' | 'Corriente';
  saldoInicial: number;
  estado: boolean;
  clienteId: number;
}

export interface Movimiento {
 id?: number;
  fecha?: string;
  tipo: 'Deposito' | 'Retiro';
  monto: number;
  saldoActual?: number;
}

export interface EstadoCuenta {
  fecha: string;
  cliente: string;
  numeroCuenta: string;
  tipo: string;
  saldoInicial: number;
  estado: boolean;
  movimiento: number;
  saldoDisponible: number;
}