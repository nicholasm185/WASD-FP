import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
@Component({
  selector: 'app-im-lost',
  templateUrl: './im-lost.component.html',
  styleUrls: ['./im-lost.component.css']
})
export class ImLostComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
