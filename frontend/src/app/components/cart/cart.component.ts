import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items:any;
  quantity:number=1;
  subtotal:number;
  totalitems:number;
  total:number;
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.items =this.authService.getOrderFromItems();
    if(this.items==null){
      Swal.fire({
        type: 'error',
        title: 'กรุณาเพิ่มบางรายการไปยังรถเข็น',
        showConfirmButton: false,
        timer: 1300
      })
      this.subtotal=0;
      this.total=0;
      this.totalitems=0;
    }
    else{
    this.totalitems=this.items.length;
     this.subtotal=this.totalitems * 350;
     this.total=this.subtotal + 40;
    }
      
  }
  removeProduct(i){
    if (i > -1) {
      this.items.splice(i, 1);
    }
    this.totalitems = this.items.length;
    this.subtotal = this.totalitems * 350;
    this.total = this.subtotal + 40;
    this.authService.updateItemsInOrder(this.items);
    this.router.navigate(['/cart']);
  }
 
  itemslenth(){
    if(this.items.length ==null|| this.items.length == 0){
      return false; 
    }
    else
    return true;
  }
  checkout(){
    if (this.items.length == null || this.items.length == 0){
      Swal.fire({
        type: 'error',
        title: 'กรุณาเพิ่มบางรายการไปยังรถเข็น',
        showConfirmButton: false,
        timer: 1300
      })
    }
    else{
      
      this.authService.storeTotal(this.total);
       this.router.navigate(['/checkout']);
    }

  }


}
