import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Produto } from '../Model/Produto';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-criar-produto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './criar-produto.component.html',
  styleUrl: './criar-produto.component.css'
})
export class CriarProdutoComponent implements OnInit {

  //Vetor de Produtos
  vetorProd: Produto[] = []

  //Construtor
  constructor(private produtoService: ProdutoService) { }

  //Incialização do Componente
  ngOnInit(): void {
    this.selecionar()
  }

  //Visibilidade dos botões
  btnCadProd: boolean = true

  //Objeto Formulário
  formProd = new FormGroup({
    id: new FormControl(null, Validators.min(0)),
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    valor: new FormControl(null, [Validators.required, Validators.min(0)])
  })

  //Metodo para selecionar todos os produtos
  selecionar() {
    this.produtoService.selecionarProdutos().subscribe(retorno => { this.vetorProd = retorno })
  }

  //Metodos para cadastarr produtos
  cadastar() {
    this.produtoService.cadastrarProduto(this.formProd.value as Produto)
      //O retorno vai ser o objeto compelto, tendo o Id, Nome e o valor
      .subscribe(retorno => {
        //Cadastrar o retorno no nosso vetor
        this.vetorProd.push(retorno)
        //Limpar o nosso formulário
        this.formProd.reset()
      })
  }

  //Metodo para selecionar um produto específico
  selecionarProduto(indice: number) {

    this.formProd.setValue({
      //Vamos trablhar com as caracteristicas do formulario, dessa maneira o nosso formulário será preenchido.
      id: this.vetorProd[indice].id,
      nome: this.vetorProd[indice].nome,
      valor: this.vetorProd[indice].valor
    })
    //Ocultando botões, ocultar botão de cadastrar e habilitar os botoes alterar e remover fiquem visíveis
    this.btnCadProd = false

  }
  //Metodo para alterar produtos
  alterar() {
    //Temos que passar um objeto contendo Id, nome e valor
    this.produtoService.alterarProduto(this.formProd.value as Produto)
      .subscribe(retorno => {
        //teremos o retonro da API, que é o nosso objeto com todos os dados atualizados
        //vamos atualizar o nosso vetor de Produtos, através do inidice e como vamos saber qual indice do vetor está aquela informação ?

        //Obter o indide do objeto alterado


        let indiceAletardo = this.vetorProd.findIndex(obj => {
          //Nesse findeIndex, ele vai retornar uma posição do vetor se baseando em uma condição

          //esse obj é basicamente o valor de cada linha do meu vetor , pq o meu vetor é constiuido por objetos e cada linha de objeto contem id, nome e valor, e eu quero verificar em qual posição se encontra determinado id
          return this.formProd.value.id == obj.id
          //assim sabemos exatamente qual posição do vetor se encontra aquele objeto alterado
        })
        //Alter o vetor
        this.vetorProd[indiceAletardo] = retorno

        //Limpar o formulário
        this.formProd.reset()

        //ocultar os botões alterar e remover e exibir o botão de cadastro
        this.btnCadProd = true
      })
  }

  //Metodo para remover produtos
  remover() {
    //vamos passar o id correto do produto que queremos passar
    this.produtoService.removerProduto(this.formProd.value.id)
      .subscribe(() => {
        //Quando a remoção é realizad nós precisamos atualizar o nosso vetor, primeiro temos que saber qual produto sera removido

        //Obter o indice do produto que será removido
        let indiceRemovido = this.vetorProd.findIndex(obj => {
          return obj.id = this.formProd.value.id
        })

        //Remover objeto do Vetor
        this.vetorProd.splice(indiceRemovido, 1)

        //Limpar o formulario
        this.formProd.reset()

        //Ocultar o botão remover a alterar e habiligar o Cadastrar
        this.btnCadProd = true
      })
  }


}
