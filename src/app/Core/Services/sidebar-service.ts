import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  isOpen = signal(false); // Estado lógico
  isVisible = signal(false); // Estado visual (para animación)

  open() {
    this.isVisible.set(true);
    setTimeout(() => this.isOpen.set(true), 10); // Permite que la animación de entrada ocurra
  }

  close() {
    this.isOpen.set(false); // Inicia animación de salida
    setTimeout(() => this.isVisible.set(false), 300); // 300ms = duración de la animación
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }
}
