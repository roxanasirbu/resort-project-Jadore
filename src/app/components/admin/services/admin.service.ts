import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { LoginService } from 'src/app/components/auth/services/auth.service';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService{
  constructor(
    private login: LoginService,
    private route: Router,
    private db: AngularFireDatabase
  ) {}
  canActivate(): any {
    return this.login.getUserAuth().pipe(
      map((user) => {
        if (!user) {
          return false;
        }
        const userJson = JSON.stringify(user);
        const userJsonObj = JSON.parse(userJson);
        if (userJsonObj.isAdmin === true) {
          return true;
        } else {
          this.route.navigate(['/']);
          return false;
        }
      })
    );
  }

  getAllUsers(): Observable<SnapshotAction<unknown>[]> {
    return this.db
      .list('users')
      .snapshotChanges()
      .pipe(
        map((change) =>
          change.map((user) => ({
            key: user.payload.key,
            ...(user.payload.val() as any),
          }))
        )
      );
  }
}
