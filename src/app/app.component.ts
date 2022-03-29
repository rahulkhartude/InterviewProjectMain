import { Component } from '@angular/core';
import { DataServiceService } from './data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NewInterview';
    
  subscribedData:any
  constructor(private urlData:DataServiceService){
    urlData.myData().subscribe((data)=>this.subscribedData=data)
    
  }
   

}
