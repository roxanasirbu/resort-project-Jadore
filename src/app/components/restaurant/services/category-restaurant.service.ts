import { Injectable } from "@angular/core";
import { AngularFireDatabase, SnapshotAction } from "@angular/fire/compat/database";
import { Observable } from "rxjs";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CategoryRestaurantService {
    constructor(private datab: AngularFireDatabase) {}

    getAllRestaurantCategories(): Observable<SnapshotAction<unknown>[]> {
        return this.datab
        .list('restaurantCategories')
        .snapshotChanges()
        .pipe(
            map((items) => items.map( (iItem) => ({
                key: iItem.payload.key,
                ...(iItem.payload.val() as any)
                        })) )
        )
    }
}