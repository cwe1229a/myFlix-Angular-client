import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  //takes user to profile page
  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  //takes user to movies/main page
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  //lets users log out
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
