import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NumberSymbol } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavParams, ToastController } from '@ionic/angular';
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
  constructor(router: Router, private toastController: ToastController) {
    this.router = router;
  }
  
  ngOnInit() {
    if (!localStorage.getItem('cod_pet')){
      localStorage.setItem('nome_pet', 'Aysha');
      localStorage.setItem('cod_pet', '1');
    }
  }

  // Lógica de listagem
  petNome:any = localStorage.getItem('nome_pet');
  codPet:any = localStorage.getItem('cod_pet');

  caminho:any = "";
  parametro = "";
  foto:any;
  legenda:any = "";
  hoje:any = new Date();
  ano = this.hoje.getFullYear();
  mes = String(this.hoje.getMonth() + 1).padStart(2, '0');
  dia = String(this.hoje.getDate()).padStart(2, '0');

  data = `${this.ano}-${this.mes}-${this.dia}`;


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


  // LÓGICA DE ADICIONAR
  
  async adicionarPostagem () {
    if (this.foto) {
      await this.adicionarArquivo();  // Espera o aquivo ser adicionado
    }
      let postagem = {
        'legenda': `'${this.legenda}'`,
        'foto': `'${this.caminho}'`,
        'data': `'${this.data}'`,
        'cod_pet': Number(localStorage.getItem('cod_pet')),
        'curtida': 0
      }
      let resposta = await this.postAPI('adicionar', 'postagem', '', postagem);
      if (resposta.ERRO) {
        this.presentToast(resposta.ERRO); //chama toast da verificação
      }
    
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

  // Faz um post na API
  async postAPI (acao:any, tabela:any, parametro:any, dados:any) {
    const options = {
      method: 'POST',
      body: JSON.stringify(dados),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
      }
      return fetch(`http://localhost/Aula/API/${acao}/${tabela}/${parametro}`, options)
      .then(res => {
        return res.json();
      })
      .catch(err => {
        return err.json()
      })
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
          console.log('aaa');
          return res;
        })
        .catch(err => {
          return err;
        })
    }

     // LÓGICA DE ARQUIVOS
  
  onFileSelected(event: any) {
    this.foto = event.target.files[0];
    if (this.foto) {
      this.foto = this.foto; // Atribui o arquivo à variável 'foto'
    }
  }

  async adicionarArquivo () {
    let extensao = this.foto.name.split(".");
    extensao = extensao[extensao.length-1];
    let nomeFoto = `${localStorage.getItem('nome_pet')}-${Date.now()}.${extensao}`;
    this.foto = new File([this.foto], nomeFoto, { type: this.foto.type });
    this.caminho = await this.adicionarArquivoAPI();
    this.caminho = this.caminho.slice(4)
  }
  
  // Adiciona a foto na API
  async adicionarArquivoAPI () {
    const formData = new FormData();
    formData.append('file', this.foto);
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
      
    };
    try {
        const res = await fetch(`http://localhost/Aula/API/adicionarArquivo`, options);
        const data = await res.json();
        return data.caminho;
      } catch (err) {
        console.error(err);
        throw err;
    }
  }


  async presentToast (mensagem:any) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'top',
    });
    
    await toast.present();
  }

}
