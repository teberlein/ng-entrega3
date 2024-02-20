import { ApplicationConfig, InjectionToken, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DestinosApiClient } from './models/destinos-api-client.model'

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { reducerDestinosViajes } from './states/destinos-viajes/destinos-viajes.reducer';
import { provideEffects } from '@ngrx/effects';
import { DestinosViajesEffects } from './states/destinos-viajes/destinos-viajes.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthService } from './services/auth.service';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';

// app config
export interface AppConfig {
  apiEndpoint: String;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'http://localhost:3000'
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
// fin app config

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'destinos', reducer: reducerDestinosViajes }),
    provideEffects(DestinosViajesEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    AuthService,
    UsuarioLogueadoGuard,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE }
]
};
