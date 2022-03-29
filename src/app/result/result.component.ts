import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap,Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
 cAns=0;
 wAns=0;
  constructor(private router:ActivatedRoute,
               private route:Router) { }

  ngOnInit(): void 
  {
     this.cAns=JSON.parse(localStorage.getItem('cAns')||'0')
     this.wAns=JSON.parse(localStorage.getItem('wAns')||'0')
  }
home(){
  this.route.navigate(["/startPage"])
}

}
