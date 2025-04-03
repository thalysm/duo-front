import type { AxiosResponse } from "axios"
import type { IMovie } from "../model/movie"
import { http } from "./http"

export const getMovieByName = async (name: string):Promise<AxiosResponse<IMovie[]>> => {
    return await http.get(`/movies/name/${name}`)
}