import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BuyComponent } from '../buy.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyService } from 'src/app/services/buy.service';
import * as AOS from 'aos';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(public auth: AuthService, public buy: BuyService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    AOS.init();

  }

}
