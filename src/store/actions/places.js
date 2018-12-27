import { SET_PLACES } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";

//if we ever return a function instead of an object
//will send through redux-thunk
export const addPlace = (placeName, location, image) => {
	return dispatch => {
		dispatch(uiStartLoading());
		fetch(
			"https://us-central1-udemy-react-9ce28.cloudfunctions.net/storeImage",
			{
				method: "POST",
				body: JSON.stringify({
					image: image.base64
				})
			}
		)
			.catch(err => {
				console.log(err);
				alert("Something went wrong, please try again!");
				dispatch(uiStopLoading());
			})
			.then(res => res.json())
			.then(parsedRes => {
				const placeData = {
					name: placeName,
					location: location,
					image: parsedRes.imageUrl
				};
				return fetch("https://udemy-react-9ce28.firebaseio.com/places.json", {
					method: "POST",
					body: JSON.stringify(placeData)
				})
					.catch(err => {
						console.log(err);
						alert("Something went wrong, please try again!");
						dispatch(uiStopLoading());
					})
					.then(res => res.json())
					.then(parsedRes => {
						console.log(parsedRes);
						dispatch(uiStopLoading());
					});
			});
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
		fetch("https://udemy-react-9ce28.firebaseio.com/places.json")
			.catch(err => {
				console.log(err);
				alert("Something went wrong!");
			})
			.then(res => res.json())
			.then(parsedRes => {
				const places = [];
				for (let key in parsedRes) {
					places.push({
						...parsedRes[key],
						image: {
							uri: parsedRes[key].image
						},
						id: key //need to store in order to delete this later
					});
				}
				dispatch(setPlaces(places));
			});
	};
};

export const deletePlace = key => {
	return {
		type: DELETE_PLACE,
		placeKey: key
	};
};
