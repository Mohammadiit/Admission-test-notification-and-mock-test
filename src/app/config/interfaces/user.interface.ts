import {Roles} from '../enum/default.enum';

export interface UserInformation  {
  password: string;
  email: string;
  metaData?:CustomerUserInformation;
}
export interface CustomerUserInformation {
  uid?:string;
  fullName?:string;
  email: string;
  role: Roles;
  phoneNumber?: string;
  ratings?: number;
}
