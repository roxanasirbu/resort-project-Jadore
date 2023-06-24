import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HallService } from 'src/app/components/halls/services/halls.service';
import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { HallsFormComponent } from 'src/app/components/halls/components/halls-form/halls-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-halls',
  templateUrl: './admin-halls.component.html',
  styleUrls: ['./admin-halls.component.scss']
})
export class AdminHallsComponent implements OnInit {
  rooms: any[] = [];
  displayedColumns: string[] = ['number', 'category', 'actions'];
  constructor(
    private serviceHall: HallService,
    private serviceDialog: MatDialog,
    private sweetService: SweetAlertService,
    private routerNavigation: Router,
  ) {}

  ngOnInit(): void {
    this.serviceHall
      .getAllItems()
      .subscribe((rooms: any[]) => (this.rooms = rooms));
  }

  AddItem(): void {
    const dialogRef = this.serviceDialog.open(HallsFormComponent, {
      width: '650px',
    });
  }
  Edit(row: { key: any }): void {
    const dialogRef = this.serviceDialog.open(HallsFormComponent, {
      width: '650px',
      data: { id: row.key },
    });
  }
  Delete(row: { key: string }): void {
    if (window.confirm('Are you sure  want to delete this hall ?')) {
      this.serviceHall.deleteItem(row.key);
      this.sweetService.alertMessage('Successfully deleted');
    } else {
      this.sweetService.alertMessage('Looks good.');
    }
  }

  backToHall(): void {
    this.routerNavigation.navigate(['/admin-v-hall']);
  }
}