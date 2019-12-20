import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieSearch } from './movie-search.model';
import { Movie } from './movie.model';
import { ENVIRONMENT } from '../shared/inject-tokens.ts';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT) private env: typeof environment
  ) { }

  getMovies(search?: string): Observable<Movie[]> {
    return this.http.get<any>(`${this.env.movieApi}?s=${search}&apikey=${this.env.movieApiKey}`).pipe(
      map(data => {
        return data.Search.map(movie => {
          return {
            title: movie.Title,
            year: movie.Year,
            imdbId: movie.imdbID,
            type: movie.Type,
            poster: movie.Poster
          } as Movie;
        });
      })
    );
  }

  getMovieDetail(imdbId: string): Observable<Movie> {
    return this.http.get<any>(`${this.env.movieApi}?i=${imdbId}&apiKey=${this.env.movieApiKey}`).pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }
}
