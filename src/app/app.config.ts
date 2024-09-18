import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),

     provideAnimations(), // required animations providers
  //provideToastr(), // Toastr providers


     provideToastr({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),

   provideHttpClient()]
};
