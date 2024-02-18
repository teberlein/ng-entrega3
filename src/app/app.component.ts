import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DestinoViaje } from './models/destino-viaje.model';
import { Observable } from 'rxjs';
import { ReservasModule } from './reservas/reservas.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DestinoViajeComponent, CommonModule, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, NgIf, ReservasModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-wishlist';
  time = new Observable(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000)
  })

  destinoAgregado(d: DestinoViaje) {
    //alert(d.nombre);
  }
}
