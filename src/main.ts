import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
registerLocaleData(localePl, 'pl');

platformBrowserDynamic()
    .bootstrapModule(AppModule, {
        providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
    })
    .catch((err) => console.error(err));
