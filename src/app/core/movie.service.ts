import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from './movie.model';
import { ENVIRONMENT } from '../shared/inject-tokens';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT) private env: typeof environment
  ) { }

  getMovieIds(title: string, year?: number): Observable<string[]> {
    let url = `${this.env.movieApi}?apikey=${this.env.movieApiKey}&type=movie`;
    url += title ? `&s=${title}` : '';
    url += year ? `&y=${year}` : '';
    return this.http.get<any>(url).pipe(
      map(data => data.Response === 'True' ? data.Search.map(x => x.imdbID) : null)
    );
  }

  getMovieDetail(imdbId: string): Observable<Movie> {
    return this.http.get<any>(`${this.env.movieApi}?i=${imdbId}&apiKey=${this.env.movieApiKey}`).pipe(
      map(data => {
        return {
          title: data.Title,
          rated: data.Rated,
          released: data.Released,
          runtime: data.Runtime,
          poster: data.Poster === 'N/A' ? null : `assets/images/${data.Poster.substr(data.Poster.lastIndexOf('/') + 1)}`,
          plot: data.Plot,
          imdbUrl: `${this.env.imdbUrl}/title/${data.imdbID}/`
        } as Movie;
      })
    );
  }
}
