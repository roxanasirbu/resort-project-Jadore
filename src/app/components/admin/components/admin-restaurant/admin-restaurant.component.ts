import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RestaurantFormComponent } from 'src/app/components/restaurant/components/restaurant-form/restaurant-form.component';
import { RestaurantService } from 'src/app/components/restaurant/services/restaurant.service';
import { SweetAlertService } from 'src/app/services/sweetalert.service';


@Component({
  selector: 'app-admin-restaurant',
  templateUrl: './admin-restaurant.component.html',
  styleUrls: ['./admin-restaurant.component.scss']
})
export class AdminRestaurantComponent implements OnInit {
  items: any[] = [];
  displayedColumns: string[] = ['number', 'category', 'price', 'actions'];
  constructor(
    private serviceRestaurant: RestaurantService,
    private serviceDialog: MatDialog,
    private sweetService: SweetAlertService,
    private routerNavigation: Router,
  ) {}

  ngOnInit(): void {
    this.serviceRestaurant
      .getAllItems()
      .subscribe((items: any[]) => (this.items = items));
  }

  AddItem(): void {
    const dialogRef = this.serviceDialog.open(RestaurantFormComponent, {
      width: '650px',
    });
  }
  Edit(row: { key: any }): void {
    const dialogRef = this.serviceDialog.open(RestaurantFormComponent, {
      width: '650px',
      data: { id: row.key },
    });
  }
  Delete(row: { key: string }): void {
    if (window.confirm('Are you sure  want to delete this Room ?')) {
      this.serviceRestaurant.deleteItem(row.key);
      this.sweetService.alertMessage('Successfully deleted');
    } else {
      this.sweetService.alertMessage('Looks good.');
    }
  }

  backToRestaurant(): void {
    this.routerNavigation.navigate(['/restaurant']);
  }
}
