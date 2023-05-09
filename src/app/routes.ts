import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './views/not-found-page/not-found-page.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { SearchPageComponent } from './views/user/search-page/search-page.component';
import { ProjectPageComponent } from './views/user/project-page/project-page.component';
import { UserComponent } from './views/user/user.component';

export const routes: Routes = [
    { path: '404', component: NotFoundPageComponent },
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', component: HomePageComponent },
            { path: 'search', component: SearchPageComponent },
            { path: 'project/:projectId', component: ProjectPageComponent },
        ],
    },
    { path: '**', redirectTo: '/404' },
];
