import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ValidatorField } from 'src/app/helpers/ValidatorField';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  formRegistro!: FormGroup;

  get formControl(): any { return this.formRegistro.controls; }

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.validation();
  }

  public validation(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.DeveCombinar('senha', 'confirmaSenha')
    };

    this.formRegistro = this.formBuilder.group({
      primeiroNome: ['',
        [Validators.required, Validators.maxLength(50)]],
      ultimoNome: ['',
        [Validators.required, Validators.maxLength(50)]],
      email: ['',
        [Validators.required, Validators.email]],
      username: ['',
        [Validators.required, Validators.maxLength(20)]],
      senha: ['',
        [Validators.required, Validators.maxLength(50)]],
      confirmaSenha: ['',
        [Validators.required, Validators.maxLength(50)]],
    }, formOptions)
  }

  public resetForm(): void { this.formRegistro.reset(); }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }
}
