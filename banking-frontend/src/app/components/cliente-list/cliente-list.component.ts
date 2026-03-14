import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/banco.models';
import { BancoService } from '../../services/banco.service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-list',
  imports: [CommonModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent implements OnInit{
clientes: Cliente[] = [];
cargando = true;
  constructor(private bancoService: BancoService) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.bancoService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar clientes', err);
        this.cargando = false;
      }
    });
  }
}
