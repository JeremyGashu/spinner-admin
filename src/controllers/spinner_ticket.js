import axios from "axios"
import { BASE_URL } from "../pages/utils"

export const getAllTickets = async (page, limit, filter) => {
    console.log(limit)
    console.log(page)
    let response = await axios.get(`${BASE_URL}/spinner/ticket?page=${page}&limit=${limit}&filter=${filter}`)
    if (response.status === 200 && !response.data.error) {
    }
    console.log(response.data)
    return { data: response.data && response.data.tickets, last: response.data && response.data.lastPage }
}

export const getTurnOver = async (filter, user, from, to) => {
    // console.log(limit)
    console.log('From ', from)
    console.log('To ', to)
    let response = await axios.get(`${BASE_URL}/spinner/ticket/turnover?filter=${filter}&user=${user}&from=${from}&to=${to}`)
    if (response.status === 200 && !response.data.error) {
    }
    // console.log(response.data)
    return response.data && response.data.turnover
}

export const getTicketById = async (id) => {
    let response = await axios.get(`${BASE_URL}/spinner/ticket/${id}`)

    if (response.status === 200 && !response.data.error) {
    }
    else {
        if (response.data && response.data.errors) {
        }
    }
    return response.data
}

export const payTicket = async (id) => {
    let response = await axios.get(`${BASE_URL}/spinner/ticket/pay/${id}`)

    if (response.status === 200 && !response.data.error) {
    }
    else {
        if (response.data && response.data.errors) {
        }
    }
    return response.data
}

export const addTicket = async (data) => {

    const { game_id, money, value, lucky_number, ticket_id } = data
    let response = await axios.post(`${BASE_URL}/spinner/ticket`, { game_id, money, value, lucky_number, ticket_id })

    if (response.status === 200 && !response.data.error) {
    }
    else {
        if (response.data && response.data.errors) {
        }
    }
    return response.data
}

export const deleteTicket = async (id) => {
    console.log(id)
    let response = await axios.delete(`${BASE_URL}/spinner/ticket/${id}`)

    return response.data
}

export const updateTicket = async (data) => {
    console.log(data)
    let response = await axios.patch(`${BASE_URL}/spinner/ticket/${data.id}`, data)
    return response.data
}
