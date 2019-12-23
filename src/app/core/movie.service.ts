import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, from } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
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

  // getMovieIds({ title, year }: { title?: string, year?: number }): Observable<string[]> {
  getMovieIds([title, year]: [string, number?]): Observable<string[]> {
    let url = `${this.env.movieApi}?apikey=${this.env.movieApiKey}&type=movie`;
    url += title ? `&s=${title}` : '';
    url += year ? `&y=${year}` : '';
    return this.http.get<any>(url).pipe(
      tap(console.log),
      map(data => data.Response === 'True' ? data.Search.map(x => x.imdbID) : null)
    );
  }

  getMovieDetail(imdbId: string): Observable<Movie> {
    // console.log(item);
    return this.http.get<any>(`${this.env.movieApi}?i=${imdbId}&apiKey=${this.env.movieApiKey}`).pipe(
      map(data => {
        return {
          title: data.Title,
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
