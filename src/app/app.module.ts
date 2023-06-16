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
import { OrganizationPageComponent } from './views/user/organization-page/organization-page.component';
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
import { ProjectModerationPageComponent } from './views/admin/project-moderation-page/project-moderation-page.component';
import { AdminComponent } from './views/admin/admin.component';
import { SetNewPasswordModalComponent } from './components/modals/set-new-password-modal/set-new-password-modal.component';
import { MyAccountPageComponent } from './views/user/my-account-page/my-account-page.component';
import { MarkdownModule } from './modules/markdown/markdown.module';
import { HelpModule } from './modules/help/help.module';
import { HelpComponent } from './components/help/help.component';
import { OrganizationModule } from './modules/organization/organization.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentModalComponent } from './components/modals/payment-modal/payment-modal.component';
import { RemoveOrganizationMembersModalComponent } from './components/modals/remove-organization-members-modal/remove-organization-members-modal.component';
import { AddOrganizationMembersModalComponent } from './components/modals/add-organization-members-modal/add-organization-members-modal.component';
import { AddOpenPositionModalComponent } from './components/modals/add-open-position-modal/add-open-position-modal.component';
import { IndexChangeablePhotoComponent } from './components/index-changeable-photo/index-changeable-photo.component';
import { ChangeablePhotoGalleryComponent } from './components/changeable-photo-gallery/changeable-photo-gallery.component';
import { AddProjectPageComponent } from './views/user/add-project-page/add-project-page.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropperModalComponent } from './components/modals/image-cropper-modal/image-cropper-modal.component';
import { MessageModalComponent } from './components/modals/message-modal/message-modal.component';
import { NotificationModalComponent } from './components/modals/notification-modal/notification-modal.component';
import { ManageUsersPageComponent } from './views/admin/manage-users-page/manage-users-page.component';
import { CategoryPageComponent } from './views/admin/category-page/category-page.component';
import { ProjectModule } from './modules/project/project.module';

@NgModule({
    declarations: [
        AdminComponent,
        ManageUsersPageComponent,
        CategoryPageComponent,
        ProjectModerationPageComponent,
        ProjectsModerationPageComponent,
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
        OrganizationPageComponent,
        HomePageComponent,
        SearchPageComponent,
        NavbarComponent,
        LoginModalComponent,
        JoinTeamModalComponent,
        ProjectPageComponent,
        UserComponent,
        RejectProjectModalComponent,
        ResetPasswordModalComponent,
        SetNewPasswordModalComponent,
        HelpComponent,
        CreateOrganizationModalComponent,
        MyAccountPageComponent,
        PaymentModalComponent,
        RemoveOrganizationMembersModalComponent,
        AddOrganizationMembersModalComponent,
        AddOpenPositionModalComponent,
        IndexChangeablePhotoComponent,
        ChangeablePhotoGalleryComponent,
        AddProjectPageComponent,
        ImageCropperModalComponent,
        MessageModalComponent,
        NotificationModalComponent,
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
        MarkdownModule,
        HelpModule,
        OrganizationModule,
        BrowserAnimationsModule,
        ImageCropperModule,
        ProjectModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
