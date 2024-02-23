import { APP_INITIALIZER, ApplicationConfig, Injectable, InjectionToken, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DestinosApiClient } from './models/destinos-api-client.model'

import { routes } from './app.routes';
import { Store, provideState, provideStore } from '@ngrx/store';
import { reducerDestinosViajes } from './states/destinos-viajes/destinos-viajes.reducer';
import { provideEffects } from '@ngrx/effects';
import { DestinosViajesEffects } from './states/destinos-viajes/destinos-viajes.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthService } from './services/auth.service';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { HttpClientModule, HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { AppState } from './states/app.state';
import { InitMyDataAction } from './states/destinos-viajes/destinos-viajes.actions';
import Dexie from 'dexie';
import { DestinoViaje } from './models/destino-viaje.model';

// app config
export interface AppConfig {
  apiEndpoint: String;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'http://localhost:3000'
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
// fin app config

/* // app init
export function init_app(appLoadService: AppLoadService): () => Promise<any>  {
  return () => appLoadService.intializeDestinosViajesState();
}

@Injectable()
class AppLoadService {
  constructor(private store: Store<AppState>, private http: HttpClient) { }
  async intializeDestinosViajesState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndpoint + '/my', { headers: headers });
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(InitMyDataAction(response.body));
  }
}
// fin app init */

//dexie db
@Injectable({
  providedIn: 'root'
})
export class MyDatabase extends Dexie {
  destinos!: Dexie.Table<DestinoViaje, number>;
  constructor () {
      super('MyDatabase');
      this.version(1).stores({
        destinos: '++id, nombre, imagenUrl',
      });
  }
}

export const db = new MyDatabase();
// fin dexie db

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'destinos', reducer: reducerDestinosViajes }),
    provideEffects(DestinosViajesEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    AuthService,
    UsuarioLogueadoGuard,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
/*     AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true } */
    MyDatabase
  ]
};
