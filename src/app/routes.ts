import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './views/not-found-page/not-found-page.component';

export const routes: Routes = [
    { path: '404', component: NotFoundPageComponent },
    { path: '**', redirectTo: '/404' },
];
