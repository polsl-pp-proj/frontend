import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserApiModule } from './modules/user-api/user-api.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, UserApiModule],
})
export class UserModule {}
