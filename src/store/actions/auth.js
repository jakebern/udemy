import { TRY_AUTH } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";

export const tryAuth = authData => {
	return dispatch => {
		dispatch(authSignup(authData));
	};
};
const key = "AIzaSyD4OKNEEQOk7hHzwevCaNrNLIBWcX12HUs";
export const authSignup = authData => {
	return dispatch => {
		//dispatch(uiStartLoading());
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
				//dispatch(uiStopLoading());
				alert("Auth failed, try again.");
			})
			.then(res => res.json())
			.then(parsedRes => {
				console.log(parsedRes);
			});
	};
};
