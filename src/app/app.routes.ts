import { Routes, RouterModule } from '@angular/router';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: ListaDestinosComponent},
    { path: 'destino', component: DestinoDetalleComponent}
];
