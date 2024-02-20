import { Component, Inject, InjectionToken } from '@angular/core';
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { ActivatedRoute } from '@angular/router';
import { DestinosApiClientDecorated, APP_CONFIG, APP_CONFIG_VALUE } from '../../models/destinos-api-client-decorated.model';

class DestinosApiClientViejo { 
  public getById(id: String | null): DestinoViaje | null{
    console.log('llamando por la clase vieja')
    return null;
  }
}

@Component({
  selector: 'app-destino-detalle',
  standalone: true,
  imports: [],
  templateUrl: './destino-detalle.component.html',
  styleUrl: './destino-detalle.component.css',
  providers: [
    { provide: DestinosApiClient, useClass: DestinosApiClientDecorated },
    { provide: DestinosApiClientViejo, useExisting: DestinosApiClient },
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE }
  ] 
})
export class DestinoDetalleComponent {
  destino: DestinoViaje | null;

  constructor (private route: ActivatedRoute, private destinosApiClient: DestinosApiClientViejo) {
    this.destino = null;
  }

  ngOnInit() {
     let id = this.route.snapshot.paramMap.get('id');
     this.destino = this.destinosApiClient.getById('1')
  }
}
