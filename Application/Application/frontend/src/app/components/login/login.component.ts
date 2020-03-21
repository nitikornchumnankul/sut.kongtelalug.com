import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  constructor(private authSerivce: AuthService, 
    private router: Router,
    private flashMessage: FlashMessagesService
    ) { }
  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }
    this.authSerivce.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authSerivce.storeUserData(data.token, data.user);
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['']);
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['login']);
      }
    });
    console.log(this.username);
    console.log(this.password);
    console.log(user);

  }

}


