import {
	ADD_PLACE,
	DELETE_PLACE,
	SELECT_PLACE,
	DESELECT_PLACE
} from "../actions/actionTypes";

const initialState = {
	places: [],
	selectedPlace: null
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
					}
				})
			};
		case DELETE_PLACE:
			return {
				...state,
				places: state.places.filter(place => {
					return place.key !== state.selectedPlace.key;
				}),
				selectedPlace: null
			};
		case SELECT_PLACE:
			return {
				...state,
				selectedPlace: state.places.find(place => {
					return place.key === action.placeKey;
				})
			};
		case DESELECT_PLACE:
			return {
				...state,
				selectedPlace: null
			};
		default:
			return state;
	}
};

export default reducer;
