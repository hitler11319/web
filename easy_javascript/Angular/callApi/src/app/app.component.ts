import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'callApi';
  posts = [];
  n;

  // 呼叫API，並再用pipe轉型（map就如同jquery的map功能一樣）
  apiSource = this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(
    map((posts: any[]) => {
      return posts.map((post: any) => {
        return { id: post.id, title: post.title };
      });
    })
  );

  // 建立 htpClient
  constructor(private http: HttpClient) {}

  // 把apiSource的資料全部給this.posts（委派）
  loadData() {
    this.apiSource.subscribe(data => {
      this.posts = data;
    });

    // subscribe就像是委派 ，把自己傳入進去 去做事
  }

  show(num) {
    // 輸入一個數字，跑出小於那個數字的筆數
    return this.posts.filter(x => this.posts.indexOf(x) <= num - 1);
  }
}
