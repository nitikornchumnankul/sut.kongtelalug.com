import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
interface Status{
  status:string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  title = 'frontend';
  status_json :Status = {
    status:"OK"
  }

  constructor(private httpClient:HttpClient,header:HttpHeaders){
    
  }
  
  ngOnInit() {
    this.httpClient.get('http://0.0.0.0:80/',).subscribe(res =>{
      console.log(this.status_json)
    })
   console.log(this.status_json)
  }



}



