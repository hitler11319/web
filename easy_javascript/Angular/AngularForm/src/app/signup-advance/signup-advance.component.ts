import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';

import { HttpClient } from '@angular/common/http'; // 要用HttpClient

// function可以寫在class裡面或外面，寫在裡面記得加上this.函數名，才不會有錯
// 驗證兩個email是否相同，不同就回傳true
function ConfirmEmailCheck(group) {
  if (group.get('email').value !== group.get('confirmEmail').value) {
    return { emailNotMatch: true };
  }
  return null;
}

@Component({
  selector: 'app-signup-advance',
  templateUrl: './signup-advance.component.html',
  styleUrls: ['./signup-advance.component.css']
})

export class SignupAdvanceComponent implements OnInit {

// 宣告變數
cityTownAreaSource;
cityOptions = [];
townOptions = [];


  // 新增表單 formData 的 FormGroup 物件，FormGroup等同於ngForm
  // formData = new FormGroup({
  //   //FormControl放每個input的初始狀態，第一個是預設值，第二個是驗證條件
  //   name: new FormControl('', [Validators.required]), //
  //   email: new FormControl(''),
  //   confirmEmail: new FormControl({ value: '', disabled: true })
  // });

  // 用FormGroup的要記得在這裡設定，前端也要設定喔
  // 以下寫法同上，只是改用FormBuilder寫法，	使用 FormBuild 產生 formData
  formData = this.fb.group({
    name: ['', [Validators.required]],
    emailGroup: this.fb.group(
      {
        email: '',
        confirmEmail: [{ value: '', disabled: false }],
      },
      { validator: [ConfirmEmailCheck] } // 用ConfirmEmailCheck函數(自訂的函數)做驗證
    ),

    cellphone: [''],
    city: [''],
    town: ['']
  });

// 宣告2個的寫法
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    // 可能使用情境(取得別人的資料)
    // this.http.get('productApi/1').subscribe(productInfo=>{
    //   this.fb.group(productInfo);
    // })
    this.loadData();
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

