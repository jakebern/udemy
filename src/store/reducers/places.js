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
						uri:
							"https://b.fssta.com/uploads/content/dam/fsdigital/fscom/global/dev/static_resources/cbk/teams/retina/536.vresize.200.200.medium.0.png"
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
