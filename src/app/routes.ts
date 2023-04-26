import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './views/not-found-page/not-found-page.component';
import { SearchPageComponent } from './views/search-page/search-page.component';

export const routes: Routes = [
    { path: 'search-project', component: SearchPageComponent },
    { path: '404', component: NotFoundPageComponent },
    { path: '**', redirectTo: '/404' },
];
