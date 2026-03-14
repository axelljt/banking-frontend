import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/banco.models';
import { BancoService } from '../../services/banco.service.service';

@Component({
  selector: 'app-cliente-list',
  imports: [],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent implements OnInit{
clientes: Cliente[] = [];

  constructor(private bancoService: BancoService) {}

  ngOnInit(): void {
    this.bancoService.getClientes().subscribe(data => {
      this.clientes = data;
    });
  }
}
