import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // 要用HttpClient

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

// form盡量不要用ViewChild的方式取得（要import ViewChild）
@ViewChild('f') form;

// 宣告變數
cityTownAreaSource;
cityOptions = [];
townOptions = [];

// 得到Service（但這邊是呼叫別人的） 宣告 http = new HttpClient
constructor(private http: HttpClient) {}
ngOnInit() {
  // 初使化，得到資料
  this.loadData();
}

// 得到他輸入的表單
submitForm(f) {
  // 使用 ViewChild 取得 Form 實體
  // console.log(this.form);

  // 透過傳值的方式取得 Form實體
  console.log(f);

  // 打" "不行，一定要打 ' '
  // 取值
  alert(f.form.controls.personName.value + ' ' + f.form.controls.email.value + ' ' + f.form.controls.send.value);
}

// 上面初使化時呼叫的
loadData() {
  this.http.get('/assets/data/cityarea.json').subscribe(data => {
    console.log(Object.keys(data));
    this.cityTownAreaSource = data;
    this.cityOptions = Object.keys(this.cityTownAreaSource);
  });
}

// 選取縣市事件
getTownOption(city) {
  alert(city);
  this.townOptions = Object.entries(this.cityTownAreaSource[city]);
  alert(this.townOptions);
}

// 選取區域事件
getZipcodeOption(town) {
  alert(town);
}

}
