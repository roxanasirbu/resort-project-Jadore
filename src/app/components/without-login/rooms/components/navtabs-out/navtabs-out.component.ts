import { Component } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navtabs-out',
  templateUrl: './navtabs-out.component.html',
  styleUrls: ['./navtabs-out.component.css']
})
export class NavtabsOutComponent {
  constructor(
    public translate: TranslateService,){ translate.addLangs(['en', 'ro']);
    translate.setDefaultLang('en');}
  translateIn(lang: string): any {
    this.translate.use(lang);
  }
  
  showLanguageMenu(menu: MatMenuTrigger): any {
    menu.openMenu();
  }
}
