import { Component } from '@angular/core';
import { User } from '@app/models/user';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  toggle: boolean = false;
  userSession: User;

  constructor(private authenticationService: AuthenticationService) {
    this.userSession = this.authenticationService.userValue;
  }

  toggleMenu() {  
    this.toggle = !this.toggle;  
  }

  logout() {
    this.authenticationService.logout();
  }
}
