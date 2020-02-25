import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  name:string;

  onClick(){
    this.name = "hello world"
  }
  ngOnInit() {
   
    
  }
}

