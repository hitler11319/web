import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page2-detail',
  templateUrl: './page2-detail.component.html',
  styleUrls: ['./page2-detail.component.css']
})
export class Page2DetailComponent implements OnInit {

  id;

  // 這一段只有在從page2跳到page2-deatil時的那一次會觸發
  // （alert只觸發一次，但是route的那個是觸發多次的，因為this.id是一直在變的）
  constructor(private route: ActivatedRoute) {
    route.paramMap.subscribe(param => this.id = param.get('id'));
    // 上面得到的資料其實就是在app.module.ts路徑中設定的

    alert(this.id);
  }

  ngOnInit() {}
}
