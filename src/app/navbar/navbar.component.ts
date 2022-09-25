import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialogModule
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
    this.snackBar.open('You have been successfully logged out', 'Ok', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);
  }
}
