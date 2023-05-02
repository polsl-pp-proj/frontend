import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './views/not-found-page/not-found-page.component';
import { AboutPageComponent } from './views/about-page/about-page.component';
import { OrganisationPageComponent } from './views/organisation-page/organisation-page.component';

export const routes: Routes = [
    { path: 'organisation', component: OrganisationPageComponent },
    { path: 'about', component: AboutPageComponent },
    { path: '404', component: NotFoundPageComponent },
    { path: '**', redirectTo: '/404' },
];
