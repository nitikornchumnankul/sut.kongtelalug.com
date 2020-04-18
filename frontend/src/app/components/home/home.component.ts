import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  name: String;
  product_id:String;
  img: String;
  price: 350;
  added: boolean;

  
  constructor(private authService: AuthService,
    private router: Router, 
    private toastr: ToastrService)
      {
     }


  ngOnInit() {
    
  }

  onEditProduct(product: any) {
    this.authService.storeProductData(product);
    this.router.navigate(['editproduct']);
  }
  
  // onDeleteProduct(product: any) {
  //   this.authService.deleteProduct(product._id).Subscription(data => {
  //     if (data.success) {
  //       this.toastr.success('Successfully Deleted!', 'Delete!', {timeOut: 2000,});
  //       this.router.navigate(['/products']);
  //     } else {
  //       this.toastr.error('Something went wrong!', 'Error!', { timeOut: 2000, });
  //       this.router.navigate(['/products']);
  //     }
  //   });
  // }

  onAddProductToCart(){
  
    const item = {
      name:"ปากกา" ,
      price: 350,
      added: true,
      quantity:1
    }
    this.authService.storeItemToOrder(item);
    this.toastr.success('Item is Added to your Cartng!', 'Cart!',{
      timeOut: 1000,
    });
   
  }

}
