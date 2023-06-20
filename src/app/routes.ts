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
import { ProjectsModerationPageComponent } from './views/admin/projects-moderation-page/projects-moderation-page.component';
import { AdminComponent } from './views/admin/admin.component';
import { ProjectModerationPageComponent } from './views/admin/project-moderation-page/project-moderation-page.component';
import { MyAccountPageComponent } from './views/user/my-account-page/my-account-page.component';
import { AddProjectPageComponent } from './views/user/add-project-page/add-project-page.component';
import { ManageUsersPageComponent } from './views/admin/manage-users-page/manage-users-page.component';
import { CategoryPageComponent } from './views/admin/category-page/category-page.component';
import { ManageOrganizationsPageComponent } from './views/admin/manage-organizations-page/manage-organizations-page.component';

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
    } else if (
        segments[0] &&
        segments[1] &&
        segments[0].path === 'studentship' &&
        segments[1].path === 'verification'
    ) {
        const email = segments[3],
            token = segments[4];
        if (segments[2] && segments[2].path === 'confirm' && email && token) {
            route.redirectTo = `/?${segments[0].path}=true&${segments[2].path}=true&email=${email}&token=${token}`;
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
    { path: 'about', component: AboutPageComponent },
    { path: '404', component: NotFoundPageComponent },
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', component: HomePageComponent },
            { path: 'about', component: AboutPageComponent },
            { path: 'search', component: SearchPageComponent },
            { path: 'project/add', component: AddProjectPageComponent },
            { path: 'project/:projectId', component: ProjectPageComponent },
            { path: 'account', component: MyAccountPageComponent },
            {
                path: 'organization/:organizationId',
                component: OrganizationPageComponent,
            },
        ],
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: 'moderate/projects',
                component: ProjectsModerationPageComponent,
            },
            {
                path: 'moderate/project/:submissionId',
                component: ProjectModerationPageComponent,
            },
            { path: 'manage/users', component: ManageUsersPageComponent },
            { path: 'manage/category', component: CategoryPageComponent },
            {
                path: 'manage/organizations',
                component: ManageOrganizationsPageComponent,
            },
        ],
    },
    {
        redirectTo: '/',
        matcher: customRouteMatcher,
    },
    { path: '**', redirectTo: '/404' },
];
