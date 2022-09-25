import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { EditProfilePageComponent } from '../edit-profile-page/edit-profile-page.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  filteredMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getFavoriteMovies();
  }

//get user data
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    })
  }

 //dialog to open option to edit profile
  openEditProfileDialog(): void {
    this.dialog.open(EditProfilePageComponent, {
      width: '300px'
    })
  }

 //user deletes profile
  deleteProfile(): void {
    if (confirm('Are you sure you want to delete your account? This cannnot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('You have successfully deleted your account!', 'OK', {
          duration: 2000
        });
      })
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }

  //display favorite movies
  getFavoriteMovies(): void {
    this.fetchApiData
      .getAllMovies().subscribe((response: any) => {
        this.movies = response;
        this.filteredMovies = this.filterMovies(this.movies, this.user.FavoriteMovies);
        return this.filteredMovies;
      });
  }

  //filter through movies to get favorites
  filterMovies(movies: any, FavoriteMovies: any): any {
    let remainingMovies = [];
    for (let movie in movies) {
      if (FavoriteMovies.includes(movies[movie]._id)) {
        remainingMovies.push(movies[movie]);
      }
    }
    return remainingMovies;
  }

  //delete moves from favorites
  removeFavoriteMovie(movie_id: string): void {
    this.fetchApiData
      .removeFavoriteMovie(movie_id)
      .subscribe((response) => {
        console.log(response);
        window.location.reload();
      });
  }
}