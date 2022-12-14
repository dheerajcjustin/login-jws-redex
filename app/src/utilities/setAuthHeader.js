const setAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  if (user) {
    return user;
  } else {
    return;
  }
};
export default setAuthHeader;
