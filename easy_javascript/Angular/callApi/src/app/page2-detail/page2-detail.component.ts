import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page2-detail',
  templateUrl: './page2-detail.component.html',
  styleUrls: ['./page2-detail.component.css']
})
export class Page2DetailComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
    route.paramMap.subscribe(param => console.log(param.get('id')));
  }

  ngOnInit() {}
}
