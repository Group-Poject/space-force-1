const initialState = {
  calendar: []
}
const GET_EVENTS = 'GET_EVENTS';
export function getEvents(events){
  return {
      type: GET_EVENTS,
      payload: events
  }
}
export default function reducer(state = initialState, action){
  const {type, payload} = action;
  switch(type){
      case GET_EVENTS:
        console.log(payload)
          return {...state, user: payload}
      default:
          return state;
  }
}