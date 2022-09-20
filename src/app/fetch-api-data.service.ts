import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://piratemoviesapi.herokuapp.com/';

const token = localStorage.getItem('token');
const username = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  //call for user log in
  public userLogin(userCredentials: any): Observable<any> {
    console.log(userCredentials);
    return this.http
      .post(apiUrl + 'login', userCredentials)
      .pipe(catchError(this.handleError));
  }


  // call to pull all movies
   getAllMovies(): Observable<any> {
   const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //call to get one movie
   getMovie(Title: any): Observable<any> {
    return this.http
    .get(apiUrl + `movies/${Title}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
}

    //call to get director
  getDirector(Name: any): Observable<any> {
      return this.http
      .get(apiUrl + `movies/directors/${Name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
  
      //call to get genre
    getGenre(name: any): Observable<any> {
        return this.http
        .get(apiUrl + `movies/genre/${name}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          })
        })
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
      }
  
      //call to get user
      getUser(Username: any): Observable<any> {
        return this.http
        .get(apiUrl + `/users/${Username}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          })
        })
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
      }
  
  //call to favorited movies
      addFavoriteMovie( MovieID: any): Observable<any> {
        return this.http
          .post(apiUrl + `users/${username}/movies/${MovieID}`,{},   {
            headers: new HttpHeaders({
              Authorization: `Bearer ${token}`,
            })
          })
          .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
          );
      }
  
    //call to delete movie from favorites
    removeFavoriteMovie(MovieID: any): Observable<any> {
      return this.http
        .delete(apiUrl + `users/${username}/movies/${MovieID}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError));
    }
  
        //call to update user
    updateUser(Username: any): Observable<any> {
          return this.http
          .put(apiUrl + `/users/${Username}`, {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + token,
            })
          })
          .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
          );
        }
  
          //call to delete user
          deleteUser(Username: any): Observable<any> {
            return this.http
            .delete(apiUrl + `/users/${Username}`, {
              headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
              })
            })
            .pipe(
              map(this.extractResponseData),
              catchError(this.handleError)
            );
          }
  
  
  
  
  
  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }
    


private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}