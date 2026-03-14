import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Cliente, Cuenta } from '../models/banco.models';
import { BancoService } from '../services/banco.service.service';

@Component({
  selector: 'app-gestion-bancaria',
  imports: [CommonModule],
  templateUrl: './gestion-bancaria.component.html',
  styleUrl: './gestion-bancaria.component.css'
})
export class GestionBancariaComponent implements OnInit{
clientes = signal<Cliente[]>([]);
  cuentas = signal<Cuenta[]>([]);
  clienteSeleccionado = signal<Cliente | null>(null);

  constructor(private bancoService: BancoService) {}

  ngOnInit() {
    this.bancoService.getClientes().subscribe(data => this.clientes.set(data));
  }

  seleccionarCliente(cliente: Cliente) {
    this.clienteSeleccionado.set(cliente);
    this.bancoService.getCuentasByCliente(cliente.id).subscribe(data => {
      this.cuentas.set(data);
    });
  }
}
