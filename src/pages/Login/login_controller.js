import axios from "axios"
import { BASE_URL } from "../utils"

export const loginUser = async (data) => {
    // console.log(data)

    const { username, password } = data
    let response = await axios.post(`${BASE_URL}/auth/login`, { username, password })
    // console.log(response)
    return response.data
}