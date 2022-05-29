import { Component, OnInit, Input } from "@angular/core";

import { Coupon } from "../../common/coupon";

@Component({
  selector: "[coupon]",
  templateUrl: "./coupon.component.html",
  styleUrls: ["./coupon.component.scss"]
})
export class CouponComponent implements OnInit {
	@Input() coupon: Coupon;

  constructor() {}

  public ngOnInit() {}

}
