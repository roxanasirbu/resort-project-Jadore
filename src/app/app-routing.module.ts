import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminRoomsComponent } from './components/admin/components/admin-rooms/admin-rooms.component';
import { LoginService } from './components/auth/services/auth.service';
import { AdminService } from './components/admin/services/admin.service';
import { RoomsListComponent } from './components/rooms/components/rooms-list/rooms-list.component';
import { RoomContentComponent } from './components/rooms/components/room-content/room-content.component';
import { ReservationsComponent } from './components/rooms/components/reservations/reservations.component';

import { OrdersComponent } from './components/orders/components/orders/orders.component';

import { HallsListComponent } from './components/halls/components/halls-list/halls-list.component';
import { HallDetailComponent } from './components/halls/components/hall-detail/hall-detail.component';

import { RoomsContentOutComponent } from './components/without-login/rooms/components/rooms-content-out/rooms-content-out.component';
import { RoomsListOutComponent } from './components/without-login/rooms/components/rooms-list-out/rooms-list-out.component';
import { AdminUsersComponent } from './components/admin/components/admin-users/admin-users.component';
import { RestaurantListComponent } from './components/restaurant/components/restaurant-list/restaurant-list.component';
import { AdminRestaurantComponent } from './components/admin/components/admin-restaurant/admin-restaurant.component';
import { AdminHallsComponent } from './components/admin/components/admin-halls/admin-halls.component';
import { HallsListOutComponent } from './components/without-login/halls/components/halls-list/halls-list.component';
import { RestaurantListOutComponent } from './components/without-login/restaurant/restaurant-list-out/restaurant-list-out.component';
import { HallsDetailOutComponent } from './components/without-login/halls/components/halls-detail-out/halls-detail-out.component';
import { AdminDashboardComponent } from './components/admin/components/admin-dashboard/admin-dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { verifyHostBindings } from '@angular/compiler';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { MapComponent } from './components/map/map.components';
import { HallListAdminComponent } from './components/admin/components/view-hall/hall-list-admin/hall-list-admin.component';
import { HallDetailAdminComponent } from './components/admin/components/view-hall/hall-detail-admin/hall-detail-admin.component';
import { RoomListAdminComponent } from './components/admin/components/view-room/room-list-admin/room-list-admin.component';
import { RoomDetailAdminComponent } from './components/admin/components/view-room/room-detail-admin/room-detail-admin.component';

import { ReservationsAComponent } from './components/admin/components/view-reservations/reservations/reservations-a.component';
import { OrdersAComponent } from './components/admin/components/view-reservations/orders/components/orders/orders.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: FirstPageComponent},
  {
    path: 'admin-rooms',
    component: AdminRoomsComponent,
    canActivate: [LoginService, AdminService],
  },
  {
    path: 'admin-users',
    component: AdminUsersComponent,
    canActivate: [LoginService, AdminService],
  },
  {
    path: 'admin-restaurant',
    component: AdminRestaurantComponent,
    canActivate: [LoginService, AdminService],
  },
  {
    path: 'admin-halls',
    component: AdminHallsComponent,
    canActivate: [LoginService, AdminService],
  },

  {
    path: 'admin-v-room',
    component: RoomListAdminComponent,
    canActivate: [LoginService, AdminService]
  },
  {
    path: 'admin-v-room-co/:id',
    component:  RoomDetailAdminComponent,
    canActivate: [LoginService, AdminService]
  },

  {
    path: 'admin-v-hall',
    component: HallListAdminComponent,
    canActivate: [LoginService, AdminService]
  },
  {
    path: 'admin-v-hall-co/:id',
    component:  HallDetailAdminComponent,
    canActivate: [LoginService, AdminService]
  },
  {
    path: 'admin-dash',
    component: AdminDashboardComponent,
    canActivate: [LoginService, AdminService],
  },

  {
    path: 'reservations-a',
    component: ReservationsAComponent,
    canActivate: [LoginService],
  },

  {
    path: 'orders-a',
    component: OrdersAComponent,
    canActivate: [LoginService],
  },



//user
  {path: 'rooms', component: RoomsListComponent},
  {
    path: 'room-content/:id',
    component: RoomContentComponent,
  },
  {
    path: 'room-content2/:id',
    component: RoomContentComponent,
  },
  {
    path: 'hall-content/:id',
    component: HallDetailComponent,
  },
  {
    path: 'reservations',
    component: ReservationsComponent,
    canActivate: [LoginService],
  },
  
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [LoginService],
  },
 
  {
    path: 'halls', component: HallsListComponent
  },
  {
    path: 'halls-out', component: HallsListOutComponent
  },
  {
    path: 'hall-detail/:id', component: HallDetailComponent
  },
  {
    path: 'restaurant', component: RestaurantListComponent
  },
  {path: 'rooms-out', component: RoomsListOutComponent},
  {
    path: 'room-out-content/:id',
    component: RoomsContentOutComponent,
  },
  {path: 'restaurant-out', component: RestaurantListOutComponent},
  {
    path: 'hall-detail-out/:id', component: HallsDetailOutComponent
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent
  },
   {
    path: 'verify-email', component: VerifyEmailComponent
   },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
