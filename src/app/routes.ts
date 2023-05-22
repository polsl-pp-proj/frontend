import {
    Route,
    Routes,
    UrlMatchResult,
    UrlSegment,
    UrlSegmentGroup,
} from '@angular/router';
import { NotFoundPageComponent } from './views/not-found-page/not-found-page.component';
import { OrganizationPageComponent } from './views/user/organization-page/organization-page.component';
import { AboutPageComponent } from './views/user/about-page/about-page.component';
import { HomePageComponent } from './views/user/home-page/home-page.component';
import { SearchPageComponent } from './views/user/search-page/search-page.component';
import { ProjectPageComponent } from './views/user/project-page/project-page.component';
import { UserComponent } from './views/user/user.component';
import { MyAccountPageComponent } from './views/user/my-account-page/my-account-page.component';

const customRouteMatcher = (
    segments: UrlSegment[],
    _: UrlSegmentGroup,
    route: Route
): UrlMatchResult | null => {
    if (segments[0] && segments[0].path === 'signup') {
        const email = segments[2],
            token = segments[3];
        if (segments[1] && segments[1].path === 'confirm' && email && token) {
            route.redirectTo = `/?${segments[0].path}=true&${segments[1].path}=true&email=${email}&token=${token}`;
            return {
                consumed: segments,
            };
        }
    } else if (segments[0] && segments[0].path === 'reset-password') {
        const email = segments[1],
            token = segments[2];
        if (email && token) {
            route.redirectTo = `/?${segments[0].path}=true&email=${email}&token=${token}`;
            return {
                consumed: segments,
            };
        }
    }
    return null;
};

export const routes: Routes = [
    { path: '404', component: NotFoundPageComponent },
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', component: HomePageComponent },
            { path: 'about', component: AboutPageComponent },
            { path: 'search', component: SearchPageComponent },
            { path: 'project/:projectId', component: ProjectPageComponent },
            { path: 'account', component: MyAccountPageComponent },
            {
                path: 'organization/:organizationId',
                component: OrganizationPageComponent,
            },
        ],
    },
    {
        redirectTo: '/',
        matcher: customRouteMatcher,
    },
    { path: '**', redirectTo: '/404' },
];
