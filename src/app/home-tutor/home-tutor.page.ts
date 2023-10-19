import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-tutor',
  templateUrl: './home-tutor.page.html',
  styleUrls: ['./home-tutor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomeTutorPage implements OnInit {

  router: Router;
  menuStatus: boolean = true;

  constructor(router: Router, private menu: MenuController) {
    this.router = router;
  }

  ngOnInit() {}

  // Fecha menu ao dar scroll na página
  handleScroll(scroll: any){
    if (!this.menuStatus && scroll != 0){
      this.menuStatus = false;
      this.menu.close('menu');
    } else if (this.menu && scroll != 0){
      this.menuStatus = false;
    }
  }

  menuAberto(){
    this.menuStatus = true;
  }

  // Lógica de listagem
  petNome:any = localStorage.getItem('nome_pet');
  codPet:any = localStorage.getItem('cod_pet');
  fotoPerfil:any = localStorage.getItem('foto_perfil')

  // Ao clicar em um pet no menu, define configuraação para esses pets
  escolherPet(pet: any){
    localStorage.setItem('nome_pet', pet.nome);
    localStorage.setItem('cod_pet', pet.cod_pet);
    localStorage.setItem('foto_perfil', pet.foto_perfil);
  }

  // Zera sessão
  sair(){
    localStorage.clear()
    this.router.navigate(['/','home']);
  }

  // Verifica se variavel é um array
  verificarArray(items:any): any {
    return Array.isArray(items)
  }

  // Formata data para exibir
  gerarData (data:any) {
    data = data.split("-");
    let mes = data[1];
    let dia = data[2];
    let ano = data[0];
    let dataFormatada = `${dia}/${mes}/${ano}`;
    return dataFormatada;
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
}
