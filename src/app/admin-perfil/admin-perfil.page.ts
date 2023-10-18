import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NumberSymbol } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavParams, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { DeletarPostagemComponent } from '../modals/deletar-postagem/deletar-postagem.component';


@Component({
  selector: 'app-admin-perfil',
  templateUrl: './admin-perfil.page.html',
  styleUrls: ['./admin-perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AdminPerfilPage implements OnInit {

  router: Router;
  constructor(router: Router, private modalController: ModalController, private toastController: ToastController, private firebaseService: FirebaseService) {
    this.router = router;
  }
  
  ngOnInit() {
    // Se pet não esta selecionado, redireciona para home-admin
    if (!localStorage.getItem('cod_pet')){
      this.router.navigate(['/home-admin']);
    }
  }

  // Lógica de listagem
  petNome:any = localStorage.getItem('nome_pet');
  codPet:any = localStorage.getItem('cod_pet');
  fotoPerfil:any = localStorage.getItem('foto_perfil')
  
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
    localStorage.setItem('foto_perfil', pet.foto_perfil);
  }
  
  sair(){
    localStorage.clear()
    this.router.navigate(['/','home']);
  }
  
  
  // LÓGICA DE ADICIONAR

  caminho:any = "";
  parametro = "";
  foto:any;
  legenda:any = "";
  hoje:any = new Date();
  ano = this.hoje.getFullYear();
  mes = String(this.hoje.getMonth() + 1).padStart(2, '0');
  dia = String(this.hoje.getDate()).padStart(2, '0');
  data = `${this.ano}-${this.mes}-${this.dia}`;
  
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
    } else {
      this.legenda = "";
      this.presentToast("Postagem adicionada com sucesso")
    }
  }
  
  // Pesquisa de pet
  handleInput(event:any) {
    let pesquisa = event.target.value;
    this.parametro = pesquisa;
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
    this.caminho = await this.firebaseService.carregarImagem(this.foto);
  }

  // Abre modal de atualizar pet passa parâmetro
  async modalDeletarPostagem(data: any) {
    const modal = await this.modalController.create({
      component: DeletarPostagemComponent,
      componentProps: {
        customData: data
      },
    });
    await modal.present();
  }

// Componentes

  async presentToast (mensagem:any) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'top',
    });
    
    await toast.present();
  }

}
