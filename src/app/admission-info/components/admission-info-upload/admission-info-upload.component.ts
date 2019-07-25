import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {urlPaths} from '../../../config/constants/defaultConstants';
import {AuthenticationService} from '../../../authentication/services/authentication.service';

@Component({
  selector: 'app-admission-info-upload',
  templateUrl: './admission-info-upload.component.html',
  styleUrls: ['./admission-info-upload.component.scss']
})
export class AdmissionInfoUploadComponent implements OnInit {

  constructor(private router:Router,
              private authenticationService:AuthenticationService) { }

  ngOnInit() {
  }

  signOut() {
    this.authenticationService.signOut();
    this.router.navigate([urlPaths.Authentication.Signin.url]);
  }
}
