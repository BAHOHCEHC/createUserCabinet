export class User {
  constructor(
    public email: string,
    public password?: string,
    public login?: string,
    public firstName?: string,
    public lastName?: string,
    public phoneNumber?: string,
    public shipping?: Shipping[],
    public role?: string,
    public id?: string,
  ) {}
}
export interface Shipping {
  addressType?: string;
  adress?: string;
  city?: string;
  country?: string;
  postalCode?: number;
}
