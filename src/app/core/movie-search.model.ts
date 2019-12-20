import { Movie } from './movie.model';

export interface MovieSearch {
    search: Movie[];
    totalResults: number | string;
    response: boolean | string;
}
