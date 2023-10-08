import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-perfil',
  templateUrl: './admin-perfil.page.html',
  styleUrls: ['./admin-perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AdminPerfilPage implements OnInit {

  router: Router;
  constructor(router: Router) {
    this.router = router;
  }
  
  ngOnInit() {
    // console.log(this.carregarImagem())
  }

  // Lógica de listagem
  parametro = "";

  verificarArray(items:any): any {
    return Array.isArray(items)
  }
  
  generateRange(start: number, end: number): number[] {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }

  escolherPet(pet: any){
    localStorage.setItem('nome_pet', pet.pet_nome);
    localStorage.setItem('cod_pet', pet.cod_pet);
  }

  sair(){
    localStorage.clear()
    this.router.navigate(['/','home']);
  }

  // Função que faz uma busca na API
  getAPI (metodo:any, tabela:any, parametro:any) {
    const request = new XMLHttpRequest();
    request.open('GET', `http://localhost/Aula/API/${metodo}/${tabela}/${parametro}`, false);
    const token = localStorage.getItem('token');
    if (token) {
      request.setRequestHeader('Authorization', `Bearer ${token}`);
    }
    request.send();

    if (request.status === 200) {
      if (JSON.parse(request.responseText).ACESSO){
        console.log(JSON.parse(request.responseText).ACESSO)
        localStorage.clear();
        window.location.reload();
      } else {
        return JSON.parse(request.responseText);
      }
    } else {
      console.error('Erro na requisição:', request.status);
      return Array();
    }
  }

    // Pesquisa de pet
    handleInput(event:any) {
      let pesquisa = event.target.value;
      this.parametro = pesquisa;
    }


    async carregarImagem () {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        }
        return await fetch(`http://localhost/Aula/API/Arquivos/Fotos/Aysha-1695068240109.jpg`, options)
        .then(res => {
          return res;
        })
        .catch(err => {
          return err;
        })
    }


}
