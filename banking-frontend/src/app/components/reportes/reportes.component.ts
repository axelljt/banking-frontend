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
  this.listaReporte = []; 
  
  // Verificamos que los campos tengan valor antes de llamar
  if (!this.fechaInicio || !this.fechaFin || !this.clienteId) {
    alert('Por favor complete todos los filtros');
    return;
  }

  this.bancoService.getReporte(this.fechaInicio, this.fechaFin, this.clienteId).subscribe({
    next: (res: any[]) => { // Le decimos que es un array
      console.log('Datos que llegaron:', res);
      
      // ASIGNACIÓN DIRECTA: res ya es el array [ {...}, {...} ]
      if (res && Array.isArray(res)) {
        this.listaReporte = res;
      } else {
        console.warn('La respuesta no es un array:', res);
      }
    },
    error: (err) => {
      console.error(err);
      alert('Error al cargar datos');
    }
  });
}
}