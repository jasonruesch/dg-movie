import { TestBed, async } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { environment } from 'src/environments/environment';
import { ENVIRONMENT } from '../shared/inject-tokens';

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
        }
      ]
    };

    service.getMovieIds('test').subscribe(res => {
      expect(res).toEqual(['abc1']);
    });

    httpMock.expectOne('http://my-movie-api.com?apikey=my-api-key&type=movie&s=test').flush(movies);
  });
});
