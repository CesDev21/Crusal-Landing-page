import { Routes } from '@angular/router';
import { Home } from './Componentes/home/home';
import { About } from './Componentes/about/about';
import { Features } from './Componentes/features/features';
import { Plan } from './Componentes/plan/plan';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'about', component: About },
    { path: 'features', component: Features },
    { path: 'plan', component: Plan }, 
    
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];
