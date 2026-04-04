import { Component, signal, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Navbar } from './Componentes/navbar/navbar';
import { Footer } from './Componentes/footer/footer';
import { Sidebar } from "../Shared/sidebar/sidebar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('crusal-page');
  private _routerSub: Subscription | null = null;

  constructor(private router: Router) {
    // Suscribe global a navegación para desplazar a la sección inicial cuando cambie la ruta
    this._routerSub = this.router.events
      .pipe()
      .subscribe(e => {
        if (e instanceof NavigationEnd) {
          const nav = e as NavigationEnd;
          this.scrollToSectionFromUrl(nav.urlAfterRedirects || nav.url);
        }
      });

    // Escucha eventos personalizados de sidevar para scroll entre secciones
    if (typeof window !== 'undefined') {
      window.addEventListener('sidevar:navigate', this._onSidevarNavigate as EventListener);
    }
  }

  ngOnDestroy(): void {
    if (this._routerSub) {
      this._routerSub.unsubscribe();
      this._routerSub = null;
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('sidevar:navigate', this._onSidevarNavigate as EventListener);
    }
  }

  private _onSidevarNavigate = (e: Event) => {
    try {
      const detail = (e as CustomEvent)?.detail;
      const path = detail?.path as string | undefined;
      this.scrollToSectionFromUrl(path);
    } catch {
      // ignore
    }
  }

  // Helper: desplaza al inicio de la sección indicada por fragmento o última parte del path
  private scrollToSectionFromUrl(path: string | undefined) {
    if (typeof document === 'undefined' || !path) return;
    try {
      const hashIndex = path.indexOf('#');
      if (hashIndex !== -1) {
        const id = decodeURIComponent(path.slice(hashIndex + 1));
        const el = document.getElementById(id);
        if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
      }
      const parts = path.split('/').filter(Boolean);
      const last = parts[parts.length - 1];
      if (last) {
        const el2 = document.getElementById(last);
        if (el2) { el2.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
