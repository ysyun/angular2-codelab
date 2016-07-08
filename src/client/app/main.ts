import { APP_BASE_HREF } from '@angular/common';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { bootstrap } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

bootstrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms(),

  {
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }
]);
