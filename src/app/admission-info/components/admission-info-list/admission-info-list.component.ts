import { Component, OnInit } from '@angular/core';
import {AdmissionInfoService} from '../../services/admission-info.service';
import {first} from 'rxjs/operators';
import {QueryServiceService} from '../../../shared/service/query-service.service';
import {Router} from '@angular/router';
import {urlPaths} from '../../../config/constants/defaultConstants';

@Component({
  selector: 'app-admission-info-list',
  templateUrl: './admission-info-list.component.html',
  styleUrls: ['./admission-info-list.component.scss']
})
export class AdmissionInfoListComponent implements OnInit {

  constructor( private admissionInfoService: AdmissionInfoService
                ,private queryService: QueryServiceService
               , private router: Router
  ) { }
  items;
  ngOnInit() {
    this.loadStripe();
    this.admissionInfoService.getAllAdmissionInfo()
      .subscribe(result => {
        this.items = result;
      });
  }
  pay(amount) {
    console.log('kkjjjjjjjjjjjjjjjjjjjjjjj');
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        alert('Token Created!!');
      }
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100
    });

  }
  loadStripe() {

    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
  }
  goToDetails(item: any) {
    this.admissionInfoService.item = item;
    this.router.navigate([urlPaths.AdmissionInfo.AdmissionInfo.url]);
  }
}
