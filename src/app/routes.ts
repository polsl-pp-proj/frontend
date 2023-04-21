import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './views/not-found-page/not-found-page.component';
import { HomePageComponent } from './views/home-page/home-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: '404', component: NotFoundPageComponent },
    { path: '**', redirectTo: '/404' },
];
