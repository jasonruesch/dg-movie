import { Component, OnInit } from '@angular/core';
import { MovieService } from './core/movie.service';
import { Observable, combineLatest } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { Movie } from './core/movie.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  movies$: Observable<Movie[]>;
  search = 'Batman';
  selectedYear: number;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    // If decade selected, get movie IDs by title and selected decade
    const yearStreams$ = !!this.selectedYear ? [...Array(10).keys()].map(
      offset => this.movieService.getMovieIds(this.search, this.selectedYear + offset)
    )
    :
    // If no decade selected, get movie IDs by title for all years
    [this.movieService.getMovieIds(this.search)];

    this.movies$ = combineLatest(...yearStreams$).pipe(
      map(ids => [].concat(...ids).filter(x => x).splice(0, 10)),
      concatMap(ids => {
        // Get movie details for IDs fetched
        const detailStreams$ = ids.map(
          id => this.movieService.getMovieDetail(id)
        );
        return combineLatest(...detailStreams$);
      })
    );
  }

  selectYear(year: number) {
    this.selectedYear = year !== this.selectedYear ? year : null;
    this.getMovies();
  }
}
