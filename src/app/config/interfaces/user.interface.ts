import {Roles} from '../enum/default.enum';
export interface UserInformation  {
  password?: string;
  email?: string;
  metaData?:CustomerUserInformation;
}
export interface CustomerUserInformation {
  uid?:string;
  fullName?:string;
  email?: string;
  role?: Roles;
  phoneNumber?: string;
  ratings?: number;
}
export interface snackbar {
  duration?: number;
  data: snackbarData;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
  panelClass?: string[];
}
interface snackbarData{
  message:string,
  isAccepted?:any
}
export declare type MatSnackBarHorizontalPosition = 'start' | 'center' | 'end' | 'left' | 'right';
export declare type MatSnackBarVerticalPosition = 'top' | 'bottom';
export declare type acceptance = 'default' | true | false;
