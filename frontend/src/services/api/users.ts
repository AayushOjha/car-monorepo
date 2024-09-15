import axios from 'axios';

const baseUrl = `http://localhost:4000/users`;

const list = async () => {
    console.log(baseUrl);
  return axios.get(baseUrl);
};

const create = async (name: string, email: string) => {
  let user = await axios.post(baseUrl, {name, email})
  return user.data;
};

const UserApi = { list, create};
export { UserApi };
