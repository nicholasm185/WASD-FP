import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['../home.component.css']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
