import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';
import { Movie } from 'src/app/core/movie.model';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  const movie = {
    title: 'My Awesome Movie',
    runtime: '90 mins',
    released: '1 Jan 2000',
    plot: 'The best movie ever!',
    rated: 'PG',
    poster: 'my-awesome-movie.jpg',
    imdbUrl: 'abc1'
  } as Movie;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    component.movie = movie;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
