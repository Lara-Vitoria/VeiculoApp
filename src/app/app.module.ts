import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormCadastroComponent } from './components/veiculos/form-cadastro/form-cadastro.component';
import { VeiculosComponent } from './components/veiculos/veiculos.component';
import { NavComponent } from './shared/nav/nav/nav.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { VeiculoDetalheComponent } from './components/veiculos/veiculo-detalhe/veiculo-detalhe.component';
import { VeiculoListaComponent } from './components/veiculos/veiculo-lista/veiculo-lista.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';

import { VeiculoService } from './services/veiculo.service';

@NgModule({
  declarations: [
    AppComponent,
    FormCadastroComponent,
    VeiculosComponent,
    NavComponent,
    PerfilComponent,
    VeiculoDetalheComponent,
    VeiculoListaComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    BsDropdownModule.forRoot(),
  ],
  providers: [VeiculoService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
