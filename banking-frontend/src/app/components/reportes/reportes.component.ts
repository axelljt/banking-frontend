import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BancoService } from '../../services/banco.service.service';

@Component({
  selector: 'app-reporte',
  standalone: true,
 imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html'
})
export class ReporteComponent {
  // Filtros
  fechaInicio: string = '';
  fechaFin: string = '';
  clienteId: number = 0;
  
  listaReporte: any[] = [];

  constructor(private bancoService: BancoService) {}

 // En reporte.component.ts
consultar() {
  this.listaReporte = []; // Limpiamos para forzar el refresco
  
  this.bancoService.getReporte(this.fechaInicio, this.fechaFin, this.clienteId).subscribe({
    next: (res: any) => {
      console.log('Datos que llegaron:', res);
      
      // Accedemos a la propiedad que vimos en tu log anterior
      if (res && res.reporteJson) {
        this.listaReporte = res.reporteJson;
      }
    },
    error: (err) => alert('Error al cargar datos')
  });
}
}