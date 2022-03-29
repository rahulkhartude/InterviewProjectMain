import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css'],
})
export class StartPageComponent implements OnInit {
  subscribedData: any;
  constructor(private route: Router, private urlData: DataServiceService) {}

  ngOnInit(): void {
    this.urlData.myData().subscribe((data) => {
      this.subscribedData = data;
    });
    localStorage.clear();
  }

  testAngular(testName: any, id: any) {
    this.route.navigate(['/test', testName, id]);
  }
  testJavascript(tests1: any, id: any) {
    this.route.navigate(['/test', tests1, id]);
  }

  testNode(tests2: any, id: any) {
    this.route.navigate(['/test', tests2, id]);
  }
}
