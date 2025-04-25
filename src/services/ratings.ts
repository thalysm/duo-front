import type { AxiosResponse } from "axios"
import type { IRating } from "../model/rating"
import { http } from "./http"

export const sendRating = async (data: IRating):Promise<AxiosResponse<IRating>> => {
    return await http.post(`/ratings`, data)
}