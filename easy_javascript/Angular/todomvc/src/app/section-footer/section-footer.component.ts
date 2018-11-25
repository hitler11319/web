/*

component.ts就是Controller
component.html就是View
data.service.ts就是Service
之概念

*/

import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';  // 要記得使用service

@Component({
  selector: 'app-section-footer',  // namespace的概念
  templateUrl: './section-footer.component.html',  // 真實路徑
  styleUrls: ['./section-footer.component.css']  // css路徑
})
export class SectionFooterComponent implements OnInit {
  // 連接dataService層
  constructor(public dataService: DataService) {}

  // 初使化（因為有繼承OnInit） => 所以要有這個(app.component.ts中的沒有，所以不用)
  ngOnInit() {}

  clearComplete() {
    this.dataService.clearComplete();
  }
}
