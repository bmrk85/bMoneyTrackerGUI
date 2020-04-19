import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth-service/auth.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {



  constructor(public authService: AuthService,
              private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
  }

  changeLang() {
    this.translate.use(this.translate.currentLang == 'en' ? 'hu' : 'en');
  }
}
