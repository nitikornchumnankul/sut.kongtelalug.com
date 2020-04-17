import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import {FlashMessagesService} from 'angular2-flash-messages';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  product: any;
  oldproduct: any;
  role: any;
  iteml: any;
  totall: any;


  constructor(private http: HttpClient,
    private router: Router,
    private flashMessage:FlashMessagesService
  ) { }
  registerUser(user) {
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',    
    });
    let options = { headers: headers };
    console.log(user)

 
    return this.http.post('http://0.0.0.0:8080/users/register', user,options).subscribe(res =>{
      console.log(res)
      if(true){
        this.flashMessage.show('Successfully Registered', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      }else{
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });

  };

  authenticateUser(user) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',    
    });
    let options = { headers: headers };
    return this.http.post('http://0.0.0.0:8080/users/authenticate', user,options)

  }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  loggedIn() {
    return tokenNotExpired('id_token');
  }
  getUser() {
    return this.user;
  }
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', user.role);
    this.authToken = token;
    this.user = user;
    this.role = user.role;
  }
  addProduct(product) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    });
    let options = { headers: headers };
    this.loadToken();

    return this.http.post<any>('http://0.0.0.0:8080/users/addproduct', product, options).subscribe(res => {
      if (res.success) {
        Swal.fire({
          type: 'success',
          title: 'บันทึกไม่สำเร็จ',
          showConfirmButton: false,
          timer: 1300
        })
        this.router.navigate(['/addproduct']);
      } else {
        Swal.fire({
          type: 'error',
          title: 'บันทึกไม่สำเร็จ',
          showConfirmButton: false,
          timer: 1300
        })
        this.router.navigate(['/addproduct']);
      }
    })

  }
  getProducts() {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get('users/product')

  }
  storeItemToOrder(item: any) {

    var tempItem = JSON.parse(localStorage.getItem("items"));
    if (tempItem == null) tempItem = [];
    localStorage.setItem("item", JSON.stringify(item));
    tempItem.push(item);
    localStorage.setItem("items", JSON.stringify(tempItem));

  }
  deleteProduct(productID) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    });
    let options = { headers: headers };
    this.loadToken();

    return this.http.delete('http://0.0.0.0:8080/users/deleteproduct/' + productID,options).subscribe(res => {
      console.log(res)
    })

  }

  userRole() {
    const role = localStorage.getItem('role');
    if (role == 'admin')
      return true;
    else
      return false;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  updateItemsInOrder(items: any) {
    localStorage.removeItem("items");
    localStorage.setItem("items", JSON.stringify(items));
  }
  getOrderFromItems() {
    return this.iteml = JSON.parse(localStorage.getItem("items"));
  }
  orderClear() {
    localStorage.removeItem("items");
    localStorage.removeItem("item");
  }
  storeTotal(total: any) {
    this.totall = total;
  }

  storeProductData(product1: any) {
    this.oldproduct = product1;

  }
}
