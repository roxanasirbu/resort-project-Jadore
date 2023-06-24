import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/components/auth/services/auth.service';
import { RoomFormComponent } from 'src/app/components/rooms/components/room-form/room-form.component'; 
import { RoomService } from 'src/app/components/rooms/services/room.service';
import { SweetAlertService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-admin-rooms',
  templateUrl: './admin-rooms.component.html',
  styleUrls: ['./admin-rooms.component.scss']
})
export class AdminRoomsComponent implements OnInit {
  rooms: any[] = [];
  displayedColumns: string[] = ['number', 'category', 'price', 'actions'];
  constructor(
    private serviceRoom: RoomService,
    private serviceDialog: MatDialog,
    private sweetService: SweetAlertService,
    public authService: LoginService,
    private routerNavigation: Router,
  ) {}

  ngOnInit(): void {
    this.serviceRoom
      .getAllRooms()
      .subscribe((rooms: any[]) => (this.rooms = rooms));
  }
  
  
  createRoom(): void {
    const dialogRef = this.serviceDialog.open(RoomFormComponent, {
      width: '650px',
    });
  }
  Edit(row: { key: any }): void {
    const dialogRef = this.serviceDialog.open(RoomFormComponent, {
      width: '650px',
      data: { id: row.key },
    });
  }
  Delete(row: { key: string }): void {
    if (window.confirm('Are you sure  want to delete this Room ?')) {
      this.serviceRoom.deleteRoom(row.key);
      this.sweetService.alertMessage('Successfully deleted');
    } else {
      this.sweetService.alertMessage('Looks good.');
    }
  }

  onLogout() {
    this.authService.logout();
  }

  backToRooms(): void {
    this.routerNavigation.navigate(['/admin-v-room']);
  }
}
