import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

declare var Stripe;
@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  constructor( private functions: AngularFireFunctions) { }
  @Input() amount = 100000;
  @Input() description: string;
  @ViewChild('cardElement', {static: true}) cardElement: ElementRef;

  stripe; // : stripe.Stripe;
  card;
  cardErrors;

  loading = false;
  confirmation;

  ngOnInit() {
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
      console.log(source);
      this.loading = true;
      // const user = await this.auth.getUser();
      const fun = this.functions.httpsCallable('startSubscription');
      this.amount;
      // this.confirmation = await fun({ source: source.id }).toPromise().then((response) => console.log(response))
      //   .catch((err)  => console.error('error', err));
      // this.loading = false;
      console.log(this.confirmation);
    }
  }

}
