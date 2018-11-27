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
  apiSource = this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(
    map((posts: any[]) => {
      return posts.map((post: any) => {
        return { id: post.id, title: post.title };
      });
    })
  );

  constructor(private http: HttpClient) {}

  loadData() {
    this.apiSource.subscribe(data => {
      this.posts = data;
    });
  }
}
