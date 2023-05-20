import axios from 'axios'

export const api = axios.create({
    baseURL: "http://localhost:3000",
})

export const createSession = async (email, senha) => {
    return api.post("/api/login", { email, senha })
}

export const getUser = async id => {
    return api.get(`/api/usuario?id=${id}`)
}

export const getCondicao = async () => {
    return api.get(`/api/condicoes`)
}

export const getDentista = async id => {
    return api.get(`/api/dentista?id=${id}`)
}

export const deleteDentista = async id => {
    return api.delete(`/api/dentista?id=${id}`)
}

export const enviarSolicitacao = async (cpf, dentista) => {
    return await api.put(`/api/dentista/enviar-solicitacao/${cpf}`, { dentista });
};
export const aceitarSolicitacao = async (cpf, dentista) => {
    return await api.put(`/api/paciente/${cpf}/solicitacoes`, { dentista });
};
export const recusarSolicitacao = async (cpf, dentista) => {
    return await api.delete(`/api/paciente/${cpf}/solicitacoes/${dentista}` );
};