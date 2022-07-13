import api, { _axios } from "./Api";

export const setAvatarReq = (data,userId) => {
  return api.post(`/setAvatar/${userId}`, data).then((res) => res.data);
};


export const getContactsReq = () => {
  return api.get(`/contacts`).then((res) => res.data);
}