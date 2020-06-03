import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BuyService } from '../services/buy.service';
import * as AOS from 'aos';
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  public buyForm: FormGroup;
  storedTheme: string = localStorage.getItem('theme');
  paymentMethods: any = Array('Cash', 'Transfer');
  qty = Array.from(Array(100).keys());
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  setTheme() {
    if (this.storedTheme === 'dark') {
      this.transition();
      localStorage.setItem('theme', 'light');
      this.storedTheme = localStorage.getItem('theme');
    } else {
      this.transition();
      localStorage.setItem('theme', 'dark');
      this.storedTheme = localStorage.getItem('theme');
    }
  }
  transition() {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
    document.documentElement.classList.remove('transition');
    }, 1000);
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              public buy: BuyService) { }

  ngOnInit(): void {
    AOS.init();
    this.buyForm = this.fb.group({
      name: ['', [Validators.required]],
      event_id: ['', [Validators.required, Validators.minLength(13)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      paymentMethod: ['', [Validators.required]],
      numTickets: ['', [Validators.required]],

    });
    this.buyForm.get('event_id').setValue(this.route.snapshot.paramMap.get('event_id'));
  }

  buyTicket() {
    const buyData = new FormData();
    console.log('inserting data');

    buyData.append('name', this.buyForm.get('name').value);
    buyData.append('event_id', this.buyForm.get('event_id').value);
    buyData.append('email', this.buyForm.get('email').value);
    buyData.append('paymentMethod', this.buyForm.get('paymentMethod').value);
    buyData.append('numTickets', this.buyForm.get('numTickets').value);

    console.log('inserting done');

    if (this.buyForm.invalid) {
      alert('Please fill in the required information');
    } else {
      this.sendPurchase(buyData);
    }
  }

  sendPurchase(buyData) {
    this.buy.buyTicket(buyData).subscribe((event: any) => {
      console.log(event);
      alert('Ticket succesfully purchased!');
      this.router.navigate(['/success']);
    },
    error => {
      console.log(error);
      alert('Failed to send your request to the server');
    });
  }

  get paymentMethod() {
    return this.buyForm.get('paymentMethod');
  }

  changeMethod(e) {
    // console.log(e.value);
    console.log(this.paymentMethod.value);
    this.paymentMethod.setValue(e.target.value, {
      onlySelf: true
    });
  }

  get numTickets() {
    return this.buyForm.get('numTickets');
  }

  /*changeQty(e) {
    console.log(e.value);
    console.log(this.numTickets.value);
    this.numTickets.setValue(e.target.value, {
      onlySelf: true
    });
  }*/

  submit() {
    if (confirm('If you are ready, click OK!')) {
      console.log('You pressed OK!');
      console.log(this.buyForm);
      this.buyTicket();
    } else {
      alert('Do not worry, there is plenty of time.');
    }
  }
}
