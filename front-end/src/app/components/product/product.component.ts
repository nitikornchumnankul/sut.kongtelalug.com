import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  name:any;
  add:any;
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.http.get('http://localhost:8080/product/').subscribe(res =>{
      this.name = res
    });
  }

  onClick(){
    this.add = "test"
    console.log(this.add)
  }
  toArray(data) {
    const arr = new Array();
    data.forEach(d => {
      arr.push(d);
    });
    return arr;
  }
  

}


