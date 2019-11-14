
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {QueryServiceService} from '../../shared/service/query-service.service';
import {QuestionService} from '../services/question.service';
import {defaultConst} from '../../config/constants/defaultConstants';
import {SharedService} from '../../shared/service/shared.service';

declare var Stripe;
@Component({
  selector: 'app-payment-stripe',
  templateUrl: './payment-stripe.component.html',
  styleUrls: ['./payment-stripe.component.scss']
})
export class PaymentStripeComponent implements OnInit {
  url;
  constructor( private functions: AngularFireFunctions,
               private questionService: QuestionService,
               private  queryService: QueryServiceService,
               private  router: Router,
               private sharedService:SharedService,
               private activatedRoute: ActivatedRoute) {
    this.url = activatedRoute.snapshot.url[1].path;
    console.log(activatedRoute.snapshot.url[1].path);
  }
  @Input() amount = 100000;
  @Input() description: string;
  @ViewChild('cardElement', {static: true}) cardElement: ElementRef;

  stripe; // : stripe.Stripe;
  card;
  cardErrors;
  studentId;
  loading = false;
  confirmation;

  ngOnInit() {

    this.queryService.getLoggedInUserID().subscribe(res=>{
      this.studentId = res;
    })

    this.stripe = Stripe('pk_test_gXZ7k5Ig9yWMJXaw6crdUwJe00ea4NS9Bm');
    const elements = this.stripe.elements();

    this.card = elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', ({ error }) => {
      this.cardErrors = error && error.message;
    });
  }

  async handleForm(e) {
    e.preventDefault();

    const { source, error } = await this.stripe.createSource(this.card);

    if (error) {
      // Inform the customer that there was an error.


      const cardErrors = error.message;
    } else {
      // Send the token to your server.
      source.amount = this.amount;
      console.log(source);
      this.loading = true;


      // const user = await this.auth.getUser();
      const fun = this.functions.httpsCallable('startSubscription');
      if(source){
        this.questionService.
        upadateAttendedArrayField('contests',
          this.url,this.studentId);
        this.sharedService.openSnackBarLattest("Payment is successful",'done');
        this.router.navigate(['/questions/contest-list/']);
      }
      // this.confirmation = await fun({ source: source.id }).toPromise().then((response) => console.log(response))
      //   .catch((err)  => console.error('error', err));
      // this.loading = false;

    }
  }

}
