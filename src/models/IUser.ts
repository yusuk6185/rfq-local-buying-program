export interface IUser {
  uid: string;
  isAnonymous: boolean;
  email?: string;
  displayName?: string;
  role?: any;
  lastSignInTime?: string;
  creationTime?: string;
  isAddressFilled?: boolean;
  first_name?: string;
  last_name?: string;
  post_code?: string;
  mobile_phone?: string;
}
