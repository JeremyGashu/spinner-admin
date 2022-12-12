import axios from "axios";
import { BASE_KENO_URL as BASE_URL } from "../pages/utils";

export const getAllKenoTickets = async (page, limit, filter) => {
  let response = await axios.get(
    `${BASE_URL}/keno/ticket?page=${page}&limit=${limit}&filter=${filter}`
  );
  if (response.status === 200 && !response.data.error) {
  }
  return {
    data: response.data && response.data.tickets,
    last: response.data && response.data.lastPage,
  };
};

export const getOverallKenoTurnover = async (filter, user, from, to) => {
  let response = await axios.get(
    `${BASE_URL}/keno/ticket/turnover?filter=${filter}&user=${user}&from=${from}&to=${to}`
  );
  if (response.status === 200 && !response.data.error) {
  }
  // console.log(response.data)
  return response.data && response.data.turnover;
};

export const getKenoTicketById = async (id) => {
  let response = await axios.get(`${BASE_URL}/keno/ticket/${id}`);

  if (response.status === 200 && !response.data.error) {
  } else {
    if (response.data && response.data.errors) {
    }
  }
  return response.data;
};

export const payKenoTicket = async (id) => {
  let response = await axios.get(`${BASE_URL}/keno/ticket/pay/${id}`);

  if (response.status === 200 && !response.data.error) {
  } else {
    if (response.data && response.data.errors) {
    }
  }
  return response.data;
};

export const addKenoTicket = async (data) => {
  const { game_id, money, values, ticket_id, cashier } = data;
  let response = await axios.post(`${BASE_URL}/keno/ticket`, {
    game_id,
    money,
    values,
    ticket_id,
    cashier,
  });

  if (response.status === 200 && !response.data.error) {
  } else {
    if (response.data && response.data.errors) {
    }
  }
  return response.data;
};

export const deleteKenoTicket = async (id) => {
  let response = await axios.delete(`${BASE_URL}/keno/ticket/${id}`);

  return response.data;
};

export const updateKenoTicket = async (data) => {
  let response = await axios.patch(`${BASE_URL}/keno/ticket/${data.id}`, data);
  return response.data;
};

export const getKenoTurnOver = async () => {
  let userData = JSON.parse(localStorage.getItem("auth-data"));

  let response = await axios.get(
    `${BASE_URL}/keno/ticket/turnover?user=${userData.name}&filter=today`
  );
  return response.data;
};
