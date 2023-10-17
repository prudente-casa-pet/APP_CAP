import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // Inicialização do Firebase
  private firebaseConfig = {
    apiKey: "AIzaSyBoDdQwC-EN9TaUxSpw3TwqHzH3oDKDE0U",
    authDomain: "fotos-prudente-casa-pet.firebaseapp.com",
    projectId: "fotos-prudente-casa-pet",
    storageBucket: "fotos-prudente-casa-pet.appspot.com",
    messagingSenderId: "163585840516",
    appId: "1:163585840516:web:7ba1efbcde2aabb235f9d1"
  };

  private app = initializeApp(this.firebaseConfig);
  private storage = getStorage(this.app);

  constructor() {}
  
  // Função que envia as imagens
  async carregarImagem(foto: any) {
    const storageRef = ref(this.storage, 'Arquivos/Fotos/' + foto.name); // Define o caminho do arquivo no Storage
    
    // Faz o upload da foto para o Firebase Storage
    try {
      const snapshot = await uploadBytes(storageRef, foto);      
      const imageUrl = await getDownloadURL(snapshot.ref);
      return imageUrl;  // Retorna url da imagem enviada
    } catch (error) {
      console.error('Erro ao fazer o upload: ', error);
      throw error; // Propaga o erro para o chamador da função, se necessário
    }
  }

  // Função que exclui a imagem
  async excluirImagem(url: string) {
    try {
      // Converta a URL da imagem de volta em uma referência de storage
      const storageRef = ref(this.storage, url);
      // Exclua o objeto no Firebase Storage
      await deleteObject(storageRef);
      console.log('Imagem excluída com sucesso');
    } catch (error) {
      console.error('Erro ao excluir a imagem: ', error);
      throw error;
    }
  }
}
