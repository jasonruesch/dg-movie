import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
      map(data => data.Search as any[]),
      switchMap(items => {
        const movieStreams = items.slice(0, 10).map(
          item => this.getMovieDetail(item)
        );
        return combineLatest(...movieStreams);
      })
    );
  }

  getMovieDetail(item: any): Observable<Movie> {
    return this.http.get<any>(`${this.env.movieApi}?i=${item.imdbID}&apiKey=${this.env.movieApiKey}`).pipe(
      map(data => {
        return {
          title: data.Title,
          year: item.Year,
          rated: data.Rated,
          released: data.Released,
          runtime: data.Runtime,
          poster: data.Poster,
          plot: data.Plot,
          imdbUrl: `${this.env.imdbUrl}/title/${data.imdbID}/`
        } as Movie;
      })
    );
  }
}
