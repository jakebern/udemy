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
					dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn));
					startMainTabs();
				}
			});
	};
};

export const authStoreToken = (token, expiresIn) => {
	return dispatch => {
		//still want to store in redux
		dispatch(setAuthToken(token));
		const now = new Date();
		const expiryDate = now.getTime() + expiresIn * 1000; //expiresIn is in s, getTime in ms
		console.log(now, new Date(expiryDate));
		AsyncStorage.setItem("ud:auth:token", token);
		AsyncStorage.setItem("ud:auth:expiryDate", expiryDate.toString());
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
				let fetchedToken;
				AsyncStorage.getItem("ud:auth:token")
					//request fails
					.catch(err => reject())
					.then(tokenFromStorage => {
						fetchedToken = tokenFromStorage;
						//no valid token check
						if (!tokenFromStorage) {
							reject();
							return;
						}

						//check if token is valid
						return AsyncStorage.getItem("ud:auth:expiryDate");
					})
					.then(expiryDate => {
						const parsedExpiryDate = new Date(parseInt(expiryDate)); //returns string, need to turn into date
						const now = new Date();
						if (parsedExpiryDate > now) {
							//if parsedExpiry date is null, will return false
							//store in redux store and then resolve / send token back
							dispatch(setAuthToken(fetchedToken));
							resolve(fetchedToken);
						} else {
							reject();
						}
					})
					//catch only triggers if have issues accessing store
					//if don't find the object, will still hit then block
					.catch(err => reject());
			} else {
				resolve(token);
			}
		});
		return promise;
	};
};

export const authAutoSignIn = () => {
	return dispatch => {
		dispatch(getAuthToken())
			.then(token => {
				startMainTabs();
			})
			.catch(err => console.log("Failed to fetch token!"));
	};
};
