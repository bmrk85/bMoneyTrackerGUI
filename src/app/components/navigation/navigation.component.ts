import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth-service/auth.service";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  private enUrl = `${environment.baseUrl}:4200`;
  private huUrl = `${environment.baseUrl}:4201`;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  changeLang() {
    window.location.href.startsWith(this.enUrl) ? window.location.href=this.huUrl : window.location.href=this.enUrl;
  }
}
