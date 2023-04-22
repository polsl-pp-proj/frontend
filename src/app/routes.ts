import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './views/not-found-page/not-found-page.component';
import { AboutPageComponent } from './views/about-page/about-page.component';

export const routes: Routes = [
    { path: 'about', component: AboutPageComponent },
    { path: '404', component: NotFoundPageComponent },
    { path: '**', redirectTo: '/404' },
];
