import { BehaviorSubject, Observer, Subject } from 'rxjs';
import { DestinoViaje } from './destino-viaje.model';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { ElegidoFavoritoAction, NuevoDestinoAction } from '../states/destinos-viajes/destinos-viajes.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class DestinosApiClient {
	destinos: DestinoViaje[];
	current: Subject<DestinoViaje | null> = new BehaviorSubject<DestinoViaje | null>(null);
	constructor(private store: Store<AppState>) {
		this.destinos = []
	}
	add(d:DestinoViaje){
		this.destinos.push(d);
	}
	getAll(): DestinoViaje[]{
		return this.destinos;
	}
	elegir(d:DestinoViaje) {
		this.destinos.forEach(x => x.setSelected(false));
		d.setSelected(true);
		this.current.next(d);
	}
	subscribeOnChange(fn: any) {
		this.current.subscribe(fn);
	}

}