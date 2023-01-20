import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user: User;
  toggle: boolean;
  isHome: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private config: PrimeNGConfig, 
    private router: Router
  ) {
    this.authenticationService.user.subscribe(x => this.user = x);

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/home' || event.url == '/') {
          this.isHome = true;
        }
        else {
          this.isHome = false;
        }
        console.log(event.url);
      }
    });

    this.config.setTranslation({
      "dayNames": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      "dayNamesShort": ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      "dayNamesMin": ["Do","Lu","Ma","Mi","Ju","Vi","Sá"],
      "monthNames": ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
      "monthNamesShort": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      "today": "Hoy",
      "weekHeader": "Sem",
      "weak": "Semana"
    });
  }

  toggleMenu(toggle: boolean) {
    this.toggle = toggle;
  }

  logout() {
    this.authenticationService.logout();
  }
}
