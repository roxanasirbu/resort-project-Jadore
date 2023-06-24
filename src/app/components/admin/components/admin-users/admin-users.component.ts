import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { LoginService } from 'src/app/components/auth/services/auth.service';
import { OrderService } from 'src/app/components/orders/services/order.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  currentUser: any;
  orderId: any;

  constructor(
    private adminService: AdminService,
    private loginService: LoginService,
    private db: AngularFireDatabase,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loginService
      .getUserAuth()
      .subscribe((user) => (this.currentUser = user));

    this.adminService.getAllUsers().subscribe((users: any) => {
      this.users = users.filter(
        (nonAdminUser: any) => nonAdminUser.isAdmin !== true
      );
    });
  }

  deleteUser(user: any): any {
    this.db.object('/users/' + user.key).remove();
    this.db.object('/orders/' + this.orderId).remove();
  }
}
