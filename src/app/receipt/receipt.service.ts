import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { take } from "rxjs/operators";

import { Product, products } from "../common/products";
import { Coupon } from "../common/coupon";

@Injectable()
export class ReceiptService {
  private _pagedCoupons$: BehaviorSubject<Coupon[]> = new BehaviorSubject<
    Coupon[]
  >([]);

  constructor() {
    // setup the first set of coups (as Nana would call them)
    this.paginateCoupons(0, 1);
  }

  public currentCoupons$(): Observable<Coupon[]> {
    return this._pagedCoupons$;
  }

  /* ------------------------------------------------------------------------ *  
    You can't paginate JSON from the front-end.
    Let's mock paginated responses by adding the next 5 products
  * ------------------------------------------------------------------------ */
  public paginateCoupons(skip?: number, limit?: number) {
    this._pagedCoupons$.pipe(take(1)).subscribe(res => {
      skip = skip ? skip : res.length;
      let newArr = products.slice(0, skip + 5);
      let final = [];
      for (let i = 0, j = newArr.length; i < j; i++) {
        final.push(this.createCoupon(newArr[i]));
        this._pagedCoupons$.next(final);
      }
    });
  }

  public createCoupon(product: Product): Coupon {
    return {
      id: product.id,
      discount: this.discountAmount(product),
      percent: `${
        [5, 10, 15, 20, 25, 50][
          this.getRandomInt([5, 10, 15, 20, 25, 50].length)
        ]
      }% off`,
      description: product.title,
      value: this.fixedCoupon(product),
      barcode: this.randomBarcode(),
      couponCode: this.randomMinMax(10000, 90000),
      couponID: product.id
    };
  }

  public randomMinMax(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  public getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  public randomBarcode() {
    //make 18 digit barcode - 4 4 4 4 2
    return `${this.randomMinMax(1000, 9000)}
      ${this.randomMinMax(1000, 9000)}
      ${this.randomMinMax(1000, 9000)}
      ${this.randomMinMax(1000, 9000)}`;
  }

  public fixedCoupon(product: Product) {
    //max discount is 50% off
    // productPrice x .5 = discountTakenOff
    // i.e. $10 product get random number between 0.01  and 5 ...
    // so a user will get $5 off an item which would be 50% off
    let couponValue = Math.round(parseFloat(product.price) * 0.5);
    let discountPrice = `$${couponValue}.00 off`;
    return `Up to $${couponValue} value`;
  }

  public discountAmount(product: Product) {
    let couponValue = Math.round(parseFloat(product.price) * 0.5);
    return `$${couponValue}.00 off`;
  }
}
