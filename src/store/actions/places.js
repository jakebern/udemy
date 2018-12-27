import { ADD_PLACE, DELETE_PLACE } from "./actionTypes";

//if we ever return a function instead of an object
//will send through redux-thunk
export const addPlace = (placeName, location, image) => {
	const placeData = {
		name: placeName,
		location: location
	};
	//dispatch is an argument which is a function
	return dispatch => {
		fetch("https://udemy-react-9ce28.firebaseio.com/places.json", {
			method: "POST",
			body: JSON.stringify(placeData)
		})
			.catch(err => console.log(err))
			.then(res => res.json())
			.then(parsedRes => {
				console.log(parsedRes);
			});
	};
};

export const deletePlace = key => {
	return {
		type: DELETE_PLACE,
		placeKey: key
	};
};
