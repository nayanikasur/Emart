import { useState } from "react";
const isloggedin = false;

const user = (state = isloggedin, action) => {
  console.log(state);
  switch (action.type) {
    case "LOGIN":
      return true;
      break;
    case "LOGOUT":
      return false;
      break;
    default:
      return state;
      break;
  }
};

export default user;
