import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MovieService } from './core/movie.service';
import { of } from 'rxjs';
import { Movie } from './core/movie.model';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  let mockMovieService: jasmine.SpyObj<MovieService>;

  beforeEach(async(() => {
    mockMovieService = jasmine.createSpyObj<MovieService>('movieService', ['getMovieIds', 'getMovieDetail']);
    mockMovieService.getMovieIds.and.returnValue(of(['abc1', 'abc2', 'abc3']));
    mockMovieService.getMovieDetail.and.returnValue(of({
      title: 'My Awesome Movie',
      runtime: '90 mins',
      released: '1 Jan 2000',
      plot: 'The best movie ever!',
      rated: 'PG',
      poster: 'my-awesome-movie.jpg',
      imdbUrl: 'abc1'
    } as Movie));

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        SharedModule,
      ],
      providers: [
        { provide: MovieService, useValue: mockMovieService }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should load three movies when the page loads', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('app-movie').length).toBe(3);
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('dg-movie app is running!');
  // });
});
