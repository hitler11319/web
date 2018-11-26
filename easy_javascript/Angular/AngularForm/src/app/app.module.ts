
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// 記得 { } 內的名稱要其後面的名稱一樣喔
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SignupAdvanceComponent } from './signup-advance/signup-advance.component';

@NgModule({
  // 使用的Component
  declarations: [AppComponent, SignupComponent, SignupAdvanceComponent],

  // import的
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // 設定路徑
    RouterModule.forRoot([
      // {path : 名稱 , component : 所要用的Component}
      { path: 'signup', component: SignupComponent },
      { path: 'signup-advance', component: SignupAdvanceComponent },
      {
        path: 'product',
        // 子節點用loadChildren來設定
        loadChildren: './product/product.module#ProductModule'
      },

      // 如果沒有設定路徑，則自動導入至signup中
      { path: '**', redirectTo: '/signup', pathMatch: 'full' }
    ])
  ],

  // 所使用的Service
  providers: [],

  // bootstrap使用的是哪一個Component裡的設定
  bootstrap: [AppComponent]
})
export class AppModule {}
