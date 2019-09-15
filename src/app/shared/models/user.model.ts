export class User {
  constructor(
    public email: string,
    public password?: string,
    public login?: string,
    public firstName?: string,
    public lastName?: string,
    public phoneNumber?: string,
    public addressType?: string,
    public adressHome?: string,
    public city?: string,
    public country?: string,
    public postalCode?: string,
    public role?: string,
    public id?: number,
  ) {}
}
