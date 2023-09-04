import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutorPerfilPageRoutingModule } from './tutor-perfil-routing.module';

import { TutorPerfilPage } from './tutor-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutorPerfilPageRoutingModule
  ],
  declarations: [TutorPerfilPage]
})
export class TutorPerfilPageModule {}
