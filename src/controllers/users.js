import axios from "axios"
import { BASE_URL } from "../pages/utils"

export const getAllUsers = async () => {
    let response = await axios.get(`${BASE_URL}/users`)
    if (response.status === 200 && !response.data.error) {
    }
    console.log(response.data)
    return response.data.users
}

export const deleteUser = async (id) => {
    let response = await axios.delete(`${BASE_URL}/users/${id}`)

    return response.data
}

export const addCashier = async (data) => {

    const { name, phone, active, password, username, type } = data
    let response = await axios.post(`${BASE_URL}/users`, { name, phone, active, password, username, type })

    if (response.status === 200 && !response.data.error) {
    }
    else {
        if (response.data && response.data.errors) {
        }
    }
    return response.data
}