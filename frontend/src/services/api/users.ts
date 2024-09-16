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

const cancelSubscription = async (userId: string, subscriptionId: string) => {
  return axios.post(`${baseUrl}/${userId}/cancel-subscriptions`, {subscriptionId , userId});
};

const createSubscription = async (data: IPostSubscriptionFrom) => {
  return axios.post(`${baseUrl}/${data.userId}/book`, data);
}

// TODO:
// !FIXME: this is not secure, any user can access other schedule data with id
const getSubscriptionById = async (subscriptionId: string) => {
  return axios.get(`${baseUrl}/subscriptions/${subscriptionId}`);
}

const UserApi = { list, create, listSubscription, cancelSubscription, createSubscription, getSubscriptionById };
export { UserApi };
