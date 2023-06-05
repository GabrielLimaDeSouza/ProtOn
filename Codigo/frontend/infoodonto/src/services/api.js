import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

// https://protonbackend.onrender.com

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

export const updatePaciente = async (id, paciente) => {
  return api.put(`/api/paciente?id=${id}`, {
    paciente,
  });
};

export const buscarPaciente = async (cpf, dentista) => {
  return api.post(`/api/paciente/cpf/${cpf}`, {
    dentista,
  });
};

export const deletePaciente = async (id) => {
  return api.delete(`/api/paciente?id=${id}`);
};

//* Rotas Solicitacao Paciente
export const getSolicitacao = async (cpf) => {
  return await api.get(`/api/paciente/${cpf}/solicitacoes`);
};

export const removerPermissao = async (cpf, dentista) => {
  return await api.delete(`/api/paciente/${cpf}/remover-dentista/${dentista}`);
};

export const aceitarSolicitacao = async (cpf, dentista) => {
  return await api.put(`/api/paciente/${cpf}/solicitacoes/${dentista}`);
};

export const recusarSolicitacao = async (cpf, dentista) => {
  return await api.delete(`/api/paciente/${cpf}/solicitacoes/${dentista}`);
};

//* Rotas Instituicao
export const createInstituicao = async (instituicao) => {
  return api.post(`/api/instituicao`, {
    instituicao,
  });
};

export const updateInstituicao = async (id, instituicao) => {
  return api.put(`/api/instituicao?id=${id}`, {
    instituicao,
  });
};

export const deleteInstituicao = async (id) => {
  return api.put(`/api/instituicao?id=${id}`);
};

export const createDentista = async (dentista) => {
  return api.post(`/api/instituicao/${dentista.instituicao}/dentista`, {
    dentista,
  });
};

export const updateDentista = async (dentista) => {
  return api.put(`/api/dentista?id=${dentista._id}`, {
    dentista,
  });
};

//* Rotas Detista
export const getDentista = async (id) => {
  return api.get(`/api/dentista?id=${id}`);
};

export const deleteDentista = async (instituicao, dentista) => {
  return api.delete(`/instituicao/${instituicao}/dentista/${dentista}`);
};

export const enviarSolicitacao = async (cpf, dentista) => {
  return await api.put(`/api/dentista/enviar-solicitacao/${cpf}`, { dentista });
};
