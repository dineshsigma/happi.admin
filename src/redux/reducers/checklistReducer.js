import { gql } from "@apollo/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { client } from '../../environment'


const createChecklistMutation = gql`mutation insert_checklist($object: checklist_insert_input!) {
    insert_checklist_one(object: $object) {
        id
    }
}`;
const getCheckListQuery = gql`query getChecklistByid($task_id:Int!){
    checklist(where: {task_id: {_eq: $task_id}}) {
      id
      title
      is_done
      user_id
      created_at
      task_id
    }
  }`;
const updateChecklistMutation = gql`mutation updateChecklist($object:[checklist_insert_input!]!) {
    insert_checklist(objects: $object
    ,
          on_conflict: {
            constraint: checklist_pkey,
            update_columns: [title,is_done]
          }
      ){
          affected_rows
      }
}`;
const deleteChecklistMutation = gql`mutation deleteChecklist($id: Int!) {
    delete_checklist(where: {id: {_eq: $id}}) {
      affected_rows
    }
}`;
export const createChecklist = createAsyncThunk('checklist/create', async(payload, thunkAPI)=>{
    let data = {}
    try{
        const response = await client.mutate({
            mutation: createChecklistMutation, variables: {
                object: payload
            }
        });
        data = {
            status : true,
            message : 'Create Checklist Successfully'
        }
        toast.success(data.message)
    }catch(e){
        data = {
            status: false,
            message: e.message
        }
        //console.log('response+++++++', data)
        toast.error(data.message);
    }
    return data;
})
export const getChecklist = createAsyncThunk('checklist/getChecklist', async (payload) => {
    try {
        const response = await client.query({
            query: getCheckListQuery, variables: {
                "task_id": `${payload}`
            }
        })
        return response.data.checklist
    } catch (e) {
        console.log('error', e)
    }
})
export const updateChecklist = createAsyncThunk('checklist/updateChecklist', async (payload , thunkAPI) => {
    //console.log("Update Location Payload ...................", payload)
    let data = {}
    try {
        const response = await client.mutate({
            mutation: updateChecklistMutation, variables: {
                object: payload
            }
        });
        data = {
            status: true,
            message: 'Checklist Updated Sucessfully'
        }
        //console.log('response+++++++', data)
        toast.success(data.message);
    } catch (e) {
        //console.log('error', e)
        data = {
            status: false,
            message: e.message
        }
        //console.log('response+++++++', data)
        toast.error(data.message);
    }
    return data
})
export const deleteChecklist = createAsyncThunk('checklist/delete', async (payload, thunkAPI) => {
    let data = {}
    //console.log("deleteLocation...................", payload)
    try {
        const response = await client.mutate({
            mutation: deleteChecklistMutation, variables: {
                "id": `${payload}`
            }
        })
        data = {
            status: true,
            message: 'Checklist Deleted Sucessfully'
        }
        //console.log('response+++++++', data)
        toast.success(data.message);
    } catch (e) {
        //console.log('error', e)
        data = {
            status: true,
            message: 'Checklist Deleted Sucessfully'
        }
        toast.error(data.message);
    }
    return data
})
const checklistSlice = createSlice({
    name : "checklist",
    initialState : {
        checklistResponse : {},
        checklistList : [],
    },
    extraReducers:{
        [createChecklist.fulfilled] : (state,action) => {
            state.checklistResponse = action.payload;
            return state;
        },
        [getChecklist.fulfilled] : (state,action) => {
            state.checklistList = action.payload;
            return state;
        },
        [updateChecklist.fulfilled] : (state,action) => {
            state.checklistResponse = action.payload;
            return state;
        },
        [deleteChecklist.fulfilled] : (state,action) => {
            state.checklistResponse = action.payload;
            return state;
        }
    }
})
export default checklistSlice.reducer;