import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

//* Rota Login
export const createSession = async (email, senha) => {
  return api.post("/api/login", { email, senha });
};

export const getUser = async (id) => {
  return api.get(`/api/usuario?id=${id}`);
};

//* Rota Paciente
export const getCondicoes = async () => {
  return api.get(`/api/condicoes`);
};

export const createPaciente = async (paciente) => {
  return api.post(`/api/paciente`, {
    paciente,
  });
};

//* Rotas Solicitacao Paciente
export const removerPermissao = async (cpf, dentista) => {
  return await api.delete(`/api/paciente/${cpf}/dentistas`, {
    data: { dentista },
  });
};

export const enviarSolicitacao = async (cpf, dentista) => {
  return await api.put(`/api/dentista/enviar-solicitacao/${cpf}`, { dentista });
};

export const aceitarSolicitacao = async (cpf, dentista) => {
  return await api.put(`/api/paciente/${cpf}/solicitacoes`, { dentista });
};

export const recusarSolicitacao = async (cpf, dentista) => {
  return await api.delete(`/api/paciente/${cpf}/solicitacoes`, { dentista });
};

//* Rotas Instituicao
export const createInstituicao = async (instituicao) => {
  return api.post(`/api/instituicao`, {
    instituicao,
  });
};

export const createDentista = async (dentista) => {
  return api.post(`/api/instituicao/${dentista.instituicao}/dentista`, {
    dentista,
  });
};

//* Rotas Detista
export const getDentista = async (id) => {
  return api.get(`/api/dentista?id=${id}`);
};

export const deleteDentista = async (id) => {
  return api.delete(`/api/dentista?id=${id}`);
};
