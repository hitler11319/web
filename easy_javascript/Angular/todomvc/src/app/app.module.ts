import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { DataService } from './data.service';
import { StateFilterPipe } from './state-filter.pipe';
import { SectionFooterComponent } from './section-footer/section-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    StateFilterPipe,
    SectionFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
