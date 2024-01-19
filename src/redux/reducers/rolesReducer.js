import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'
import { client } from '../../environment'
import { toast } from 'react-toastify';

const createRoleMutation = gql`mutation createUser($object:users_insert_input!){
    insert_users_one(object:$object){
        id
    }
}`;

const getRolesQuery = gql`query getRoles($name: String!) {

    roles(where: {name: {_iregex: $name}}) {
  
      id
      org_id
      name
      created_at
      description
  
    }
  
  }`;



const updateRoleMutation = gql`mutation update_user($object:[users_insert_input!]!) {
    insert_users(objects: $object
    ,
          on_conflict: {
            constraint: users_pkey,
            update_columns: [name,lastname,email,phone,color,password,pin,id]
          }
      ){
          affected_rows
      }
    }`;

const deleteRoleMutation = gql`mutation deleteUser($id: Int!) {
    delete_users(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }`;

export const createRole = createAsyncThunk('roles/create', async (payload, thunkAPI) => {
    //console.log("Create Role Payload ...................", payload)
    let data = {}
    try {
        const response = await client.mutate({
            mutation: createRoleMutation, variables: {
                object: payload
            }
        });
        data = {
            status: true,
            message: 'Role Added Sucessfully'
        }
        //console.log('response+++++++11', data)
        toast.success(data.message);
        thunkAPI.dispatch(setRoleAddform(false))
        thunkAPI.dispatch(setRoleButtonLoading(false))

    } catch (e) {
        //console.log('error', e)
        data = {
            status: false,
            message: e.message
        }
        //console.log('response+++++++', data)
        toast.error(data.message);
        thunkAPI.dispatch(setRoleButtonLoading(false))
    }
    return data
})

export const getRoles = createAsyncThunk('roles/getRoles', async (payload) => {
    //console.log("getRoles...................", payload)
    try {
        const response = await client.query({
            query: getRolesQuery, variables: {
                "name": `${payload}`
            }
        })
        //console.log('getRoles', response.data.roles)
        return response.data.roles
    } catch (e) {
        console.log('error', e)
    }
})

export const updateRole = createAsyncThunk('roles/updateRole', async (payload, thunkAPI) => {
    //console.log("Update Location Payload ...................", payload)
    let data = {}
    try {
        const response = await client.mutate({
            mutation: updateRoleMutation, variables: {
                object: payload
            }
        });
        data = {
            status: true,
            message: 'Role Updated Sucessfully'
        }
        //console.log('response+++++++', data)
        toast.success(data.message);
        thunkAPI.dispatch(setRoleUpdateForm(false))
        thunkAPI.dispatch(setRoleButtonLoading(false))
    } catch (e) {
        console.log('error', e)
        data = {
            status: true,
            message: e.message
        }
        //console.log('response+++++++', data)
        toast.error(data.message);
        thunkAPI.dispatch(setRoleButtonLoading(false))
    }
    return data
})

export const deleteRole = createAsyncThunk('roles/delete', async (payload, thunkAPI) => {
    let data = {}
    //console.log("deleteRole...................", payload)
    try {
        const response = await client.mutate({
            mutation: deleteRoleMutation, variables: {
                "id": `${payload}`
            }
        })
        data = {
            status: true,
            message: 'Role Deleted Sucessfully'
        }
        //console.log('response+++++++', data)
        toast.success(data.message);
        thunkAPI.dispatch(setRoleButtonLoading(false))
    } catch (e) {
        //console.log('error', e)
        data = {
            status: true,
            message: 'Role Deleted Sucessfully'
        }
        toast.error(data.message);
        thunkAPI.dispatch(setRoleButtonLoading(false))
    }
    return data
})


export const roleSlice = createSlice({
    name: 'roles',
    initialState: {
        rolesList: [],
        rolesResponse: {},
        showAddForm: false,
        showUpdateForm: false,
        buttonLoading: false
    },
    extraReducers: {
        [createRole.fulfilled]: (state, action) => {
            state.rolesResponse = action.payload;
            //console.log('2222222222222222222222222222222222222')
            return state;
        },
        [getRoles.fulfilled]: (state, action) => {
            //console.log("dsfsdfsdfsdfdsfds.......", state, action);
            state.rolesList = action.payload;
            return state;
        },
        [updateRole.fulfilled]: (state, action) => {
            state.rolesResponse = action.payload;
            //console.log('2222222222222222222222222222222222222')
            return state;
        },
        [deleteRole.fulfilled]: (state, action) => {
            state.rolesResponse = action.payload;
            //console.log('2222222222222222222222222222222222222')
            return state;
        },
    },
    reducers: {
        setRoleAddform: (state, action) => {
            state.showAddForm = action.payload
            return state;
        },
        setRoleUpdateForm: (state, action) => {
            state.showUpdateForm = action.payload
            return state;
        },
        setRoleButtonLoading: (state, action) => {
            state.buttonLoading = action.payload
            return state;
        }
    }
}
)

export const { setRoleAddform, setRoleUpdateForm, setRoleButtonLoading } = roleSlice.actions

export default roleSlice.reducer