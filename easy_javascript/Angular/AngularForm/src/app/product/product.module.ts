import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,

    // 設定路徑 （是用forChild => 所以會是 localhost:4200/product/list  這樣）
    RouterModule.forChild([
      { path: 'list', component: ListComponent },
      // path : 'edit/:id' 即是 edit/id
      { path: 'edit/:id', component: EditComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ])
  ],
  declarations: [ListComponent, EditComponent]
})
export class ProductModule {}
