import { validateToken } from "../api/configRequest";


export const withAuth = async () => {
  const token = localStorage.getItem('token');

  if(token && token != undefined) {
    const response = await validateToken(
      token
    );
    return response === 200;
  }
    return false;
}

