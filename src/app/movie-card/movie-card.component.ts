import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

ngOnInit(): void {
  this.getMovies();
}

  //gets all movies from api , sets the movies state
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
}

  //opens the director dialog to show director details
openDirectorDialog(name: string, bio: string, birthday: Date): void {
  this.dialog.open(DirectorComponent, {
    data: {
      Name: name,
      Bio: bio,
      Birthday: birthday,
    },
    // assign dialog width
    width: '500px'
  });

  }  
  
   //opens the genre dialog to show genre details
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      // Assign dialog width
      width: '500px'
    });
  }
  
}