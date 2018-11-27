import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { Page1Component } from './page1/page1.component'; // 路由新地址
import { Page2Component } from './page2/page2.component';
import { Page2DetailComponent } from './page2-detail/page2-detail.component';

// 設定路徑
const routes: Route[] = [
  { path: 'page1', component: Page1Component },
  {
    path: 'page2',
    component: Page2Component,
    children: [{ path: ':id', component: Page2DetailComponent }]
  },
  { path: '**', redirectTo: '/page1', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    Page2Component,
    Page2DetailComponent
  ],

  // 要記得引用  列後面的那個就是設定的路徑（別的設定法請去看 AngularForm裡的）
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

