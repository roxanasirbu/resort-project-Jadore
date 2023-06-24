import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() SideNavigationToggle = new EventEmitter();

constructor(public translate: TranslateService,){ translate.addLangs(['en', 'ro']);
translate.setDefaultLang('en');}

ngOnInit(): void {
  
}
onToggleOpenSideNav(){
  this.SideNavigationToggle.emit();
 }
 translateIn(lang: string): any {
  this.translate.use(lang);
}

showLanguageMenu(menu: MatMenuTrigger): any {
  menu.openMenu();
}
}
