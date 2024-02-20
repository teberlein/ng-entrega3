import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';
import { DestinoViaje } from './destino-viaje.model';
import { DestinosApiClient } from './destinos-api-client.model';
import { AppState } from '../states/app.state';

interface AppConfig {
  apiEndpoint: String;
}
export const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'mi_api.com'
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

@Injectable()
export class DestinosApiClientDecorated extends DestinosApiClient {
  constructor(@Inject(APP_CONFIG) private config: AppConfig, store: Store<AppState>) {
    super(store);
  }
  override getById(id: String): DestinoViaje {
    console.log('llamando por la clase decorada!');
    console.log('config: ' + this.config.apiEndpoint);
    return super.getById(id);
  }
}