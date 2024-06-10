import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pessoa } from '../Model/Pessoa';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-criar-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './criar-formulario.component.html',
  styleUrl: './criar-formulario.component.css'
})
export class CriarFormularioComponent {

  // Armazenar indice da pessoa seleciona
  indice: number = -1

  //Objeto de formulario
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    idade: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(120)]),
    cidade: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  //Visibilidade dos botões
  btnCadastrar: boolean = true

  //Vetor
  vetor: Pessoa[] = []

  //Função de Cadastro
  cadastrar() {
    //Cadstro no vetor
    this.vetor.push(this.formulario.value as Pessoa)

    //Limpeza dos inputs
    this.formulario.reset()

    //Visualização via console
    console.table(this.vetor)
  }

  //Função de seleção
  selecionar(indice: number) {
    //Atribuir o indice da pessoa
    this.indice = indice

    //Atribuir os dados da pessoa no formulario
    this.formulario.setValue({
      nome: this.vetor[indice].nome,
      idade: this.vetor[indice].idade,
      cidade: this.vetor[indice].cidade
    })

    //Visibilidade dos botões
    this.btnCadastrar = false
  }

  //Função de Alteração
  alterar() {

    //Alterar vetor
    this.vetor[this.indice] = this.formulario.value as Pessoa

    //Limpar os inputs
    this.formulario.reset()

    //Visibilidade dos botões
    this.btnCadastrar = true
  }

  //Função de remoção
  remover() {
    //Removendo pessoa do vetor
    this.vetor.splice(this.indice, 1)
    // Limpesa dos inputs
    this.formulario.reset()

    //Visiblidade dos botões
    this.btnCadastrar = true
  }

  //Função de cancelamento
  cancelar() {

    //Limpeza dos inputs
    this.formulario.reset()

    //Visibilidade dos botões
    this.btnCadastrar = true
  }
}
