import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  SnapshotAction,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private datab: AngularFireDatabase) {}

  getAllRoomsCategories(): Observable<SnapshotAction<unknown>[]> {
    return this.datab
      .list('categories')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((cCategory) => ({
            key: cCategory.payload.key,
            ...(cCategory.payload.val() as any),
          }))
        )
      );
  }
}
