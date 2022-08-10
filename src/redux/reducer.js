const initialState = {
  name: 'Rifra Yugo Prakoso',
  news: [],
  schedule: {},
  pmnetwork: {},
  pmend: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        name: action.payload,
      };
    case 'LOAD_NEWS':
      return {
        ...state,
        news: action.payload,
      };
    case 'SET_SCHEDULE':
      return {
        ...state,
        schedule: action.payload,
      };
    case 'SET_NETWORK':
      return {
        ...state,
        pmnetwork: action.payload,
      };
    case 'SET_ENDUSER':
      return {
        ...state,
        enduser: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
