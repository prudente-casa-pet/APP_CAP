import { Injectable } from '@angular/core';
import { timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Login
  async login (email: any, senha: any) {
    const dados = {
      "email": email,
      "senha": senha
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(dados),
      headers: {
        'Content-Type': 'application/json',
      }
    };
    let res = await fetch(`http://localhost/Aula/API/login`, options)
    .then (res => {
      return res.json();
    });
    if (res) {
      localStorage.clear()
      
      let timestamp_atual = new Date().getTime();
      let miliseconds = 1.5 * 60 * 60 * 1000; 
      let exp = timestamp_atual + miliseconds;
      
      localStorage.setItem('token', res.token);
      localStorage.setItem('exp', exp.toString());

      if (res.admin) {
        localStorage.setItem('admin', res.admin);
      } else if (res.tutor) {
        localStorage.setItem('tutor', res.tutor);
      }
      
      return false;
    }
    return 'Login inválido';
  }
}