import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ExampleDirective } from './example.directive';
import { ScrollerComponent } from './scroller/scroller.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiptService } from './receipt/receipt.service';
import { CouponComponent } from './receipt/coupon/coupon.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule ],
  declarations: [ AppComponent, ExampleDirective, ScrollerComponent, ProgressBarComponent, ReceiptComponent, CouponComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ReceiptService]
})
export class AppModule { }
