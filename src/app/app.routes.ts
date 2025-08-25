import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { HomeAnimation } from './components/home-animation/home-animation';
import { Card } from './components/card/card';

export const routes: Routes = [
    {
        path: 'home',
        component: Home
    },
    {
        path: 'home-animation',
        component: HomeAnimation
    },
    {
        path: 'card',
        component: Card
    }   
];
    