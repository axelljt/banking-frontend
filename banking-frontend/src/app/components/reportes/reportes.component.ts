import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BancoService } from '../../services/banco.service.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

consultar() {
  this.listaReporte = []; 
  
  if (!this.fechaInicio || !this.fechaFin || !this.clienteId) {
    alert('Por favor complete todos los filtros');
    return;
  }

  this.bancoService.getReporte(this.fechaInicio, this.fechaFin, this.clienteId).subscribe({
    next: (res: any[]) => { // Le decimos que es un array
      console.log('Datos que llegaron:', res);
      
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

exportarPDF() {
  const doc = new jsPDF();
  const fechaActual = new Date().toLocaleString();

  // 1. Encabezado del PDF
  doc.setFontSize(18);
  doc.text('Estado de Cuenta', 14, 20);
  doc.setFontSize(10);
  doc.text(`Fecha de generación: ${fechaActual}`, 14, 30);
  doc.text(`Cliente ID: ${this.clienteId}`, 14, 35);

  // 2. Mapear los datos de listaReporte a un formato que entienda la tabla
  const cuerpoTabla = this.listaReporte.map(item => [
    new Date(item.fecha).toLocaleDateString(),
    item.cliente,
    item.numeroCuenta,
    item.tipo,
    `$${item.saldoInicial.toFixed(2)}`,
    item.estado ? 'Activo' : 'Inactivo',
    `$${item.movimiento.toFixed(2)}`,
    `$${item.saldoDisponible.toFixed(2)}`
  ]);

  // 3. Generar la tabla
  autoTable(doc, {
    startY: 45,
    head: [['Fecha', 'Cliente', 'N° Cuenta', 'Tipo', 'S. Inicial', 'Estado', 'Movimiento', 'S. Disponible']],
    body: cuerpoTabla,
    theme: 'striped',
    headStyles: { fillColor: [41, 128, 185] } // Un azul elegante
  });

  // 4. Guardar el archivo
  doc.save(`Reporte_Estado_Cuenta_${this.clienteId}.pdf`);
}
}