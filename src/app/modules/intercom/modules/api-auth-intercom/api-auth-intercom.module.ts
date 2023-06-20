import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiModule } from 'src/app/modules/api/api.module';
import { AuthModule } from 'src/app/modules/auth/auth.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, AuthModule, ApiModule],
})
export class ApiAuthIntercomModule {}
