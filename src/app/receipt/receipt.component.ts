import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from "rxjs/operators";

import { ReceiptService } from "./receipt.service";
import { Coupon } from "../common/coupon";

@Component({
  selector: "receipt",
  templateUrl: "./receipt.component.html",
  styleUrls: ["./receipt.component.scss"]
})
export class ReceiptComponent implements OnInit {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  public coupons: Coupon[];
  public ended = false;

  constructor(private receiptService: ReceiptService) {}

  public ngOnInit(): void {
    this.fetchCoupons();

    this.receiptService.currentCoupons$()
      .pipe( 
        takeUntil(this._ngUnsubscribe)
      ).subscribe((coupons: Coupon[]) => {
        this.coupons = coupons;
      });
  }

  public fetchCoupons(): void {
    this.receiptService.paginateCoupons();
  }

  public trackByFn(index, item) {
    return index; // or item.id
  }

  public ngOnDestroy(): void {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
