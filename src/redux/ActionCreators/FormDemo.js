import {USER_LIST,FORM_LOADING,FORM_RELOAD} from '../ActionTypes';
import axios from 'axios';
import {API_URL} from "../../configs/config";

export const GetFormDemo =(query)=>(dispatch =>{
  dispatch(FormLoading(true));
  axios({
    url:API_URL+'posts'+(query ?'?q='+query:''),
    method:'get',
  }).then(resp=>{
    dispatch({type:USER_LIST,data:resp.data});
    //console.log('func-resp',resp)
  }).catch(err=>{
    console.log(err)
  })
});

export const FormLoading = status =>({
  type:FORM_LOADING,status
});

export const FormReload = ()=>({
  type:FORM_RELOAD
});