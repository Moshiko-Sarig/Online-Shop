import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isLoginRoute = false;
  isRegisterRoute = false;
  isNotFoundRoute = false;
  isOrderRoute = false;


  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginRoute = event.url === '/';
        this.isRegisterRoute = event.url === '/register';
        this.isOrderRoute = event.url === '/order';
        this.isNotFoundRoute = event.url === '**';
      }
    });
  }


}
