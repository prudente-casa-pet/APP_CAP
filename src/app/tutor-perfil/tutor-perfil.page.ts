import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor-perfil',
  templateUrl: './tutor-perfil.page.html',
  styleUrls: ['./tutor-perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TutorPerfilPage implements OnInit {
  
  router: Router;
  constructor(router: Router) {
    this.router = router;
  }
  ngOnInit() {
  }

  sair(){
    localStorage.clear()
    this.router.navigate(['/','home']);
  }


}
