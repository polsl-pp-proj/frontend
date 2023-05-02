import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './views/not-found-page/not-found-page.component';
import { ManageUsersPageComponent } from './views/manage-users-page/manage-users-page.component';

export const routes: Routes = [
    { path: 'users', component: ManageUsersPageComponent },
    { path: '404', component: NotFoundPageComponent },
    { path: '**', redirectTo: '/404' },
];
