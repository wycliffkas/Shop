import AsyncStorage from '@react-native-community/async-storage';

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCDNdqISMgG9qVzsRoe0voMceRadIp60Io",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: SIGNUP });
  };
};

export const login = (email, password) => {
  //geTState - gives you access to state
  return async (dispatch, getState) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDNdqISMgG9qVzsRoe0voMceRadIp60Io",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      let message = "Something went wrong";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "Please check passowrd of username";
      }

      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    // dispatch({type: LOGIN, token:resData.idToken, userId: resData.localId})
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn))

  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem("userData", JSON.stringify({
    token: token,
    userId: userId,
    expiryData: expirationData.toISOString()
  }))
}
