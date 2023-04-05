import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseModalComponent } from './components/modals/base-modal/base-modal.component';
import { ButtonComponent } from './components/forms/button/button.component';
import { CheckboxComponent } from './components/forms/checkbox/checkbox.component';
import { InputComponent } from './components/forms/input/input.component';
import { OpenPositionCardComponent } from './components/cards/open-position-card/open-position-card.component';
import { ProjectCardComponent } from './components/cards/project-card/project-card.component';
import { RecentPaymentCardComponent } from './components/cards/recent-payment-card/recent-payment-card.component';
import { SelectComponent } from './components/forms/select/select.component';
import { TextAreaComponent } from './components/forms/text-area/text-area.component';
import { IconVaultModule } from './modules/icon-vault/icon-vault.module';
import { ModalModule } from './modules/modal/modal.module';

@NgModule({
    declarations: [
        AppComponent,
        BaseModalComponent,
        ButtonComponent,
        CheckboxComponent,
        InputComponent,
        OpenPositionCardComponent,
        ProjectCardComponent,
        RecentPaymentCardComponent,
        SelectComponent,
        TextAreaComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, IconVaultModule, ModalModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
