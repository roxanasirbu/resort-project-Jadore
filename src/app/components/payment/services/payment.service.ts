import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { LoginService } from '../../auth/services/auth.service'; 

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  userId: any;

  constructor(
    private db: AngularFireDatabase,
    private loginService: LoginService
  ) {
    this.loginService.getCurrentUser().subscribe((res) => {
      if (res) {
        this.userId = res.uid;
      }
    });
  }

  createPay(token: any, amount: number): any {
    // call back to function in firebase to call provider service for the payement
    // receive if its ok or no for payement
    const payment = { token, amount };
    return this.db.list(`/payments/${this.userId}`).push(payment);
  }
}
