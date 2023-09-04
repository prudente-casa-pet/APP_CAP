import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorPerfilPage } from './tutor-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: TutorPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorPerfilPageRoutingModule {}
