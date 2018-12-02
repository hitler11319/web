import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})

export class Page2Component implements OnInit {

  // 宣告 路徑router
  constructor(private router: Router) {}

  ngOnInit() {}

  // 做跳轉
  gotoPage1() {
    this.router.navigate(['/page1']); // 跳轉到Page1
  }
}
