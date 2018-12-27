import { ADD_PLACE, DELETE_PLACE } from "../actions/actionTypes";

const initialState = {
	places: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_PLACE:
			return {
				...state, // copy of existing state.
				//any nonoverriden properties will be kept
				places: state.places.concat({
					key: Math.random().toString(),
					name: action.placeName,
					image: {
						uri: action.image.uri
					},
					location: action.location
				})
			};

		//requires a key
		case DELETE_PLACE:
			return {
				...state,
				places: state.places.filter(place => {
					return place.key !== action.placeKey;
				})
			};
		default:
			return state;
	}
};

export default reducer;
