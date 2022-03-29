import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  Myname: any;
  subscribedData: any;
  subscribedQues: any;
  index = 0;
  correctAnswers: any[] = [];
  tempID: any;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private urlData: DataServiceService
  ) {}

  ngOnInit(): void {
   this.Myname = this.router.snapshot.paramMap.get('name');

//    this.router.paramMap.subscribe((info:any)=>{
//   this.Myname=(info.get("name"))
// }) 
// this.index = this.router.snapshot.paramMap.get('qNo')

    this.router.paramMap.subscribe((info: any) => {
      this.tempID = parseInt(info.get('qNo') || '');
     if (this.subscribedQues) {
        this.fetchQue();
      }
    });
      this.urlData.myData().subscribe((info) => {
      this.subscribedData = info;
      this.fetchId();
    });
    this.all = JSON.parse(localStorage.getItem('ans') || '');
  }

  // for which id start is pressed
  fetchId() {
    for (let i = 0; i < this.subscribedData.tests.length; i++) {
      if (this.subscribedData.tests[i].name === this.Myname) {
        this.subscribedQues = this.subscribedData.tests[i].questions;
      }
    }
    console.log(this.subscribedData);
    console.log(this.subscribedQues);
    for (let i = 0; i < this.subscribedQues.length; i++) {
      this.correctAnswers[i] = this.subscribedQues[i].correctOptionIndex;
    }
    this.fetchQue();
  }
  fetchQue() {
    for (let i = 0; i < this.subscribedQues.length; i++) {
      if (this.tempID === this.subscribedQues[i]._id) {
        this.index = i;
      }
    }
  }
  //for index changing when we uses prev or next
  change(val: number) {
    if (val === 1) {
      this.index++;
      this.route.navigate([
        '/test',
        this.Myname,
        this.subscribedQues[this.index]._id,
      ]);
    } else {
      this.index--;
      this.route.navigate([
        '/test',
        this.Myname,
        this.subscribedQues[this.index]._id,
      ]);
    }
  }

  nextmethod() {
    if (this.index === this.subscribedQues.length - 1) {
      return true;
    }
    return false;
  }
  prevmethod() {
    if (this.index === 0) {
      return true;
    }
    return false;
  }
  all: any[] = [];
  multipleArray: any[] = [];

  studentmChoice(iMultiple: number) {
    let flag = 0;
    if (this.multipleArray.length) {
      for (let i = 0; i < this.multipleArray.length; i++) {
        if (iMultiple === this.multipleArray[i]) {
          this.multipleArray.splice(i, 1);
          flag = 1;
          break;
        }
      }
    }
    if (flag === 0) {
      this.multipleArray.push(iMultiple);
      this.multipleArray.sort();
    }
    this.all[this.index] = this.multipleArray;

    localStorage.setItem('ans', JSON.stringify(this.all));
  }

  studentrChoice(iRadio: number) {
    this.all[this.index] = iRadio;

    localStorage.setItem('ans', JSON.stringify(this.all));
  }
  isCheck(val: number) {
    if (this.all[this.index] && this.all[this.index].includes(val)) {
      return true;
    } else {
      return false;
    }
  }
  isCheckR(val: number) {
    if (val === this.all[this.index]) {
      return true;
    } else {
      return false;
    }
  }
  cAns = 0;
  wAns = 0;
  finish() {
    this.cAns = 0;
    this.wAns = 0;
    for (let i = 0; i < this.correctAnswers.length; i++) {
      if (
        JSON.stringify(this.correctAnswers[i]) === JSON.stringify(this.all[i])
      ) {
        this.cAns++;
      } else {
        this.wAns++;
      }
    }

    localStorage.setItem('cAns', JSON.stringify(this.cAns));
    localStorage.setItem('wAns', JSON.stringify(this.wAns));
    localStorage.removeItem('ans');
    this.route.navigate(['/result']);
  }
}
