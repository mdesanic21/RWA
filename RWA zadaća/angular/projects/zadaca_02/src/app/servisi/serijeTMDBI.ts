export interface SerijeTMDBI {
    page: number;
    results: Array<SerijaTMDBI>;
    total_pages: number;
    total_results: number;
  }

export interface SerijaTMDBI{
number_of_episodes: any;
homepage: any;
number_of_seasons: any;
    adult: boolean;
    backdrop_path: string;
    genre_ids: Array<number>;
    id: number;
    original_language: string;
    name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}