import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  filterFoodURL = 'http://localhost:1050/customer/filterRestaurant/';
  restaurantDetailsURL = 'http://localhost:1050/customer/detailsOfRestaurant/';
  foodDetailsURL = 'http://localhost:1050/customer/detailsOfFood/';
  loginURL = 'http://localhost:1050/customer/login/';
  registerURL = 'http://localhost:1050/customer/register/';
  profilePicURL = 'http://localhost:1050/customer/getProfileImage/';
  updateProfileURL = 'http://localhost:1050/customer/updateProfile/';
  orderingURL = 'http://localhost:1050/customer/placeOrder/';
  viewOrdersURL = 'http://localhost:1050/customer/viewOrders/';
  orderedFood: Array<any> = new Array<any>();

  seachFood(keyword): Observable<any> {
    return this.http.get<Observable<any>>(this.filterFoodURL + keyword);
  }
  getRestaurantDetails(id): Observable<any> {
    return this.http.get<Observable<any>>(this.restaurantDetailsURL + id);
  }
  getFoodDetails(id): Observable<any> {
    return this.http.get<Observable<any>>(this.foodDetailsURL + id);
  }
  customer_login(credentials): Observable<any> {
    return this.http.post<Observable<any>>(this.loginURL, credentials);
  }
  customer_register(customerDetails): Observable<any>{
    return this.http.post<Observable<any>>(this.registerURL, customerDetails);
  }
  getProfilePicture(): Observable<Blob>{
    return this.http.get(this.profilePicURL, { responseType: 'blob' });
  }
  updateProfile(updatedDetails): Observable<any> {
    return this.http.put<Observable<any>>(this.updateProfileURL, updatedDetails);
  }

  sendOrderedFood(orderedFoodArray){
    this.orderedFood = orderedFoodArray;
  }

  getOrderedFood(){
    return this.orderedFood;
  }

  orderFood(orderObj): Observable<any>{
    return this.http.post<Observable<any>>(this.orderingURL, orderObj);
  }

  viewOrders(): Observable<any>{
    return this.http.get<Observable<any>>(this.viewOrdersURL);
  }


}
