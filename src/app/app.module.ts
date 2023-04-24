import { NgModule } from '@angular/core';
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
import { LoginModalComponent } from './components/modals/login-modal/login-modal.component';

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
        LoginModalComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        IconVaultModule,
        ModalModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
