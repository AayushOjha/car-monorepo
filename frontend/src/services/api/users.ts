import axios from 'axios';
import { IPostSubscriptionFrom } from '../types/subscription';

const baseUrl = `http://localhost:4000/users`;

const list = async () => {
  return axios.get(baseUrl);
};

const create = async (name: string, email: string) => {
  let user = await axios.post(baseUrl, { name, email });
  return user.data;
};

// NOTE: these routes can be moved to subscriptions api helper

const listSubscription = async (userId: string) => {
  return axios.get(`${baseUrl}/${userId}/subscriptions`);
};

const cancelSubscription = async (userId: string) => {
  return axios.post(`${baseUrl}/${userId}/cancel-subscriptions`);
};

const createSubscription = async (data: IPostSubscriptionFrom) => {
  return axios.post(`${baseUrl}/${data.userId}/book`, data);
}

const UserApi = { list, create, listSubscription, cancelSubscription, createSubscription };
export { UserApi };
