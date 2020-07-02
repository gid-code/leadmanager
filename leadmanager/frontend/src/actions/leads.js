import axios from 'axios'
import { createMessage } from './messages'
import {GET_LEADS,DELETE_LEAD, ADD_LEAD, GET_ERRORS} from './types'

//get leads
export const getLeads = () => dispatch =>{
   axios.get('/api/leads')
   .then(res => {
      dispatch({
         type: GET_LEADS,
         payload: res.data
      })
   })
   .catch(err => {
      const errors = {
         msg: err.response.data,
         status: err.response.status
      }
      dispatch({
         type: GET_ERRORS,
         payload: errors
      })
   })
}

//delete lead
export const deleteLead = (id) => dispatch =>{
   axios
   .delete(`/api/leads/${id}/`)
   .then(res => {
      dispatch(createMessage({ leadDeleted: 'Lead Deleted'}));
      dispatch({
         type: DELETE_LEAD,
         payload: id
      })
   })
   .catch(err => {
      const errors = {
         msg: err.response.data,
         status: err.response.status
      }
      dispatch({
         type: GET_ERRORS,
         payload: errors
      })
   })
}

//add lead
export const addLead = (lead) => dispatch =>{
   axios
   .post('/api/leads/',lead)
   .then(res => {
      dispatch({
         type: ADD_LEAD,
         payload: res.data
      })
      dispatch(createMessage({
         leadAdded: 'Lead Added'
      }))
   })
   .catch(err => {
      const errors = {
         msg: err.response.data,
         status: err.response.status
      }
      dispatch({
         type: GET_ERRORS,
         payload: errors
      })
   })
}