import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pregunta } from '../../models/pregunta.model';

@Component({
  selector: 'app-formulario',
  imports: [FormsModule, CommonModule],
  template: `
    <div class="form-card">
      <h2>{{ preguntaEditar ? 'Editar' : 'Nueva' }} Pregunta</h2>
      <form (ngSubmit)="guardar()" #f="ngForm">
        <div class="form-group">
          <label>Enunciado *</label>
          <input [(ngModel)]="form.enunciado" name="enunciado" required placeholder="Escribe el enunciado" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Orden *</label>
            <input type="number" [(ngModel)]="form.orden" name="orden" required min="1" placeholder="1" />
          </div>
          <div class="form-group">
            <label>Peso *</label>
            <input type="number" [(ngModel)]="form.peso" name="peso" required min="0" max="100" placeholder="0-100" />
          </div>
        </div>
        <div class="form-group">
          <label>Descripción</label>
          <textarea [(ngModel)]="form.descripcion" name="descripcion" rows="3" placeholder="Descripción opcional"></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-primary" [disabled]="f.invalid">
            {{ preguntaEditar ? 'Actualizar' : 'Agregar' }}
          </button>
          <button type="button" class="btn-secondary" (click)="cancelar()">Cancelar</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-card {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;
    }
    h2 { margin-top: 0; color: #3f51b5; }
    .form-group { display: flex; flex-direction: column; margin-bottom: 14px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    label { font-size: 0.85rem; font-weight: 600; margin-bottom: 4px; color: #555; }
    input, textarea {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 8px 10px;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s;
    }
    input:focus, textarea:focus { border-color: #3f51b5; }
    .form-actions { display: flex; gap: 10px; margin-top: 8px; }
    .btn-primary {
      background: #3f51b5; color: white; border: none;
      padding: 9px 20px; border-radius: 4px; cursor: pointer; font-size: 0.9rem;
    }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-secondary {
      background: #eee; color: #333; border: none;
      padding: 9px 20px; border-radius: 4px; cursor: pointer; font-size: 0.9rem;
    }
    .btn-primary:hover:not(:disabled) { background: #303f9f; }
    .btn-secondary:hover { background: #ddd; }
  `]
})
export class FormularioComponent implements OnChanges {
  @Input() preguntaEditar: Pregunta | null = null;
  @Output() guardado = new EventEmitter<Omit<Pregunta, 'id'>>();
  @Output() cancelado = new EventEmitter<void>();

  form = { enunciado: '', orden: 1, peso: 10, descripcion: '' };

  ngOnChanges() {
    if (this.preguntaEditar) {
      this.form = {
        enunciado: this.preguntaEditar.enunciado,
        orden: this.preguntaEditar.orden,
        peso: this.preguntaEditar.peso,
        descripcion: this.preguntaEditar.descripcion,
      };
    } else {
      this.resetForm();
    }
  }

  guardar() {
    this.guardado.emit({ ...this.form });
    this.resetForm();
  }

  cancelar() {
    this.resetForm();
    this.cancelado.emit();
  }

  private resetForm() {
    this.form = { enunciado: '', orden: 1, peso: 10, descripcion: '' };
  }
}
