export interface IGenre {
    id: number,
    name: string
}

export interface IProductionCompany {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
}

export interface IMovie {
    title: string,
    id: number, 
    poster_path: string,
    release_date: string,
    vote_average: number,
    vote_count: number,
    runtime: number,
    budget: number,
    revenue: number,
    genre_ids?: number[],
    genres?: IGenre[]
    overview: string,
    videos: any,
    production_companies: IProductionCompany[]
}

export interface IMoviesResponse {
    results: IMovie[],
    total_pages: number
}

export interface IMovieRating {
    id: number,
    rating: number
}

export interface IVideo {
    type: string
}