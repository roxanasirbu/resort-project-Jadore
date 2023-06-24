import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AdminModule } from './components/admin/admin.module';
import { HomeComponent } from './components/home/home.component';

import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RoomsListComponent } from './components/rooms/components/rooms-list/rooms-list.component';
import { RoomFormComponent } from './components/rooms/components/room-form/room-form.component';
import { RoomContentComponent } from './components/rooms/components/room-content/room-content.component';
import { ReservationsComponent } from './components/rooms/components/reservations/reservations.component';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GalleryDirective } from './components/rooms/components/room-content/gallery.directive'; 
import { GalleryMobileDirective } from './components/rooms/components/room-content/gallery.directive_mobile'; 
import { OrdersComponent } from './components/orders/components/orders/orders.component';

import { LoginComponent } from './components/login/login.component';
import { HallsListComponent } from './components/halls/components/halls-list/halls-list.component';
import { HallDetailComponent } from './components/halls/components/hall-detail/hall-detail.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { NavtabsComponent } from './components/navigation/navtabs/navtabs.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';

import { SidenavAdminComponent } from './components/admin/components/admin-navigation/sidenav-admin/sidenav-admin.component';
import { NavtabsAdminComponent } from './components/admin/components/admin-navigation/navtabs-admin/navtabs-admin.component';
import { RoomsListOutComponent } from './components/without-login/rooms/components/rooms-list-out/rooms-list-out.component';
import { RoomsContentOutComponent } from './components/without-login/rooms/components/rooms-content-out/rooms-content-out.component';
import { NavtabsOutComponent } from './components/without-login/rooms/components/navtabs-out/navtabs-out.component';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminRoomsComponent } from './components/admin/components/admin-rooms/admin-rooms.component';
import { AdminUsersComponent } from './components/admin/components/admin-users/admin-users.component';
import { RestaurantFormComponent } from './components/restaurant/components/restaurant-form/restaurant-form.component';
import { RestaurantListComponent } from './components/restaurant/components/restaurant-list/restaurant-list.component';
import { AdminRestaurantComponent } from './components/admin/components/admin-restaurant/admin-restaurant.component';
import { AdminHallsComponent } from './components/admin/components/admin-halls/admin-halls.component';
import { HallsFormComponent } from './components/halls/components/halls-form/halls-form.component';

import { HallsListOutComponent } from './components/without-login/halls/components/halls-list/halls-list.component';
import { RestaurantListOutComponent } from './components/without-login/restaurant/restaurant-list-out/restaurant-list-out.component';
import { HallsDetailOutComponent } from './components/without-login/halls/components/halls-detail-out/halls-detail-out.component';

import {RouterModule} from '@angular/router';


import { AdminDashboardComponent } from './components/admin/components/admin-dashboard/admin-dashboard.component';

import { FooterComponent } from './components/navigation/footer/footer.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ServiceWorkerModule } from '@angular/service-worker';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MapComponent } from './components/map/map.components';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { HallListAdminComponent } from './components/admin/components/view-hall/hall-list-admin/hall-list-admin.component';
import { HallDetailAdminComponent } from './components/admin/components/view-hall/hall-detail-admin/hall-detail-admin.component';
import { RoomListAdminComponent } from './components/admin/components/view-room/room-list-admin/room-list-admin.component';
import { RoomDetailAdminComponent } from './components/admin/components/view-room/room-detail-admin/room-detail-admin.component';

import { ReservationsAComponent } from './components/admin/components/view-reservations/reservations/reservations-a.component';
import { OrdersAComponent } from './components/admin/components/view-reservations/orders/components/orders/orders.component';




// Function to load translations from assets folder
export function httpTranslateLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FirstPageComponent,
    RoomsListComponent,
    RoomFormComponent,
    RoomContentComponent,
    ReservationsComponent,

    GalleryDirective,
    GalleryMobileDirective,
    OrdersComponent,

    HallsListComponent,
    HallDetailComponent,
    HeaderComponent,
    NavtabsComponent,
    AdminRoomsComponent ,

    SidenavListComponent,
    SidenavAdminComponent,
    NavtabsAdminComponent,
    RoomsListOutComponent,
    RoomsContentOutComponent,
    NavtabsOutComponent,
    AdminUsersComponent,
    RestaurantFormComponent,
    RestaurantListComponent,
    AdminRestaurantComponent,
    AdminHallsComponent,
    HallsFormComponent,

    HallsListOutComponent,
    RestaurantListOutComponent,
    HallsDetailOutComponent,
    AdminDashboardComponent,
    FooterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    MapComponent,
    HallListAdminComponent,
    HallDetailAdminComponent,
    RoomListAdminComponent,
    RoomDetailAdminComponent,
    ReservationsAComponent,
    OrdersAComponent,



   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AdminModule,
    FormsModule,
    SlickCarouselModule,
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDatepickerModule ,
    MatNativeDateModule ,
    RouterModule,
    HttpClientModule ,
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgxMapLibreGLModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
