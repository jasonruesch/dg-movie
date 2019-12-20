import { Component, OnInit } from '@angular/core';
import { MovieService } from './core/movie.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Movie } from './core/movie.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  movies$: Observable<Movie[]>;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movies$ = this.movieService.getMovies('Batman').pipe(
      tap(console.log)
    );
  }
}
