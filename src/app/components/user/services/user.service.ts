import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}
  // method used to save the authenticated user in the database
  saveUser(user: any): void {
    if (!user) {
      return;
    }
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
    });
  }

  getByUid(uid: string): any {
    return this.db
      .object('/users/' + uid)
      .snapshotChanges()
      .pipe(
        map((user) => {
          const objectUser: any = user.payload.val();
          objectUser.id = user.payload.key;
          return objectUser;
        })
      );
  }
}
