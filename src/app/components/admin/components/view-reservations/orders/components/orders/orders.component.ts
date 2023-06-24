import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/components/auth/services/auth.service';
import { PaymentService } from 'src/app/components/payment/services/payment.service';
import { RoomService } from 'src/app/components/rooms/services/room.service';
import { ShoppingBasketService } from 'src/app/components/basket/services/shopping-basket.service'; 
import { environment } from 'src/environments/environment';
import { OrderService } from '../../services/order.service';
import { SweetAlertService } from 'src/app/services/sweetalert.service';

const stripe = require("stripe")('sk_test_51N184FKDGnFJBEnKb3lFcBZwNi4RJqO3McT67eiW1nEyGEKF4ONzW0se7YOv398mayD6s6pOcXbM7AZTwwsBwSfO008HDrXL6b');

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersAComponent implements OnInit {
  itemsOrder: any[] = [];
  user: any;
  orderID: any;
  checkoutDialog: any;
  amount: any;
  orderResult: any;


  constructor(
    private shoppingCart: ShoppingBasketService,
    private router: Router,
    private loginService: LoginService,
    private paymentService: PaymentService,
    private orderService: OrderService,
    private serviceRoom: RoomService,
    private db: AngularFireDatabase,
    private sweetAlert: SweetAlertService,

  ) {}

  ngOnInit(): void {

    // order informations
    this.shoppingCart
      .getListItemsShoppingCartMapItems()
      .subscribe((items: any[]) => {
        this.itemsOrder = items;
      });

    this.loginService
      .getUserAuth()
      .subscribe((user) => (this.user = user));


    // payment informations
   
    
   this.checkoutDialog = StripeCheckout.configure({
      key: environment.stripeKey,
      image:
        'https://firebasestorage.googleapis.com/v0/b/licenta-resort-project.appspot.com/o/terasa1.jpg?alt=media&token=3bc04ead-8e0f-476d-8ecf-d8aa1f0ff981',
      locale: 'auto',
      token: (token: any) => {
        this.paymentService.createPay(token, this.amount);
      },
    });
  }

  getTotal(): any {
    let total = 0;
    let count = 0;
    if (!this.itemsOrder) {
      return total;
    }
    this.itemsOrder.forEach((item) => {
      total = total + item.price;
      count++;
    });
    if (count >= 3) {
      total = total * 0.7;
    }
    return total;
  }

  getNumberOfPurchasedRooms(): any {
    let count = 0;
    if (!this.itemsOrder) {
      return count;
    }
    this.itemsOrder.forEach(() => {
      count = count + 1;
    });

    return count;
  }

  GoToRooms(): void {
    this.router.navigate(['/admin-dash']);
  }

  DeleteRoom(key: string): void {
    this.serviceRoom.deleteRoomShoppingCart(key);
  }

  @HostListener('window.popstate')
  onPopState(): any {
    this.checkoutDialog.close();
  }

  async handlePayment(): Promise<any> {
    const order = {
      dateCreated: new Date().getTime(),
      userId: this.user.id,
      items: this.itemsOrder,
      total: this.getTotal(),
      paid: true,
    };

    if (order.total === 0) {
      this.sweetAlert.alertMessage('You cannot continue with the payment if the shopping cart is empty')
      this.router.navigate(['/admin-dash']);
      return;
    } else {
      for (const eachRoom of this.itemsOrder) {
        this.db
          .list(`/orders/` + eachRoom.key + `/reservations/`)
          .push(eachRoom.reservationDay);
      }

      this.orderResult = await this.orderService.createOrder(order);
      this.shoppingCart.clearShoppingCart();

      this.amount = this.getTotal();

      localStorage.setItem('orderId', this.orderResult.key as any);

      
      this.checkoutDialog.open({
        name: 'Jadore payment',
        description: 'Thank you!',
        amount: this.amount * 100,
      });

      this.router.navigate(['/reservations-a']);

      this.orderID = `<h2> Your order has been received! </h2> <br/>  <h2> Comanda ta a fost primită! </h2> <br/>
      <h2> <strong style="color: rgb(6, 65, 10)"> Thank you choosing us. </strong>  <br/>
        <strong style="color: rgb(6, 65, 10)"> Mulțumim că ne-ați ales pe noi. </strong>  <br/>
        ID:  <strong style="color: rgb(6, 65, 10)"> ${this.orderResult.key} </strong> </h2>`;
   this.sweetAlert.alertMessage(this.orderID)
    }
  }
}
