import {USER_LIST,FORM_LOADING,FORM_RELOAD} from '../ActionTypes';

const initialState={
  list:[],
  loading:false
};

export default (state=initialState,action)=>{
  switch (action.type) {
      case USER_LIST:
        return{
            ...state,
            list:[...action.data],
            loading:false
        };
      case FORM_LOADING:
          return{
              ...state,
              loading:action.status
          };
      case FORM_RELOAD:
          return{
              ...initialState
          };
      default:
          return state
  }
}
