import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseModalComponent } from './components/modals/base-modal/base-modal.component';
import { ButtonComponent } from './components/forms/button/button.component';
import { InputComponent } from './components/forms/input/input.component';
import { OpenPositionCardComponent } from './components/cards/open-position-card/open-position-card.component';
import { ProjectCardComponent } from './components/cards/project-card/project-card.component';
import { RecentPaymentCardComponent } from './components/cards/recent-payment-card/recent-payment-card.component';
import { SelectComponent } from './components/forms/select/select.component';
import { IconVaultModule } from './modules/icon-vault/icon-vault.module';
import { ModalModule } from './modules/modal/modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundPageComponent } from './views/not-found-page/not-found-page.component';
import { PageComponent } from './views/page/page.component';
import { SignupModalComponent } from './components/modals/signup-modal/signup-modal.component';
import { AboutPageComponent } from './views/user/about-page/about-page.component';
import { HomePageComponent } from './views/user/home-page/home-page.component';
import { AuthModule } from './modules/auth/auth.module';
import { IntercomModule } from './modules/intercom/intercom.module';
import { SearchPageComponent } from './views/user/search-page/search-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginModalComponent } from './components/modals/login-modal/login-modal.component';
import { JoinTeamModalComponent } from './components/modals/join-team-modal/join-team-modal.component';
import { ProjectPageComponent } from './views/user/project-page/project-page.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { UserComponent } from './views/user/user.component';
import { RejectProjectModalComponent } from './components/modals/reject-project-modal/reject-project-modal.component';
import { ResetPasswordModalComponent } from './components/modals/reset-password-modal/reset-password-modal.component';
import { CreateOrganizationModalComponent } from './components/modals/create-organization-modal/create-organization-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { ProjectsModerationPageComponent } from './views/admin/projects-moderation-page/projects-moderation-page.component';

@NgModule({
    declarations: [
        AppComponent,
        BaseModalComponent,
        ButtonComponent,
        InputComponent,
        OpenPositionCardComponent,
        ProjectCardComponent,
        RecentPaymentCardComponent,
        SelectComponent,
        NotFoundPageComponent,
        PageComponent,
        SignupModalComponent,
        AboutPageComponent,
        HomePageComponent,
        SearchPageComponent,
        NavbarComponent,
        LoginModalComponent,
        JoinTeamModalComponent,
        ProjectPageComponent,
        UserComponent,
        RejectProjectModalComponent,
        ResetPasswordModalComponent,
        CreateOrganizationModalComponent,
        ProjectsModerationPageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        IconVaultModule,
        ModalModule,
        FormsModule,
        ReactiveFormsModule,
        AuthModule,
        IntercomModule,
        ToastrModule.forRoot({ autoDismiss: true, timeOut: 5000 }),
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
