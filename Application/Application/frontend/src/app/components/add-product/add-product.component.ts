import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  
  name:any;
  image:any;
  description:any;
  Catag:any;

  constructor(
    private authservice: AuthService,
    private router: Router) { }
  ngOnInit() {
  }


  
  onProductSubmit(){

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('image', this.image);
    formData.append('description', this.description);
    formData.append('Catag',this.Catag);
    
    console.log(this.name);
    console.log(this.image);
    console.log( this.description);
    console.log(this.Catag);
    console.log();
    // const product ={
    //   name: this.name,
    //   image : this.image,
    //   description: this.description,
    //   Catag: this.Catag
    // }

    this.authservice.addProduct(formData)
  }
  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }
}

