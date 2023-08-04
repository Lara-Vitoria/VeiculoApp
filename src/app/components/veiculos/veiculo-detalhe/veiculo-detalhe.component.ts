import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Veiculos } from 'src/app/models/Veiculos.model';
import { VeiculoService } from './../../../services/veiculo.service';

@Component({
  selector: 'app-veiculo-detalhe',
  templateUrl: './veiculo-detalhe.component.html',
  styleUrls: ['./veiculo-detalhe.component.css']
})
export class VeiculoDetalheComponent {

  veiculo = {} as Veiculos;
  constructor(private router: ActivatedRoute,
    private veiculoService: VeiculoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getVeiculo();
  }

  public getVeiculo(): void {
    this.spinner.show()
    const veiculoIdParam = this.router.snapshot.paramMap.get('id');

    if (veiculoIdParam !== null) {
      this.veiculoService.getVeiculoById(+veiculoIdParam).subscribe(
        (res: Veiculos) => {
          this.veiculo = { ...res };
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao carregar o veiculo', 'Erro');
        },
        () => { this.spinner.hide() }
      );
    }
  }
}
