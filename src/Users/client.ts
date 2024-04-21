import axios from "axios";
const BASE_API = process.env.REACT_APP_API_BASE;
const USERS_API = `${BASE_API}/api/users`;


export interface User { _id: string; username: string; password: string; role: string;
firstName: string, lastName: string };


export const createUser = async (user: any) => {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
};

export const signin = async (credentials: User) => {
    console.log(`this is the base:${BASE_API}`)
    console.log(`this is the user:${USERS_API}`)
    console.log(`this is the credential we sent:${credentials.firstName, credentials.lastName}`)
  const response = await axios.post(`${USERS_API}/signin`, credentials );
  console.log(`We have a response?:${response.data}`);
  return response.data;
};


export const profile = async () => {
  console.log(`Hitting profile page ${USERS_API}`)
    const response = await axios.post(`${USERS_API}/profile`);
    console.log(`This is the Profile${response}`)
    return response.data;
  };

export const updateUser = async (userProfile:any) => {
    const response = await axios.put(`${USERS_API}/${userProfile.username}`, userProfile);
    return response.data;
};

export const findAllUsers = async () => {
    const response = await axios.get(`${USERS_API}`);
    return response.data;
  };
  
  
  export const deleteUser = async (username:string) => {
    const response = await axios.delete(
      `${USERS_API}/${username}`);
    return response.data;
  };
  

  export const signup = async (user: any) => {
    const response = await axios.post(`${USERS_API}/signup`, user);
    return response.data;
  };
  
  export const signout = async () => {
    const response = await axios.post(`${USERS_API}/signout`);
    return response.data;
  };
  
  