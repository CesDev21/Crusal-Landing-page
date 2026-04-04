import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SidebarService } from '../../Core/Services/sidebar-service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})

export class Navbar implements OnInit, OnDestroy {
  showOthersModal: boolean = false;
  hovered: string = '';
  activeSection: string = '';
  private _routerSub: Subscription | null = null;

  constructor(public sidevar: SidebarService, private router: Router) { }

  ngOnInit(): void {
    this.updateActiveSectionFromUrl(this.router.url || '');
    this._routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e) => {
        const nav = e as NavigationEnd;
        this.updateActiveSectionFromUrl(nav.urlAfterRedirects || nav.url || '');
      });
  }

  ngOnDestroy(): void {
    if (this._routerSub) {
      this._routerSub.unsubscribe();
      this._routerSub = null;
    }
  }

  private updateActiveSectionFromUrl(url: string) {
    const cleanUrl = (url || '').split('?')[0].split('#')[0];
    if (cleanUrl === '/home' || cleanUrl === '/home/') {
      this.activeSection = 'factory';
      return;
    }
    if (cleanUrl === '/history') {
      this.activeSection = 'history';
      return;
    }
    if (cleanUrl === '/services') {
      this.activeSection = 'services';
      return;
    }
    if (cleanUrl === '/plan') {
      this.activeSection = 'plan';
      return;
    }
    this.activeSection = '';
  }

  goHome(event?: Event) {
    if (event) event.preventDefault();
    const current = this.router.url || '';
    if (current === '/home' || current === '/home/') return;
    this.router.navigateByUrl('/home');
  }

  toggleOthersModal() {
    this.showOthersModal = !this.showOthersModal;
  }

  navigateTo(path: string) {
    this.showOthersModal = false;
    this.activeSection = path === '/services' ? 'services' : path === '/plan' ? 'plan' : this.activeSection;
    // navigate to the route (assumes routes are configured)
    this.router.navigate([path]);
  }
}
