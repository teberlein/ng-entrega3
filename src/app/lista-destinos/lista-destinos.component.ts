import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinoViajeComponent } from '../destino-viaje/destino-viaje.component';
import { DestinoViaje } from '../models/destino-viaje.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormDestinoViajeComponent } from "../form-destino-viaje/form-destino-viaje.component";
import { DestinosApiClient } from '../models/destinos-api-client.model';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { ElegidoFavoritoAction, NuevoDestinoAction } from '../states/destinos-viajes/destinos-viajes.actions';
import { Observable } from 'rxjs';
import { DestinosViajesState } from '../states/destinos-viajes/destinos-viajes.reducer';
import { selectFavorito, selectItems } from '../states/destinos-viajes/destinos-viajes.selector';

@Component({
    selector: 'app-lista-destinos',
    standalone: true,
    templateUrl: './lista-destinos.component.html',
    styleUrl: './lista-destinos.component.css',
    imports: [DestinoViajeComponent, CommonModule, FormDestinoViajeComponent, AsyncPipe]
})

export class ListaDestinosComponent implements OnInit{
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];
  destinos: DestinoViaje[];
  constructor( private destinosApiClient:DestinosApiClient, private store: Store<AppState>) {
    this.onItemAdded = new EventEmitter;
    this.updates = [];
    this.destinos = this.destinosApiClient.getAll(),
    store.select(state => state.destinos.favorito)
      .subscribe(d => {
        if (d != null) {
          this.updates.push('Se ha  elegido a ' + d.nombre);
        }
      })
  }

  ngOnInit(): void {
      
  }

  agregado(d: DestinoViaje) {
    this.store.dispatch(NuevoDestinoAction({destino: {
      ...d,
      voteUp: function () {
      },
      voteDown: function () {
      },
      setSelected: function (value: boolean): void {
      },
      voteReset: function (): void {
      }
    }}));
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
    console.log('se ha agregado el destino ' + d.nombre);
  }

  elegido(e: DestinoViaje) {
     this.destinosApiClient.elegir(e);
     this.store.dispatch(ElegidoFavoritoAction({destino: {
       ...e,
       voteUp: function () {
       },
       voteDown: function () {
       },
       setSelected: function (value: boolean): void {
       },
       voteReset: function (): void {
       }
     }}));
     console.log('se ha elegido el destino ' + e.nombre);
    }
}
