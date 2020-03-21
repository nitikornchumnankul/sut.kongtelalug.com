import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  role:String;

  constructor(private flashMessage:FlashMessagesService,
  
  private authservice:AuthService,
  private router:Router) { }

  ngOnInit() {
  }
  onRegisterSubmit(){


    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('username', this.username);
    formData.append('password', this.password);
    formData.append('role', 'users');


 
  
    this.authservice.registerUser(formData)

  }
}
