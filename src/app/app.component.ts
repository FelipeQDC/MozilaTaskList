import { Component } from '@angular/core';
import { Tarefa } from "./tarefa";
import { Users } from "./Users";
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({

selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})

export class AppComponent {
title = 'TODOapp';

arrayDeTarefas: Tarefa[] = [];
apiURL : string;
usuarioLogado = false;
admin = false; //variavel nova
tokenJWT = '{ "token":""}';
arrayDeUsers: Users[] = [];
Editando = false;

constructor(private http: HttpClient) {
  this.apiURL = 'https://mozillatasklist-nodejs.onrender.com';
this.READ_tarefas();
}
//http://localhost:3000
CREATE_tarefa(descricaoNovaTarefa: string) {
  this.READ_tarefas();
  const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa, { 'headers': idToken }).subscribe(
      resultado => {
        console.log(resultado);
        this.READ_tarefas();
      });
  }

DELETE_tarefa(tarefaAserRemovida:Tarefa){
  this.READ_tarefas();
  var indice = this.arrayDeTarefas.indexOf(tarefaAserRemovida);
var id = this.arrayDeTarefas[indice]._id;
const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`,{ 'headers': idToken }).subscribe(
  resultado => {
    console.log(resultado);
    this.READ_tarefas();
  });

}

READ_tarefas() {
  const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
  this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`, { 'headers': idToken }).subscribe(
    (resultado) => {
      this.arrayDeTarefas = resultado;
      this.usuarioLogado = true
     
    },
  (error) => { this.usuarioLogado = false }
  )
 }
 
  
  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
    var indice = this.arrayDeTarefas.indexOf(tarefaAserModificada);
    var id = this.arrayDeTarefas[indice]._id;
    this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`,
    tarefaAserModificada, { 'headers': idToken }).subscribe(
      resultado => {
        console.log(resultado);
        this.READ_tarefas();
      });
    }

    login(username: string, password: string) {
      var credenciais = { "nome": username, "senha": password }
      this.http.post(`${this.apiURL}/api/login`, credenciais).subscribe(resultado => {
        this.tokenJWT = JSON.stringify(resultado);
        this.admin = JSON.parse(this.tokenJWT).admin;
      this.READ_tarefas();
      this.READ_USERS();
      });
     }
     READ_USERS(){
      const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
      this.http.get<Users[]>(`${this.apiURL}/api/getAllUsers`, { 'headers': idToken }).subscribe(
        (resultado) => {
          this.arrayDeUsers = resultado;
          this.READ_tarefas();
        },
      (error) => { this.usuarioLogado = false }
      )
     }
     DELETE_Users(UsersaSerRemovido:Users){
      this.READ_tarefas();
      var indice = this.arrayDeUsers.indexOf(UsersaSerRemovido);
    var id = this.arrayDeUsers[indice]._id;
    const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
    this.http.delete<Users>(`${this.apiURL}/api/deleteUser/${id}`,{ 'headers': idToken }).subscribe(
      resultado => {
        console.log(resultado);
        this.READ_tarefas();
        this.READ_USERS();
      });
    }
    CREATE_Users(Nomenovo:string,SenhaNova:string){
      this.READ_tarefas();
      const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
        var novaUsers = new Users(Nomenovo,SenhaNova,false);
        this.http.post<Users>(`${this.apiURL}/api/postUser`, novaUsers, { 'headers': idToken }).subscribe(
          resultado => {
            console.log(resultado);
            this.READ_USERS();
            this.READ_tarefas();
          });
      }
      UPDATE_Users(UserModificada: Users) {
            this.READ_tarefas();
            this.DELETE_Users(UserModificada)
            this.CREATE_Users(UserModificada.nome,UserModificada.senha)
          ;
        }
}