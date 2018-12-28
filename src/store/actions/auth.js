import { TRY_AUTH } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";
import startMainTabs from "../../screens/MainTabs/startMainTabs";

export const tryAuth = (authData, authMode) => {
	return dispatch => {
		if (authMode === "login") {
			dispatch(authLogin(authData));
		} else {
			dispatch(authSignup(authData));
		}
	};
};
const key = "AIzaSyD4OKNEEQOk7hHzwevCaNrNLIBWcX12HUs";

export const authSignup = authData => {
	return dispatch => {
		dispatch(uiStartLoading());
		fetch(
			"https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
				key,
			{
				method: "POST",
				body: JSON.stringify({
					email: authData.email,
					password: authData.password,
					returnSecureToken: true
				}),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			//only catches network errors
			.catch(err => {
				console.log(err);
				dispatch(uiStopLoading());
				alert("Auth failed, try again.");
			})
			.then(res => res.json())
			.then(parsedRes => {
				dispatch(uiStopLoading());
				if (parsedRes.error) {
					//only exists if have error
					alert("There's an error, please try again");
				} else {
					startMainTabs();
				}
			});
	};
};

export const authLogin = authData => {
	return dispatch => {
		dispatch(uiStartLoading());
		fetch(
			"https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
				key,
			{
				method: "POST",
				body: JSON.stringify({
					email: authData.email,
					password: authData.password,
					returnSecureToken: true
				}),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			//only catches network errors
			.catch(err => {
				console.log(err);
				dispatch(uiStopLoading());
				alert("Auth failed, try again.");
			})
			.then(res => res.json())
			.then(parsedRes => {
				dispatch(uiStopLoading());
				if (parsedRes.error) {
					//only exists if have error
					console.log(parsedRes.error);
					alert("There's an error, please try again");
				} else {
					startMainTabs();
				}
			});
	};
};
