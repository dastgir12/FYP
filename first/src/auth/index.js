//Login
export const IsLoggedIn = () => {
  const data = localStorage.getItem("Token");
  if (data == null) {
    return false;
  } else {
    return true;
  }
};

//Do Login
export const doLogin = () => {
    const data = localStorage.setItem("Token" , JSON.stringify(''));
  };
  

//Do Logout
export const logout = () => {
    const data = localStorage.removeItem("Token");
  };


  // Get Current Usre
  export const getUser = () => {

    if (IsLoggedIn) {
      return JSON.parse(localStorage.getItem('data'))
    } else {
      return false;
    }
  };
  
  //here we will define 