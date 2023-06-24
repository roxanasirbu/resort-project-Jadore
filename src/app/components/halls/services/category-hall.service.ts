import { Injectable } from "@angular/core";
import { AngularFireDatabase, SnapshotAction } from "@angular/fire/compat/database";
import { Observable } from "rxjs";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CategoryHallService {
    constructor(private datab: AngularFireDatabase) {}

    getAllCategories(): Observable<SnapshotAction<unknown>[]> {
        return this.datab
        .list('hallsCategories')
        .snapshotChanges()
        .pipe(
            map((change) => change.map( (c) => ({
                key: c.payload.key,
                ...(c.payload.val() as any)
                        })) )
        )
    }
}