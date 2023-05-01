import axios from 'axios'

export const api = axios.create({
    baseURL: "http://localhost:3000",
})

export const createSession = async (email, senha) => {
    return api.post("/api/login", { email, senha })
}

export const getUser = async id => {
    return api.get(`/api/usuario?id=${ id }`)
}