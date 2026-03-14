import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BancoService } from '../services/banco.service.service';

@Component({
  selector: 'app-cuenta-list',
  imports: [CommonModule],
  templateUrl: './cuenta-list.component.html',
  styleUrl: './cuenta-list.component.css'
})
export class CuentaListComponent implements OnInit {
  clientesConCuentas: any[] = [];
  cargando = true;

  constructor(private bancoService: BancoService) {}

  ngOnInit(): void {
    this.bancoService.getClientes().subscribe({
      next: (data) => {
        this.clientesConCuentas = data;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }
}
