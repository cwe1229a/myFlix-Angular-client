import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisPageComponent } from '../synopsis-page/synopsis-page.component';

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
  
  //get favorite movies list
getFavoriteMovies(): void {
  this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
    this.favoriteMovies = resp;
    console.log(this.favoriteMovies);
    return this.favoriteMovies;
  });
}

isFav(id: string): boolean {
  return this.favoriteMovies.includes(id)
}
  
  //add movie to favorite movies list
addToFavoriteMovies(id: string): void {
  console.log(id);
  this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
    console.log(result);
    this.snackBar.open('Successfully added movie to your favorites!', 'OK', {
      duration: 2000
    });
    this.ngOnInit();
  })
}
  
  //delete a movie from favorite movies list
removeFavoriteMovies(id: string): void {
  console.log(id);
  this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
    console.log(result);
    this.snackBar.open('Successfully removed movie from favorites!', 'OK', {
      duration: 2000
    });
    this.ngOnInit();
  })
}
  
  //opens the director dialog to show director details
openDirectorDialog(name: string, bio: string, birth: Date): void {
  this.dialog.open(DirectorComponent, {
    data: {
      Name: name,
      Bio: bio,
      Birthday: birth,
    },
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
      width: '500px'
    });
  }
  
  //opens the synopsis dialog to show description of movie
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisPageComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px'
    });

  }
}