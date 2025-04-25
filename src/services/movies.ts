import type { AxiosResponse } from "axios"
import type { IMovie } from "../model/movie"
import { http } from "./http"

export const getMovieByName = async (name: string):Promise<AxiosResponse<IMovie[]>> => {
    return await http.get(`/movies/name/${name}`)
}

export const generateMovies = async (data: {
    "user1_movies": string[],
    "user2_movies": string[]
  }):Promise<AxiosResponse<{recommendations:IMovie[]}>> => {
    return await http.post(`/recommendations/recommend`, data)
}