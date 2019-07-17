import axios from "axios";
import { googleApiKey } from "../apiKey";

const request = axios.create({
  baseURL: "https://vq7vsw3c5j.execute-api.eu-west-2.amazonaws.com/dev/api/"
});

export const getOwner = phoneNumber => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=%2B${phoneNumber}&inputtype=phonenumber&fields=formatted_address,name,place_id,geometry&key=${googleApiKey}`
    )
    .then(({ data }) => data.candidates[0]);
};

export const getOffers = () => {
  return request.get(`offers`).then(({ data }) => {
    return data.Items;
  });
};

export const getOwnerByOwnerId = ownerId => {
  return request.get(`owners/${ownerId}`).then(({ data }) => {
    console.log(data, "ownerbyId");
    return data;
  });
};

export const postOwner = body => {
  return request.post(`owners`, body).then(({ data }) => {
    return data;
  });
};

export const updateOwnerDetails = (ownerId, body) => {
  return request.put(`owners/${ownerId}`, body).then(({ data }) => {
    return data;
  });
};

export const deleteOwner = ownerId => {
  return request.delete(`owners/${ownerId}`).then(console.log);
};

export const postOffer = body => {
  return request.post(`offers`, body).then(({ data }) => {
    return data;
  });
};
