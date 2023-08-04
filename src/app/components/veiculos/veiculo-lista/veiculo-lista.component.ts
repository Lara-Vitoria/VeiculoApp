import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Veiculos } from 'src/app/models/Veiculos.model';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-veiculo-lista',
  templateUrl: './veiculo-lista.component.html',
  styleUrls: ['./veiculo-lista.component.css']
})
export class VeiculoListaComponent {
  public veiculos: Veiculos[] = [];
  public veiculosFiltrados: Veiculos[] = [];

  private _filtroLista: string = '';

  public get filtroLista(): string { return this._filtroLista }
  public set filtroLista(valor: string) {
    this._filtroLista = valor;

    this.veiculosFiltrados = this.filtroLista ?
      this.filtrarVeiculos(this.filtroLista) :
      this.veiculos;
  }

  filtrarVeiculos(filtro: string): Veiculos[] {
    filtro = filtro.toLocaleLowerCase();

    return this.veiculos.filter(
      v => v.nome.toLocaleLowerCase().indexOf(filtro) !== -1 ||
        v.marca.toLocaleLowerCase().indexOf(filtro) !== -1 ||
        v.modelo.toLocaleLowerCase().indexOf(filtro) !== -1
    )
  }

  constructor(
    private veiculoService: VeiculoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getVeiculos();
  }

  getVeiculos(): void {
    this.spinner.show();

    this.veiculoService.getVeiculos().subscribe({
      next: (res: Veiculos[]) => {
        this.veiculos = res;
        this.veiculosFiltrados = this.veiculos;
      },
      error: (err: any) => {
        this.toastr.error('Erro ao recuperar os dados', 'Erro');
      }
    }).add(() => this.spinner.hide());
  }

  detalheVeiculo(id: number): void {
    this.router.navigate([`veiculo/detalhe/${id}`]);
  }

  mostraImg(img: string): string {
    return `${environment.apiURL}resources/${img}`;
  }

}
