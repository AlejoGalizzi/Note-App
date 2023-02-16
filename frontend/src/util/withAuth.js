export const withAuth = () => {
  let authenticated = false;
  
  const token = localStorage.getItem('token');

  if(token) {
    authenticated = true;
  }
  console.log(authenticated);

  return authenticated;
}

