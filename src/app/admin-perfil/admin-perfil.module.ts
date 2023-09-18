import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPerfilPageRoutingModule } from './admin-perfil-routing.module';

import { AdminPerfilPage } from './admin-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPerfilPageRoutingModule
  ],
  declarations: [AdminPerfilPage]
})
export class AdminPerfilPageModule {}
