import { gql } from "@apollo/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { client } from '../../environment'


const createCommentMutation = gql`mutation insert_comment($object: comment_insert_input!) {
    insert_comment_one(object: $object) {
        id
        }
  }`;
const getCommentsQuery = gql`query getCommentsByid($task_id:Int!){
    comment(where: {task_id: {_eq: $task_id}}) {
      id
      comment
      created_at
      user_id
    }
  }`;
const updateCommentsMutation = gql`mutation updateComments($object:[comment_insert_input!]!) {
    insert_comment(objects: $object
    ,
          on_conflict: {
            constraint: comment_pkey,
            update_columns: [comment]
          }
      ){
          affected_rows
      }
    }`;
const deleteCommentMutation = gql`mutation deleteComments($id: Int!) {
    delete_comment(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }`;
export const createComment = createAsyncThunk('comment/create', async(payload, thunkAPI)=>{
    let data = {}
    try{
        const response = await client.mutate({
            mutation: createCommentMutation, variables: {
                object: payload
            }
        });
        data = {
            status : true,
            message : 'Create Comment Successfully'
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
export const getComments = createAsyncThunk('comment/getComments', async (payload) => {
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++sdfdfdfsddf+++++++++++++++++++++++++++++++')
    try {
        const response = await client.query({
            query: getCommentsQuery, variables: {
                "task_id": `${payload}`
            }
        })
        return response.data.comment
    } catch (e) {
        console.log('error', e)
    }
})
export const updateComment = createAsyncThunk('comment/updateComment', async (payload , thunkAPI) => {
    //console.log("Update Location Payload ...................", payload)
    let data = {}
    try {
        const response = await client.mutate({
            mutation: updateCommentsMutation, variables: {
                object: payload
            }
        });
        data = {
            status: true,
            message: 'Comment Updated Sucessfully'
        }
        //console.log('response+++++++', data)
        toast.success(data.message);
    } catch (e) {
        //console.log('error', e)
        data = {
            status: true,
            message: e.message
        }
        //console.log('response+++++++', data)
        toast.error(data.message);
    }
    return data
})
export const deleteComment = createAsyncThunk('comment/delete', async (payload, thunkAPI) => {
    let data = {}
    //console.log("deleteLocation...................", payload)
    try {
        const response = await client.mutate({
            mutation: deleteCommentMutation, variables: {
                "id": `${payload}`
            }
        })
        data = {
            status: true,
            message: 'Comment Deleted Sucessfully'
        }
        //console.log('response+++++++', data)
        toast.success(data.message);
    } catch (e) {
        //console.log('error', e)
        data = {
            status: true,
            message: e.message
        }
        toast.error(data.message);
    }
    return data
})
const commentsSlice = createSlice({
    name : "ceomments",
    initialState : {
        commentsResponse : {},
        commentsList : [],
    },
    extraReducers:{
        [createComment.fulfilled] : (state,action) => {
            state.commentsResponse = action.payload;
            return state;
        },
        [getComments.fulfilled] : (state,action) => {
            state.commentsList = action.payload;
            return state;
        },
        [updateComment.fulfilled] : (state,action) => {
            state.commentsResponse = action.payload;
            return state;
        },
        [deleteComment.fulfilled] : (state,action) => {
            state.commentsResponse = action.payload;
            return state;
        }
    }
})
export default commentsSlice.reducer;