import {
	SET_PLACES,
	REMOVE_PLACE,
	PLACE_ADDED,
	START_ADD_PLACE
} from "./actionTypes";
import { uiStartLoading, uiStopLoading, getAuthToken } from "./index";

//if we ever return a function instead of an object
//will send through redux-thunk.  If so, don't need to use
//reducer and will use async code.
export const addPlace = (placeName, location, image) => {
	return dispatch => {
		let authToken;
		dispatch(uiStartLoading());
		dispatch(getAuthToken())
			.catch(() => alert("no valid token"))
			.then(token => {
				authToken = token;
				return fetch(
					//need to write own logic for cloud functions auth
					"https://us-central1-udemy-react-9ce28.cloudfunctions.net/storeImage",
					{
						method: "POST",
						body: JSON.stringify({
							image: image.base64
						}),
						headers: {
							Authorization: "Bearer " + authToken
						}
					}
				);
			})
			//this catch only catches network errors
			.catch(err => {
				console.log(err);
				alert("Something went wrong, please try again!");
				dispatch(uiStopLoading());
			})
			//400 and 500 errors will be caught by res.ok check.
			.then(res => {
				if (res.ok) return res.json();
				else throw new Error(); //will hit next catch block
			})
			.then(parsedRes => {
				const placeData = {
					name: placeName,
					location: location,
					image: parsedRes.imageUrl
				};
				return fetch(
					"https://udemy-react-9ce28.firebaseio.com/places.json?auth=" +
						authToken,
					{
						method: "POST",
						body: JSON.stringify(placeData)
					}
				)
					.then(res => {
						if (res.ok) return res.json();
						else throw new Error(); //will hit next catch block
					})
					.then(parsedRes => {
						dispatch(uiStopLoading());
						if (parsedRes.error) {
							console.log(parsedRes);
							alert("There was a problem!");
						} else {
							dispatch(placeAdded());
						}
					})
					.catch(err => {
						console.log("caught!");
						console.log(err);
						alert("Something went wrong, please try again!");
						dispatch(uiStopLoading());
					});
			});
	};
};

export const placeAdded = () => {
	return {
		type: PLACE_ADDED
	};
};

export const startAddPlace = () => {
	return {
		type: START_ADD_PLACE
	};
};

export const setPlaces = places => {
	return {
		type: SET_PLACES,
		places: places
	};
};
//since is async, want to return function (dispatch)
//and redux thunk will help
export const getPlaces = () => {
	return dispatch => {
		dispatch(getAuthToken())
			.then(token => {
				return fetch(
					"https://udemy-react-9ce28.firebaseio.com/places.json?auth=" + token
				);
			})
			.catch(() => alert("no valid token"))
			.then(res => {
				if (res.ok) return res.json();
				else throw new Error(); //will hit next catch block
			})
			.then(parsedRes => {
				const places = [];
				for (let key in parsedRes) {
					places.push({
						...parsedRes[key],
						image: {
							uri: parsedRes[key].image
						},
						key: key //need to store in order to delete this later
					});
				}
				dispatch(setPlaces(places));
			})
			.catch(err => {
				alert("Something went wrong!");
				console.log(err);
			});
	};
};

export const deletePlace = key => {
	return dispatch => {
		dispatch(getAuthToken())
			.catch(() => alert("no valid token"))
			.then(token => {
				dispatch(removePlace(key)); //but if removing on server falls, will have out of sync front end
				return fetch(
					"https://udemy-react-9ce28.firebaseio.com/places/" +
						key +
						".json?auth=" +
						token,
					{
						method: "DELETE"
					}
				);
			})
			.then(res => {
				if (res.ok) return res.json();
				else throw new Error(); //will hit next catch block
			})
			.then(parsedRes => console.log("done"))
			.catch(err => {
				//if delete fails, should re-add the place in case in failed
				//option 1: in reducer, hold deleted places array
				//option 2: create temp copy of deleted place
				alert("Something went wrong, sorry!");
				console.log(err);
			});
	};
};

//non async, do immediately
export const removePlace = key => {
	return {
		type: REMOVE_PLACE,
		key: key
	};
};
