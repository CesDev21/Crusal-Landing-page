import { Component } from '@angular/core';
import { SidebarService } from '../../app/Core/Services/sidebar-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  close: () => void;

  constructor(public sidevar: SidebarService, private router: Router) {
    this.close = this.sidevar.close.bind(this.sidevar);
  }

  get isOpen() {
    return this.sidevar.isOpen;
  }
  get isVisible() {
    return this.sidevar.isVisible;
  }

  hovered: string = '';
  activeSection: string = '';

  async onNavigate(path: string, section?: string, event?: Event) {
    if (event) event.preventDefault();
    if (section) this.activeSection = section;
    // close the sidevar (animations)
    this.sidevar.close();
    try {
      await this.router.navigateByUrl(path);
    } catch { }
    // dispatch client-side event so home component can react (only in browser)
    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(new CustomEvent('sidevar:navigate', { detail: { path } }));
      } catch { }
    }
  }
}
