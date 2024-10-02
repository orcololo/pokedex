import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { requestsCachingInterceptor } from './interceptors/requests-caching.interceptor';
import { pokemonEnrichmentFnInterceptor } from './interceptors/pokemon-enrichment-fn.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        requestsCachingInterceptor,
        pokemonEnrichmentFnInterceptor,
      ])
    ),
  ],
};
