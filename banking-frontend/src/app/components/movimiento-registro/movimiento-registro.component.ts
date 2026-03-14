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

  movimiento: Movimiento = {
    tipoMovimiento: 'Retiro',
    valor: 0,
    cuentaId: 1 // Aquí podrías cargar una lista de cuentas reales
  };

  constructor(private bancoService: BancoService) {}

  registrar() {
    this.bancoService.registrarMovimiento(this.movimiento.cuentaId, this.movimiento).subscribe({
      next: (res) => {
        alert('Movimiento realizado con éxito. Nuevo saldo: ' + res.saldoDisponible);
      },
      error: (err) => {
        // Captura los errores 400 del backend (Saldo no disponible / Cupo excedido)
        alert('Error en la transacción: ' + (err.error || 'Ocurrió un error inesperado'));
      }
    });
  }
}
