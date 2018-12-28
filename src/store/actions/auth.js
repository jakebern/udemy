import { AsyncStorage } from "react-native";
import { TRY_AUTH, AUTH_SET_TOKEN } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";
import startMainTabs from "../../screens/MainTabs/startMainTabs";

export const tryAuth = (authData, authMode) => {
	return dispatch => {
		const apiKey = "AIzaSyD4OKNEEQOk7hHzwevCaNrNLIBWcX12HUs";
		dispatch(uiStartLoading());

		//default URL to login
		let url =
			"https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
			apiKey;
		if (authMode === "signup") {
			url =
				"https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
				apiKey;
		}
		fetch(url, {
			method: "POST",
			body: JSON.stringify({
				email: authData.email,
				password: authData.password,
				returnSecureToken: true
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			//only catches network errors
			.catch(err => {
				console.log(err);
				dispatch(uiStopLoading());
				alert("Auth failed, try again.");
			})
			.then(res => res.json())
			.then(parsedRes => {
				console.log(parsedRes);
				dispatch(uiStopLoading());
				if (!parsedRes.idToken) {
					//only exists if have error
					console.log(parsedRes);
					alert("There's an error, please try again");
				} else {
					dispatch(authStoreToken(parsedRes.idToken));
					startMainTabs();
				}
			});
	};
};

export const authStoreToken = token => {
	return dispatch => {
		//still want to store in redux
		dispatch(setAuthToken(token));
		AsyncStorage.setItem("ud:auth:token", token);
	};
};

export const setAuthToken = token => {
	return {
		type: AUTH_SET_TOKEN,
		token: token
	};
};
export const getAuthToken = () => {
	return (dispatch, getState) => {
		const promise = new Promise((resolve, reject) => {
			//first look in redux store
			const token = getState().auth.token;
			if (!token) {
				AsyncStorage.getItem("ud:auth:token")
					//no token
					.catch(err => reject())
					.then(tokenFromStorage => {
						//store in redux store and then resolve / send token back
						dispatch(setAuthToken(tokenFromStorage));
						resolve(tokenFromStorage);
					});
			} else {
				resolve(token);
			}
		});
		return promise;
	};
};
