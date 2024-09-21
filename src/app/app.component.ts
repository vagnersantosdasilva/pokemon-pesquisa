import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BuscaComponent } from './components/busca/busca.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BuscaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokemon-pesquisa';
}
