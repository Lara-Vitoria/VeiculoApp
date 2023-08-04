import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ValidatorField } from 'src/app/helpers/ValidatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  formPerfil!: FormGroup;

  get formControl(): any { return this.formPerfil.controls; }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
  }

  public validation(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.DeveCombinar('senha', 'confirmaSenha')
    };

    this.formPerfil = this.formBuilder.group({
      primeiroNome: ['',
        [Validators.required, Validators.maxLength(50)]],
      ultimoNome: ['',
        [Validators.required, Validators.maxLength(50)]],
      email: ['',
        [Validators.required, Validators.email]],
      telefone: ['',
        [Validators.required]],
      senha: ['',
        [Validators.required, Validators.maxLength(50)]],
      confirmaSenha: ['',
        [Validators.required, Validators.maxLength(50)]],
    }, formOptions)
  }

  public resetForm(): void { this.formPerfil.reset(); }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

}
