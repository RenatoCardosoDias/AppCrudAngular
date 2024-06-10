//Importar o Injectable para prover a injeção de dependencia
import { Injectable } from '@angular/core';

//Importar o HttpClient
import { HttpClient } from '@angular/common/http';

//Importar o modelo de produto
import { Produto } from '../Model/Produto';

//Importar o RxJS
import { Observable } from 'rxjs';

//Configuração do @Injectable
@Injectable({
  providedIn: 'root'
})

//Classe
export class ProdutoService {

  //URL da API
  url: string = 'http://localhost:3000/produtos'

  //Primeiro método a ser executado quando referenciado a classe serviço

  constructor(private http: HttpClient) { }

  //Metodo para selecionar o Produto
  selecionarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url)
  }

  //Metodo para cadastrar o Produto
  cadastrarProduto(obj: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.url, obj)
  }

  //Metodo para alterar o Produto
  alterarProduto(obj: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.url}/${obj.id}`, obj);
  }

  //Metodo para deletar o Produto
  removerProduto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`)
  }
}

