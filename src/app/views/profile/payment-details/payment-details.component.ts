import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { HttpReqService } from '../../../services/http-req.service';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {
  tokenData: any;
  stripe: Stripe;
  elements: StripeElements;
  cardElement

  styleCard = {
    'style': {
      'base': {
        'fontFamily': 'Arial, sans-serif',
        'fontSize': '8px',
        'color': '#C1C7CD',
      },
      'Invalid': { 'color': 'red', },
    }
  };
  constructor(
    private httpClient: HttpClient,
    private httpReqService: HttpReqService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.tokenData = this.authService.decodeToken();
    this.initStripe();
  }
  async initStripe() {
    this.stripe = await loadStripe('pk_test_51JCS4KSJu2s95RzqVBt3GG75J1GwBJ1HfwqqrI0ty5F0yxTlIf5V8AAgfbGiM2DGVEi6w7JNM742fat5Lr4i40AM00rhzDcuHt');
    this.createElements()
  }

  createElements() {
    this.elements = this.stripe.elements();
    this.cardElement = this.elements.create('card');
    this.cardElement = this.elements.getElement('card');
    this.cardElement.mount('#card-element');
    this.cardElement.on('change', function (event) {
      if (event.complete) {
        console.log('Complete', event)
        // enable payment button
      } else if (event.error) {
        // show validation to customer
        console.log('Error', event)
      }
    });
  }

  onClick() {
    let _this = this;
    var resultContainer = document.getElementById('card-result');
    this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
      billing_details: {
        name: "SomeOne",
      },
    }
    ).then(function (result) {
      if (result.error) {
        // Display error.message in your UI
        resultContainer.textContent = result.error.message;
      } else {
        // You have successfully created a new PaymentMethod
        // resultContainer.textContent = "Created payment method: " + result.paymentMethod.id;
        _this.attachPaymentMethod(result.paymentMethod.id)
      }
    });
  }

  async attachPaymentMethod(paymentMethodId) {
    const response = this.httpReqService.post("attachpaymentmethod", {
      orgId: this.tokenData && this.tokenData.user && this.tokenData.user.organizationId ? this.tokenData.user.organizationId : '',
      paymentMethodId: paymentMethodId,
    }, false)
  }

}
