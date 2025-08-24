import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { HomeAnimation } from './components/home-animation/home-animation';

export const routes: Routes = [
    {
        path: 'home',
        component: Home
    },
    {
        path: 'home-animation',
        component: HomeAnimation
    }
];
    