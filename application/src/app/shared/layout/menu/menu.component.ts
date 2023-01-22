import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '@app/models/user';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Output () toggleResponse: EventEmitter<boolean> = new EventEmitter();
  toggle: boolean = false;
  userSession: User;

  constructor(private authenticationService: AuthenticationService) {
    this.userSession = this.authenticationService.userValue;
  }

  toggleMenu() {  
    this.toggle = !this.toggle;
    this.toggleResponse.emit(this.toggle);
  }

  logout() {
    this.toggle = false;
    this.authenticationService.logout();
  }
}
