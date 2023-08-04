import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VeiculosComponent } from './components/veiculos/veiculos.component';
import { VeiculoDetalheComponent } from './components/veiculos/veiculo-detalhe/veiculo-detalhe.component';
import { VeiculoListaComponent } from './components/veiculos/veiculo-lista/veiculo-lista.component';
import { FormCadastroComponent } from './components/veiculos/form-cadastro/form-cadastro.component';

import { PerfilComponent } from './components/user/perfil/perfil.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent }
    ]
  },
  { path: 'user/perfil', component: PerfilComponent },
  { path: 'veiculo', redirectTo: 'veiculo/lista' },
  {
    path: 'veiculo', component: VeiculosComponent,
    children: [
      { path: 'lista', component: VeiculoListaComponent },
      { path: 'detalhe', component: VeiculoDetalheComponent },
      { path: 'detalhe/:id', component: VeiculoDetalheComponent }
    ]
  },
  { path: 'veiculo-form', component: FormCadastroComponent },
  { path: '', redirectTo: 'veiculo/lista', pathMatch: 'full' },
  { path: '**', redirectTo: 'veiculo/lista', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
