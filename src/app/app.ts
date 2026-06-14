import { Component } from '@angular/core';
import { ListaComponent } from './components/lista/lista.component';

@Component({
  selector: 'app-root',
  imports: [ListaComponent],
  template: `
    <div class="app-container">
      <header>
        <h1>Sistema de Preguntas</h1>
      </header>
      <main>
        <app-lista></app-lista>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      font-family: 'Segoe UI', sans-serif;
      max-width: 1100px;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      background: #3f51b5;
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      margin-bottom: 24px;
    }
    header h1 { margin: 0; font-size: 1.6rem; }
  `]
})
export class App {}
