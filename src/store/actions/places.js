import { ADD_PLACE, DELETE_PLACE } from "./actionTypes";
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
				dispatch(uiStopLoading());
				alert("Something went wrong, please try again!");
				return;
			})
			.then(res => res.json())
			.then(parsedRes => {
				const placeData = {
					name: placeName,
					location: location,
					image: parsedRes.imageUrl
				};

				fetch("https://udemy-react-9ce28.firebaseio.com/places.json", {
					method: "POST",
					body: JSON.stringify(placeData)
				})
					.catch(err => {
						console.log(err);
						dispatch(uiStopLoading());
						return;
					})
					.then(res => res.json())
					.then(parsedRes => {
						console.log(parsedRes);
						dispatch(uiStopLoading());
					});
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
