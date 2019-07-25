import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {UserInformation} from '../../../config/interfaces/user.interface';
import {first} from 'rxjs/operators';
import {SharedService} from '../../../shared/shared.service';
import {defaultConst} from '../../../config/constants/defaultConstants';

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.scss']
})
export class AccountRecoveryComponent implements OnInit {

  recoverAccountData = this.authService.recoverAccountForm;
  user: UserInformation;

  constructor(private authService: AuthenticationService,
              private  router: Router,
              private sharedService: SharedService
  ) { }

  ngOnInit() {
  }

  recoverAccount() {
    this.user = {
      email: this.recoverAccountData.value.email,
      password: ''
    };
    this.authService.sendPasswordResetEmail(this.user).pipe(first()).subscribe((res) => {
      // console.log(res);
      if (res && res.code) {
        console.log(res.code);
      } else {
        this.openSnackBar();
      }
    });
  }
  openSnackBar() {
    this.sharedService.openSnackBar({
      data: { message: defaultConst.emailsent, isAccepted: true },
      duration: 2,
      panelClass: [ 'recovery-snackbar' ],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
