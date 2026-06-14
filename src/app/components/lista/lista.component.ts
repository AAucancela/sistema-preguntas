import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntaService } from '../../services/pregunta.service';
import { Pregunta } from '../../models/pregunta.model';
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-lista',
  imports: [CommonModule, FormularioComponent],
  template: `
    <div class="toolbar">
      <span class="total">Total: {{ preguntas.length }} pregunta(s)</span>
      <button class="btn-primary" (click)="mostrarFormulario()">+ Nueva Pregunta</button>
    </div>

    <app-formulario
      *ngIf="formularioVisible"
      [preguntaEditar]="seleccionada"
      (guardado)="onGuardar($event)"
      (cancelado)="cerrarFormulario()"
    ></app-formulario>

    <div class="table-wrapper">
      <table *ngIf="preguntas.length > 0; else sinDatos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Enunciado</th>
            <th>Orden</th>
            <th>Peso</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of preguntas">
            <td>{{ p.id }}</td>
            <td>{{ p.enunciado }}</td>
            <td class="center">{{ p.orden }}</td>
            <td class="center"><span class="badge">{{ p.peso }}%</span></td>
            <td class="desc">{{ p.descripcion || '—' }}</td>
            <td class="acciones">
              <button class="btn-edit" (click)="editar(p)">Editar</button>
              <button class="btn-delete" (click)="eliminar(p.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <ng-template #sinDatos>
        <p class="sin-datos">No hay preguntas registradas.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .total { color: #666; font-size: 0.9rem; }
    .btn-primary {
      background: #3f51b5; color: white; border: none;
      padding: 9px 18px; border-radius: 4px; cursor: pointer; font-size: 0.9rem;
    }
    .btn-primary:hover { background: #303f9f; }
    .table-wrapper { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,.1); }
    thead { background: #3f51b5; color: white; }
    th { padding: 12px 14px; text-align: left; font-size: 0.85rem; font-weight: 600; }
    td { padding: 11px 14px; border-bottom: 1px solid #eee; font-size: 0.9rem; }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: #f5f7ff; }
    .center { text-align: center; }
    .desc { color: #666; font-size: 0.85rem; max-width: 220px; }
    .badge {
      background: #e8eaf6; color: #3f51b5;
      padding: 2px 8px; border-radius: 12px; font-weight: 600; font-size: 0.8rem;
    }
    .acciones { display: flex; gap: 6px; }
    .btn-edit {
      background: #ff9800; color: white; border: none;
      padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 0.82rem;
    }
    .btn-edit:hover { background: #e65100; }
    .btn-delete {
      background: #f44336; color: white; border: none;
      padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 0.82rem;
    }
    .btn-delete:hover { background: #b71c1c; }
    .sin-datos { text-align: center; color: #999; padding: 40px; background: white; border-radius: 8px; }
  `]
})
export class ListaComponent implements OnInit {
  preguntas: Pregunta[] = [];
  formularioVisible = false;
  seleccionada: Pregunta | null = null;

  constructor(private service: PreguntaService) {}

  ngOnInit() { this.cargar(); }

  cargar() { this.preguntas = this.service.getAll(); }

  mostrarFormulario() {
    this.seleccionada = null;
    this.formularioVisible = true;
  }

  editar(p: Pregunta) {
    this.seleccionada = p;
    this.formularioVisible = true;
  }

  cerrarFormulario() {
    this.formularioVisible = false;
    this.seleccionada = null;
  }

  onGuardar(datos: Omit<Pregunta, 'id'>) {
    if (this.seleccionada) {
      this.service.update(this.seleccionada.id, datos);
    } else {
      this.service.add(datos);
    }
    this.cerrarFormulario();
    this.cargar();
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar esta pregunta?')) {
      this.service.delete(id);
      this.cargar();
    }
  }
}
