import { Component } from '@angular/core';
import { EstadoCuenta, Movimiento } from '../../models/banco.models';
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

reporte: any = null;

  movimiento = {
    tipoMovimiento: 'Retiro',
    valor: 0,
    cuentaId: 0
  };

  constructor(private bancoService: BancoService) {}
ejecutar() {
 
const dataEnvio = {
    cuentaId: Number(this.movimiento.cuentaId),
    valor: Number(this.movimiento.valor), 
    tipoMovimiento: this.movimiento.tipoMovimiento
};


this.bancoService.registrarMovimiento(
    dataEnvio.cuentaId, 
    dataEnvio.valor, 
    dataEnvio.tipoMovimiento
).subscribe({
    next: (data) => {
        console.log('Respuesta del servidor:', data);
        this.reporte = data; 
        alert("Movimiento procesado con éxito");
    },
    error: (err) => {
        console.error('Error al procesar:', err);
        alert("Error: " + err.error);
    }
});
}
}
