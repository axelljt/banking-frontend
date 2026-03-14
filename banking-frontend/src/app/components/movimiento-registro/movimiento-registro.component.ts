import { Component } from '@angular/core';
import { Movimiento } from '../../models/banco.models';
import { BancoService } from '../../services/banco.service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movimiento-registro',
  imports: [CommonModule, FormsModule],
  templateUrl: './movimiento-registro.component.html',
  styleUrl: './movimiento-registro.component.css'
})
export class MovimientoRegistroComponent {

  movimiento = {
    tipoMovimiento: 'Retiro',
    valor: 0,
    cuentaId: 0
  };

  constructor(private bancoService: BancoService) {}
ejecutar() {
  // Creamos una copia limpia para no alterar el formulario
  const dataEnvio = {
    tipoMovimiento: this.movimiento.tipoMovimiento,
    valor: Number(this.movimiento.valor),
    cuentaId: Number(this.movimiento.cuentaId) // Forzamos a Number
  };

  this.bancoService.registrarMovimiento(dataEnvio).subscribe({
    next: (res) => {
      alert('¡Éxito! Saldo actualizado.');
    },
    error: (err) => {
      console.error('Detalle del error:', err);
      // Si el error viene del backend (ej: cupo excedido), mostramos el mensaje
      alert('Error: ' + (err.error?.message || err.error || 'Fallo en el servidor'));
    }
  });
}
}
