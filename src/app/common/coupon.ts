export class Coupon {
  constructor(
    public id: number,
    public discount: string, 
    public percent: string, 
    public description: string, 
    public value: string, 
    public barcode: string, 
    public couponCode: number, 
    public couponID: number
  ){}
}
