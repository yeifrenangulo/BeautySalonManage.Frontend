import { Component } from '@angular/core';
import { User } from '@app/models/user';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userSession: User;
  fechaActual: Date;
  saludo: string;

  constructor(private authenticationService: AuthenticationService) {
    this.userSession = this.authenticationService.userValue;
    this.fechaActual = new Date();
    this.mostrarSaludo();
  }

  mostrarSaludo(): void {
    let fecha = new Date(); 
    let hora = fecha.getHours();

    if(hora >= 0 && hora < 12){
      this.saludo = "Buenos días";
    }
   
    if(hora >= 12 && hora < 18){
      this.saludo = "Buenas tardes";
    }
   
    if(hora >= 18 && hora < 24){
      this.saludo = "Buenas noches";
    }
  }
}
