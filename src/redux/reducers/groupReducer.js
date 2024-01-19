import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'
import { client } from '../../environment'
import { toast } from 'react-toastify';

const createGroupMutation = gql`mutation addGroups($object:groups_insert_input!){
    insert_groups_one(object:$object){
        id
    }
}`;

const getGroupsQuery = gql`query getGroups($title: String!) {
    groups(where: {title: {_iregex: $title}}) {
      id
      org_id
      title
      created_at
      created_by
      description
      group_members
    }
  }`;

const updateGroupMutation = gql`mutation updateGroup($object:[groups_insert_input!]!) {
    insert_groups(objects: $object
    ,
          on_conflict: {
            constraint: groups_pkey,
            update_columns: [title,group_members]
          }
      ){
          affected_rows
      }
    }`;
const deleteGroupMutation = gql `mutation deleteGroup($id: Int!) {
    delete_groups(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }`;   

export const createGroup = createAsyncThunk('groups/create', async (payload, thunkAPI) => {
    //console.log("Create Group Payload ...................", payload)
    let data = {}
    try {
        const response = await client.mutate({
            mutation: createGroupMutation, variables: {
                object: payload
            }
        });
        data = {
            status: true,
            message: 'Group Added Sucessfully'
        }
        //console.log('response+++++++11', data)
        toast.success(data.message);
        thunkAPI.dispatch(setGroupAddform(false))
        thunkAPI.dispatch(setGroupButtonLoading(false))

    } catch (e) {
        //console.log('error', e)
        data = {
            status: false,
            message: e.message
        }
        //console.log('response+++++++', data)
        toast.error(data.message);
        thunkAPI.dispatch(setGroupButtonLoading(false))
    }
    return data
})

export const getGroups = createAsyncThunk('groups/getGroups', async (payload) => {
    try {
        const response = await client.query({
            query: getGroupsQuery, variables: {
                "title": `${payload}`
            }
        })
        //console.log('getGroups', response.data.groups)
        return response.data.groups
    } catch (e) {
        //console.log('error', e)
    }
})

export const updateGroup = createAsyncThunk('groups/updateGroup', async (payload , thunkAPI) => {
    //console.log("Update Group Payload ...................", payload)
    let data = {}
    try {
        const response = await client.mutate({
            mutation: updateGroupMutation, variables: {
                object: payload
            }
        });
        data = {
            status: true,
            message: 'Group Updated Sucessfully'
        }
        //console.log('response+++++++', data)
        toast.success(data.message);
        thunkAPI.dispatch(setGroupUpdateForm(false))
        thunkAPI.dispatch(setGroupButtonLoading(false))
    } catch (e) {
        //console.log('error', e)
        data = {
            status: true,
            message: e.message
        }
        //console.log('response+++++++', data)
        toast.error(data.message);
        thunkAPI.dispatch(setGroupButtonLoading(false))
    }
    return data
})

export const deleteGroup = createAsyncThunk('groups/delete', async (payload, thunkAPI) => {
    let data = {}
    //console.log("deleteGroup...................", payload)
    try {
        const response = await client.mutate({
            mutation: deleteGroupMutation, variables: {
                "id": `${payload}`
            }
        })
        data = {
            status: true,
            message: 'Group Deleted Sucessfully'
        }
        //console.log('response+++++++', data)
        toast.success(data.message);
        thunkAPI.dispatch(setGroupButtonLoading(false))
    } catch (e) {
        //console.log('error', e)
        data = {
            status: true,
            message: 'Group Deleted Sucessfully'
        }
        toast.error(data.message);
        thunkAPI.dispatch(setGroupButtonLoading(false))
    }
    return data
})


export const groupSlice = createSlice({
    name: 'groups',
    initialState: {
        groupsList: [],
        groupResponse: {},
        showAddForm : false,
        showUpdateForm: false,
        buttonLoading : false
    },
    extraReducers: {
        [createGroup.fulfilled]: (state, action) => {
            state.groupResponse = action.payload;
            //console.log('2222222222222222222222222222222222222')
            return state;
        },
        [getGroups.fulfilled]: (state, action) => {
            //console.log("dsfsdfsdfsdfdsfds.......", state, action);
            state.groupsList = action.payload;
            return state;
        },
        [updateGroup.fulfilled]: (state, action) => {
            state.groupResponse = action.payload;
            //console.log('2222222222222222222222222222222222222')
            return state;
        },
        [deleteGroup.fulfilled]: (state, action) => {
            state.groupResponse = action.payload;
            //console.log('2222222222222222222222222222222222222')
            return state;
        },
    },
    reducers: {
        setGroupAddform: (state,action) => {
            state.showAddForm = action.payload
            return state;
        },
        setGroupUpdateForm : (state,action) => {
            state.showUpdateForm = action.payload
            return state;
        },
        setGroupButtonLoading : (state, action)=>{
            state.buttonLoading = action.payload
            return state;
        }
    }
}
)

export const { setGroupAddform, setGroupUpdateForm, setGroupButtonLoading } = groupSlice.actions

export default groupSlice.reducer