import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { VeiculoService } from 'src/app/services/veiculo.service';
import { Veiculos } from '../../../models/Veiculos.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.css']
})
export class FormCadastroComponent implements OnInit {

  formVeiculo!: FormGroup;
  veiculo = {} as Veiculos;

  imagemURL = '/assets/upload.jpg';
  file!: File;

  get formControl(): any { return this.formVeiculo.controls; }

  constructor(private formBuilder: FormBuilder,
    private veiculoService: VeiculoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.validation();

  }

  public validation(): void {
    this.formVeiculo = this.formBuilder.group({
      nome: ['',
        [Validators.required, Validators.maxLength(50)]],
      marca: ['',
        [Validators.required, Validators.maxLength(50)]],
      modelo: ['',
        [Validators.required, Validators.maxLength(50)]],
      imagemURL: [null],
      valor: [''],
      quilometragem: [''],
      informacoesAdicionais: ['', Validators.maxLength(200)],
    })

    this.desabilitaCampos();

  }

  public resetForm(): void { this.formVeiculo.reset(); }

  desabilitaCampos() {
    Object.keys(this.formVeiculo.controls).forEach((key: string) => {
      this.formVeiculo.get(key)?.disable();
    });
  }

  habilitaCampos() {
    Object.keys(this.formVeiculo.controls).forEach((key: string) => {
      this.formVeiculo.get(key)?.enable();
    });
  }


  onSubmit() {
    this.spinner.show();

    if (this.formVeiculo.valid) {

      this.veiculo = {
        ...this.formVeiculo.value,
        imagemURL: this.veiculo.imagemURL
      };

      this.veiculo.quilometragem = this.veiculo.quilometragem?.toString();
      this.veiculo.valor = this.veiculo.valor?.toString();

      this.veiculoService.post(this.veiculo).subscribe(
        () => { this.toastr.success('Sucesso', 'veiculo cadastrado com sucesso') },
        () => { this.toastr.error('Erro', 'Erro ao enviar os dados') }
      ).add(() => this.spinner.hide());
    }

    this.desabilitaCampos();
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  onFileChange(event: any): void {
    const reader = new FileReader();

    reader.onload = (e: any) => this.imagemURL = e.target.result;

    this.file = event.target.files[0];
    reader.readAsDataURL(this.file);

    this.uploadImg();
    this.habilitaCampos();
  }

  uploadImg(): void {
    this.spinner.show();
    var nomeImg = '';

    this.veiculoService.upload(this.file).subscribe(
      (res) => {
        console.log(res)
        this.veiculo.imagemURL = res;
        this.imagemURL = environment.apiURL + 'resources/' + res;
        console.log(this.veiculo.imagemURL)
        this.toastr.success('Sucesso', 'imagem cadastrado com sucesso')
      },
      (erro) => { this.toastr.error('Erro', 'Erro ao enviar os dados'); console.log(erro) }
    ).add(() => this.spinner.hide())
  }

  carregaImg(): void {
    if (this.veiculo.imagemURL !== '' && this.imagemURL !== '/assets/upload.jpg') {
      this.imagemURL = 'https://localhost:7069' + 'resources/' + this.veiculo.imagemURL;
    }
  }
}
