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

export interface Cliente extends Persona {
  clienteId: string;
  password?: string;
  estado: boolean;
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
  fecha?: Date | string;
  tipoMovimiento: 'Retiro' | 'Deposito';
  valor: number;
  saldoDisponible?: number;
  cuentaId: number;
}