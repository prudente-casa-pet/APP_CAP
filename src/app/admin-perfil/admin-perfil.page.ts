import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule, NumberSymbol } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavParams, ToastController, MenuController } from '@ionic/angular';
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
  menuStatus: boolean = true;
  
  constructor(router: Router, private renderer: Renderer2, private el: ElementRef, private modalController: ModalController, private toastController: ToastController, private firebaseService: FirebaseService, private menu: MenuController) {
    this.router = router;
  }
  
  ngOnInit() {
    // Se pet não esta selecionado, redireciona para home-admin
    if (!localStorage.getItem('cod_pet')){
      this.router.navigate(['/home-admin']);
    }
  }

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
  
  // Verifica se variavel é um array
  verificarArray(items:any): any {
    return Array.isArray(items)
  }

  // Ao clicar em um pet no menu, define configuraação para esses pets
  escolherPet(pet: any){
    localStorage.setItem('nome_pet', pet.pet_nome);
    localStorage.setItem('cod_pet', pet.cod_pet);
    localStorage.setItem('foto_perfil', pet.foto_perfil);
  }

  // Zera sessão
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
  
  // Função de adicionar postagem
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
      const element = this.el.nativeElement.querySelector('.upload');
      this.renderer.setStyle(element, 'background-image', `url('../../assets/img/fundo-cinza.png')`);
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
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageUrl = e.target.result;
        const element = this.el.nativeElement.querySelector('.upload');
        this.renderer.setStyle(element, 'background-image', `url(${imageUrl})`);
      };
      reader.readAsDataURL(this.foto);
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
