export class Users {
    _id : string | undefined ;
    nome: string;
    senha: string;
    admin: boolean;
    constructor(_nome: string, _senha: string, _admin: boolean) {
    this.nome = _nome;
    this.senha = _senha;
    this.admin = _admin;
    }
    }