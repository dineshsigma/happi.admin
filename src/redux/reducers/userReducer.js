import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'
import { client } from '../../environment'
import { toast } from 'react-toastify';

const createUserMutation = gql`mutation createUser($object:AddUserInput!){
    addUser(arg1:$object){
        message
        status
    }
  }`;

const getUsersQuery = gql`query getUsers($name:String!) {

    user_org(where:{user:{_or: [{name: {_iregex: $name}},{lastname:{_iregex: $name}}],_and:{is_delete:{_eq:false}}}}){

           id

          user_id

          org_id

      active_time

      department_id

      designation_id

      location_id

      role_id

      reporting_manager

      is_active

    user{

          id

           name

           lastname

           email

           phone

           is_delete

           password

           login_type

    } 

    }

}`;



const updateUserMutation = gql`mutation update_user($object:[users_insert_input!]!) {
    insert_users(objects: $object
    ,
          on_conflict: {
            constraint: users_pkey,
            update_columns: [name,lastname,email,phone]
          }
      ){
          affected_rows
      }
    }`;

const updateUerOrg = gql`mutation update_user($object:[user_org_insert_input!]!) {
    insert_user_org(objects: $object
    ,
          on_conflict: {
            constraint: user_org_pkey,
            update_columns: [location_id,department_id,role_id,reporting_manager,designation_id]
          }
      ){
          affected_rows
      }
    }`

const deleteUserMutation = gql`mutation deleteUser($id: Int!) {
    delete_users(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }`;

const exceptUsersMutation = gql`query exceptUsers($array:[Int!]!,$name: String!) {

    user_org(where:{user:{id: {_nin: $array},_or:[{name: {_iregex: $name}},{lastname:{_iregex: $name}}]}}){
   
                  id
   
                org_id
   
           user{
   
                 id
   
                  name
   
                  lastname
   
                  email
   
                  phone
   
                  is_delete
   
                  password
   
   
                  login_type
   
           } 
   
           }
        }`

const userOrgList = gql`query getAllUsers {
    user_org {  
      user_id
      org_id
      department_id
      location_id
      role_id
      reporting_manager
      active_time
      designation_id
      id
      is_active
    }
  }`

const getNoticationsById = gql`query getNotificationByid($user_id:Int!){
    notification(where: {user_id: {_eq: $user_id}}) {
     title
     message
     read
    }
  }`

export const createUser = createAsyncThunk('users/create', async (payload, thunkAPI) => {
    console.log("Create User Payload ...................", payload)
    let data = {}
    try {
        const response = await client.mutate({
            mutation: createUserMutation, variables: {
                object: payload
            }
        });
        data = {
            status: true,
            message: 'User Added Sucessfully'
        }
        //console.log('response+++++++11', data)
        toast.success(data.message);
        thunkAPI.dispatch(setUserAddform(false))
        thunkAPI.dispatch(setUserButtonLoading(false))

    } catch (e) {
        console.log('error', e)
        data = {
            status: false,
            message: e.message
        }
        //console.log('response+++++++', data)
        toast.error(data.message);
        thunkAPI.dispatch(setUserButtonLoading(false))
    }
    return data
})

export const getUsers = createAsyncThunk('users/getUsers', async (payload) => {
    //console.log("getUsers...................", payload)
    try {
        const response = await client.query({
            query: getUsersQuery, variables: {
                "name": `${payload}`
            }
        })
        var data = []
        console.log('response.data', response)
        response.data?.user_org.filter((item) => data.push(item.user))
        return data
    } catch (e) {
        console.log('error', e)
    }
})

export const updateUser = createAsyncThunk('users/updateUser', async (payload, thunkAPI) => {
    //console.log("Update Location Payload ...................", payload)
    let data = {}
    try {
        const userResponse = await client.mutate({
            mutation: updateUserMutation, variables: {
                object: payload.user
            }
        });
        const userOrgResponse = await client.mutate({
            mutation: updateUerOrg, variables: {
                object: payload.userOrg
            }
        });
        data = {
            status: true,
            message: 'User Updated Sucessfully'
        }
        //console.log('response+++++++', data)
        toast.success(data.message);
        thunkAPI.dispatch(setUserUpdateForm(false))
        thunkAPI.dispatch(setUserButtonLoading(false))
    } catch (e) {
        //console.log('error', e)
        data = {
            status: true,
            message: e.message
        }
        //console.log('response+++++++', data)
        toast.error(data.message);
        thunkAPI.dispatch(setUserButtonLoading(false))
    }
    return data
})

export const deleteUser = createAsyncThunk('users/delete', async (payload, thunkAPI) => {
    let data = {}
    //console.log("deleteUser...................", payload)
    try {
        const response = await client.mutate({
            mutation: deleteUserMutation, variables: {
                "id": `${payload}`
            }
        })
        data = {
            status: true,
            message: 'User Deleted Sucessfully'
        }
        //console.log('response+++++++', data)
        toast.success(data.message);
        thunkAPI.dispatch(setUserButtonLoading(false))
    } catch (e) {
        console.log('error', e)
        data = {
            status: true,
            message: 'User Deleted Sucessfully'
        }
        toast.error(data.message);
        thunkAPI.dispatch(setUserButtonLoading(false))
    }
    return data
})

export const getExceptUsers = createAsyncThunk('users/exceptUsers', async (payload, thunkAPI) => {
    try {
        const response = await client.query({
            query: exceptUsersMutation, variables: payload
        })
        // console.log('getExceptUsers', response.data.users)
        var data = []
        console.log('response.data', response)
        response.data?.user_org.filter((item) => data.push(item.user))
        return data
    } catch (e) {
        console.log('error', e)
    }
})

export const getOrgUsers = createAsyncThunk('users/getOrgUsers', async (payload) => {
    try {
        const response = await client.query({
            query: userOrgList
        })
        console.log('getOrgUsers', response.data.user_org
        )
        return response.data.user_org
    } catch (e) {
        console.log('error', e)
    }
})

export const getUserNotificatinos = createAsyncThunk('users/getNotificaitions', async (payload) => {
    //console.log("getUsers...................", payload)
    try {
        const response = await client.query({
            query: getNoticationsById, variables: {
                "user_id": payload
            }
        })
        console.log('getUsersNotifications', response.data.notification)
        return response.data.notification
    } catch (e) {
        console.log('error', e)
    }
})


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        usersList: [],
        userResponse: {},
        exceptedUsers: [],
        orgUsersList: [],
        showAddForm: false,
        showUpdateForm: false,
        buttonLoading: false,
        notificationList: []
    },
    extraReducers: {
        [createUser.fulfilled]: (state, action) => {
            state.userResponse = action.payload;
            return state;
        },
        [getUsers.fulfilled]: (state, action) => {
            console.log('action.payload', action.payload)
            state.usersList = action.payload;
            return state;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.userResponse = action.payload;
            return state;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.userResponse = action.payload;
            return state;
        },
        [getExceptUsers.fulfilled]: (state, action) => {
            state.exceptedUsers = action.payload;
            return state;
        },
        [getOrgUsers.fulfilled]: (state, action) => {
            state.orgUsersList = action.payload;
            return state;
        },
        [getUserNotificatinos.fulfilled]: (state, action) => {
            state.notificationList = action.payload;
            return state;
        },
    },
    reducers: {
        setUserAddform: (state, action) => {
            state.showAddForm = action.payload
            return state;
        },
        setUserUpdateForm: (state, action) => {
            state.showUpdateForm = action.payload
            return state;
        },
        setUserButtonLoading: (state, action) => {
            state.buttonLoading = action.payload
            return state;
        }
    }
}
)

export const { setUserAddform, setUserUpdateForm, setUserButtonLoading } = userSlice.actions

export default userSlice.reducer