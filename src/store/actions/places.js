import { ADD_PLACE, DELETE_PLACE } from "./actionTypes";

//if we ever return a function instead of an object
//will send through redux-thunk
export const addPlace = (placeName, location, image) => {
	return dispatch => {
		const placeData = {
			name: placeName,
			location: location
		};
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
				return;
			})
			.then(res => res.json())
			.then(parsedRes => {
				console.log(parsedRes);
				return;
			})
			.catch(err => {
				console.log(err);
				alert("Something went wrong, please try again!");
				return;
			});
		//dispatch is an argument which is a function
		// fetch("https://udemy-react-9ce28.firebaseio.com/places.json", {
		// 	method: "POST",
		// 	body: JSON.stringify(placeData)
		// })
		// 	.catch(err => console.log(err))
		// 	.then(res => res.json())
		// 	.then(parsedRes => {
		// 		console.log(parsedRes);
		// 	});
	};
};

export const deletePlace = key => {
	return {
		type: DELETE_PLACE,
		placeKey: key
	};
};
