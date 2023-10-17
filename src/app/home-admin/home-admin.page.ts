import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomeAdminPage implements OnInit {

  router: Router;
  constructor(router: Router) {
    this.router = router;
  }
  ngOnInit() {}

  // Lógica de listagem

  petNome:any = localStorage.getItem('nome_pet');
  codPet:any = localStorage.getItem('cod_pet');
  fotoPerfil:any = localStorage.getItem('foto_perfil')
  parametro = "";

  escolherPet(pet: any){
    localStorage.setItem('nome_pet', pet.pet_nome);
    localStorage.setItem('cod_pet', pet.cod_pet);
    localStorage.setItem('foto_perfil', pet.foto_perfil);
  }

  sair(){
    localStorage.clear()
    this.router.navigate(['/','home']);
  }

  verificarArray(items:any): any {
    return Array.isArray(items)
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
        console.log(JSON.parse(request.responseText).ACESSO);
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

  // Lógica da Agenda

  hoje = new Date();                          // Dia atual
  amanha = this.adicionarUmDia(this.hoje);    // Dia seguinte

  adicionarUmDia (data: Date) : Date {
    const novaData = new Date(data);
    novaData.setDate(novaData.getDate() + 1);
    return novaData;
  }

  gerarDataPostIt (data:any) {
    let mes = data.getMonth()+1;
    let dia = data.getDate();
    let dataFormatada = dia < 10 ? `0${dia}` : dia;
    dataFormatada += '/';
    dataFormatada += mes < 10 ? `0${mes}` : mes;
    return dataFormatada;
  }
  
  gerarDataPostItAPI (data:any) {
    let mes = data.getMonth()+1;
    let dia = data.getDate();
    let ano = data.getFullYear();
    let dataFormatada = ano + '-';
    dataFormatada += mes < 10 ? `0${mes}` : mes;
    dataFormatada += '-';
    dataFormatada += dia < 10 ? `0${dia}` : dia;
    return dataFormatada;
  }
}
