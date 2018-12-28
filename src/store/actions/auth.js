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
					dispatch(setAuthToken(parsedRes.idToken));
					startMainTabs();
				}
			});
	};
};

export const setAuthToken = token => {
	return {
		type: AUTH_SET_TOKEN,
		token: token
	};
};
