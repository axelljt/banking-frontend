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
cargando: boolean = false; 
busquedaRealizada: boolean = false;

  constructor(private bancoService: BancoService) {}

consultar() {
  if (!this.fechaInicio || !this.fechaFin || !this.clienteId) {
    alert('Por favor selecciona las fechas y el ID del cliente');
    return;
  }

  this.cargando = true;
  this.busquedaRealizada = true;
  this.listaReporte = [];

  this.bancoService.getReporte(this.fechaInicio, this.fechaFin, this.clienteId).subscribe({
    next: (res) => {
      this.listaReporte = res;
      this.cargando = false;
    },
    error: (err) => {
      this.cargando = false;
      alert('Error al conectar con el servidor');
    }
  });
}

exportarPDF() {
  const doc = new jsPDF();
  const fechaActual = new Date().toLocaleString();

  doc.setFontSize(18);
  doc.text('Estado de Cuenta', 14, 20);
  doc.setFontSize(10);
  doc.text(`Fecha de generación: ${fechaActual}`, 14, 30);
  doc.text(`Cliente ID: ${this.clienteId}`, 14, 35);

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

  autoTable(doc, {
    startY: 45,
    head: [['Fecha', 'Cliente', 'N° Cuenta', 'Tipo', 'S. Inicial', 'Estado', 'Movimiento', 'S. Disponible']],
    body: cuerpoTabla,
    theme: 'striped',
    headStyles: { fillColor: [41, 128, 185] } 
  });

  doc.save(`Reporte_Estado_Cuenta_${this.clienteId}.pdf`);
}
}