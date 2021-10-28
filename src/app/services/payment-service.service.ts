import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import paymentbaseUrl from './helper-payment';
import userbaseUrl from './helper-user';


@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(private http: HttpClient) {}

  public generatePayment(amount :any) {
    return this.http.post(`${paymentbaseUrl}/payment/`,amount);
  }

  public setsubscribe(username :any){
    return this.http.put(`${userbaseUrl}/user/setsubcribed`,username);
  }


}
