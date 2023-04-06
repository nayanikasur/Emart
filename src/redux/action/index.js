// For Add Item to Cart
export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};
// For Delete Item From Cart
export const delCart = (product) => {
  return {
    type: "DELITEM",
    payload: product,
  };
};
export const userLogin = () => {
  return {
    type: "LOGIN",
  };
};
export const userLogout = () => {
  return {
    type: "LOGOUT",
  };
};
export const verifycredentials = (chekcredential) => {
  return {
    type: "CREDENTIALCHECK",
    payload: chekcredential,
  };
};
