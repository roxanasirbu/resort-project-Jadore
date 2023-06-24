import { Component, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { LoginService } from './components/auth/services/auth.service';
import { SweetAlertService } from './services/sweetalert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  user: any;
  nbrOfRoomsInShoppingCart = 0;
  isDarkTheme = false;
  isNavBarTheme = true;
  title: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    public translate: TranslateService,
    private sweetService: SweetAlertService
    
  ) {
    translate.addLangs(['en', 'ro']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.loginService
      .getCurrentUser()
      .pipe(
        switchMap((user) => {
          if (!user) {
            return 'error';
          }
          return this.loginService.getUserAuth();
        })
      )
      
  }

  recapReservations(): void {
    if (this.nbrOfRoomsInShoppingCart <= 0) {
      this.sweetService.alertMessage(`<h2> Empty Shopping Cart</h2>`);
      return;
    }
    this.router.navigate(['/orders']);
  }

  loginMethod(): void {
    this.loginService.loginWithGoogle();
  }

  logoutMethod(): void {
    this.user = null;
    this.loginService.logout();
  }

  open(menu: { openMenu: () => void }): void {
    menu.openMenu();
  }

  toggleTheme(): any {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme === true) {
      this.isNavBarTheme = false;
      // no navbar settings applied, only dark theme settings
    } else {
      this.isNavBarTheme = true;
      // navbar settings applied together with light theme settings
    }
  }

  isHomeRoute(): any {
    return this.router.url === '/' || this.router.url === '/about';
  }

  translateIn(lang: string): any {
    this.translate.use(lang);
  }

  showLanguageMenu(menu: MatMenuTrigger): any {
    menu.openMenu();
  }


  
}
