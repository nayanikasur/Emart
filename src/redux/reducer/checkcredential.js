const userDetails = {};

const checkcredential = (state = userDetails, action) => {
  console.log(state);

  const details = action.payload;
  switch (action.type) {
    case "CREDENTIALCHECK":
      return details;
      break;

    default:
      return state;
      break;
  }
};

export default checkcredential;
