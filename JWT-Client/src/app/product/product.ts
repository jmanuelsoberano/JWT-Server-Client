export class Product {
  public constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }

  productId: number;
  productName: string;
  introductionDate: Date;
  price: number;
  url: string;
  categoryId: number;
}
