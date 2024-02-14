import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DestinosApiClient } from './models/destinos-api-client.model'

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { reducerDestinosViajes } from './states/destinos-viajes/destinos-viajes.reducer';
import { provideEffects } from '@ngrx/effects';
import { DestinosViajesEffects } from './states/destinos-viajes/destinos-viajes.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    DestinosApiClient,
    provideStore(),
    provideState({ name: 'destinos', reducer: reducerDestinosViajes }),
    provideEffects(DestinosViajesEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
