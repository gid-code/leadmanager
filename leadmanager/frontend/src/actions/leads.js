import axios from 'axios'
import { createMessage, returnErrors } from './messages'
import {GET_LEADS,DELETE_LEAD, ADD_LEAD} from './types'
import { tokenConfig } from './auth'

//get leads
export const getLeads = () => (dispatch, getState) =>{
   axios.get('/api/leads',tokenConfig(getState))
   .then(res => {
      dispatch({
         type: GET_LEADS,
         payload: res.data
      })
   })
   .catch(err => dispatch(returnErrors(
      err.response.data, err.response.status
   )))
}

//delete lead
export const deleteLead = (id) => (dispatch,getState) =>{
   axios
   .delete(`/api/leads/${id}/`,tokenConfig(getState))
   .then(res => {
      dispatch(createMessage({ leadDeleted: 'Lead Deleted'}));
      dispatch({
         type: DELETE_LEAD,
         payload: id
      })
   })
   .catch(err => dispatch(returnErrors(
      err.response.data, err.response.status
   )))
}

//add lead
export const addLead = (lead) => (dispatch,getState) =>{
   axios
   .post('/api/leads/',lead,tokenConfig(getState))
   .then(res => {
      dispatch({
         type: ADD_LEAD,
         payload: res.data
      })
      dispatch(createMessage({
         leadAdded: 'Lead Added'
      }))
   })
   .catch(err => dispatch(returnErrors(
      err.response.data, err.response.status
   )))
}