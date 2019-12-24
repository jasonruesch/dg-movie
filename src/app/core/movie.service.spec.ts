import { TestBed, async } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { environment } from 'src/environments/environment';
import { ENVIRONMENT } from '../shared/inject-tokens';
import { Movie } from './movie.model';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;
  let mockEnvironment: typeof environment;

  beforeEach(async(() => {
    mockEnvironment = {
      production: false,
      movieApi: 'http://my-movie-api.com',
      movieApiKey: 'my-api-key',
      imdbUrl: 'https://my-imdb.com'
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MovieService,
        { provide: ENVIRONMENT, useValue: mockEnvironment },
      ],
    }).compileComponents();

    service = TestBed.get(MovieService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get movie IDs searching by title for all years', () => {
    const movies = {
      Response: 'True',
      totalResults: 1,
      Search: [
        {
          imdbID: 'abc1'
        },
        {
          imdbID: 'abc2'
        }
      ]
    };

    service.getMovieIds('test').subscribe(res => {
      expect(res).toEqual(['abc1', 'abc2']);
    });

    httpMock.expectOne('http://my-movie-api.com?apikey=my-api-key&type=movie&s=test').flush(movies);
  });

  it('should get movie IDs searching by title and year', () => {
    const movies = {
      Response: 'True',
      totalResults: 1,
      Search: [
        {
          imdbID: 'abc1'
        }
      ]
    };

    service.getMovieIds('test', 2000).subscribe(res => {
      expect(res).toEqual(['abc1']);
    });

    httpMock.expectOne('http://my-movie-api.com?apikey=my-api-key&type=movie&s=test&y=2000').flush(movies);
  });

  it('should get movie details for a given IMDBD ID', () => {
    const movie = {
      Title: 'My Awesome Movie',
      Runtime: '90 mins',
      Released: '1 Jan 2000',
      Plot: 'The best movie ever!',
      Rated: 'PG',
      Poster: 'http://test.com/my-awesome-movie.jpg',
      imdbID: 'abc1'
    };

    service.getMovieDetail('abc1').subscribe(res => {
      expect(res).toEqual({
        title: 'My Awesome Movie',
        runtime: '90 mins',
        released: '1 Jan 2000',
        plot: 'The best movie ever!',
        rated: 'PG',
        poster: 'assets/images/my-awesome-movie.jpg',
        imdbUrl: 'https://my-imdb.com/title/abc1/'
      });
    });

    httpMock.expectOne('http://my-movie-api.com?apikey=my-api-key&i=abc1').flush(movie);
  });
});
