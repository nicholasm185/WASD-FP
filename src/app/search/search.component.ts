import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }
  storedTheme: string = localStorage.getItem('theme');
  searchBar: HTMLElement;

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

  ngOnInit(): void {
    this.searchBar = document.getElementById("mainSearch");
    this.searchBar.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        document.getElementById("hiddenBTN").click();
      }
    });
  }

  search(){
    const event_id = (document.getElementById("mainSearch") as HTMLInputElement).value;
    this.router.navigate(['/event', event_id]);
  }

}
