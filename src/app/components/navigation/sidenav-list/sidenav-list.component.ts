import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/components/auth/services/auth.service';
import { ShoppingBasketService } from '../../basket/services/shopping-basket.service';
import { Router } from '@angular/router';

import { map, mergeMap, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MatMenuTrigger } from '@angular/material/menu';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {
  @Output() closeSideNavigation = new EventEmitter();

  user: any;
  nbrOfRoomsInShoppingCart = 0;
  constructor(
    public authService: LoginService,
    public shoppingCart: ShoppingBasketService,
    private router: Router,
    public translate: TranslateService,){ translate.addLangs(['en', 'ro']);
    translate.setDefaultLang('en');}

  ngOnInit(): void {
    this.authService
    .getCurrentUser()
    .pipe(
      switchMap((user) => {
        if (!user) {
          return 'error';
        }
        return this.authService.getUserAuth();
      }),
      mergeMap((userDb) =>
        this.shoppingCart.getListItemsShoppingCart().pipe(
          map((roomsShoppingCart) => {
            return [userDb, roomsShoppingCart];
          })
        )
      )
    )
    .subscribe(
      (arr: any[]) => {
        const userDb = arr[0];
        const roomsShoppingCart = arr[1];
        this.nbrOfRoomsInShoppingCart = (roomsShoppingCart as any[]).length;
        if (userDb !== 'e') {
          this.user = userDb;
        } else {
          this.user = null;
        }
      },
      (error) => console.log(error)
    );
  }

  onLogout() {
    this.authService.logout();
  }

  onToggleClose() {
    this.closeSideNavigation.emit();
  }

  translateIn(lang: string): any {
    this.translate.use(lang);
  }
  
  showLanguageMenu(menu: MatMenuTrigger): any {
    menu.openMenu();
  }
}
