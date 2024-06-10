import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CriarFormularioComponent } from "./criar-formulario/criar-formulario.component";
import { CriarProdutoComponent } from "./criar-produto/criar-produto.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, CriarFormularioComponent, CriarProdutoComponent]
})
export class AppComponent {
  title = 'AppCRUD';


  nome: string
  idade: number = null

}
