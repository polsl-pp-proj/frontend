import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthApiModule } from './modules/auth-api/auth-api.module';
import { SignupApiModule } from './modules/signup-api/signup-api.module';
import { StudentshipApiModule } from './modules/studentship-api/studentship-api.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AuthApiModule,
        SignupApiModule,
        StudentshipApiModule,
    ],
})
export class AuthModule {}
