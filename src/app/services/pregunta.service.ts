import { Injectable } from '@angular/core';
import { Pregunta } from '../models/pregunta.model';

@Injectable({ providedIn: 'root' })
export class PreguntaService {
  private preguntas: Pregunta[] = [
    { id: 1, enunciado: '¿Cuál es la capital del Ecuador?', orden: 1, peso: 10, descripcion: 'Pregunta de geografía básica' },
    { id: 2, enunciado: '¿Cuánto es 2 + 2?', orden: 2, peso: 5, descripcion: 'Operación matemática simple' },
  ];
  private nextId = 3;

  getAll(): Pregunta[] {
    return [...this.preguntas];
  }

  getById(id: number): Pregunta | undefined {
    return this.preguntas.find(p => p.id === id);
  }

  add(pregunta: Omit<Pregunta, 'id'>): Pregunta {
    const nueva = { ...pregunta, id: this.nextId++ };
    this.preguntas.push(nueva);
    return nueva;
  }

  update(id: number, pregunta: Omit<Pregunta, 'id'>): boolean {
    const index = this.preguntas.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.preguntas[index] = { ...pregunta, id };
    return true;
  }

  delete(id: number): boolean {
    const index = this.preguntas.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.preguntas.splice(index, 1);
    return true;
  }
}
