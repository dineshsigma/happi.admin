import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'
import { client,baseUrl } from '../../environment'
import { toast } from 'react-toastify';
import axios from 'axios';


const createDepartmentMutation = gql`mutation addDepartment($object:department_insert_input!){
    insert_department_one(object:$object){
        id
    }
}`;

const getDepartmentsQuery = gql `query getDepartments($name:String!){ department(where:{name:{_iregex:$name}}){
    id
    name
    parent
    }  
}`;

const updateDepartmentMutation = gql `mutation update_department($object:[department_insert_input!]!) {
    insert_department(objects: $object
    ,
          on_conflict: {
            constraint: department_pkey,
            update_columns: [name,parent]
          }
      ){
          affected_rows
      }
}`;

const deleteDepartmentMutation = gql `mutation deleteDepartment($id: Int!) {
    delete_department(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }`; 



export const createDepartment = createAsyncThunk('department/create', async (payload, thunkAPI) => {
    //console.log("Create Department Payload ...................", payload)
    //console.log('11111111111')
     
    let data = {}
    try {
        const response = await client.mutate({
            mutation: createDepartmentMutation, variables: {
                object: payload
            }
        });
        data = {
            status: true,
            message: 'Department Added Sucessfully'
        }
        //console.log('response+++++++11',response, data)
        toast.success(data.message);
        thunkAPI.dispatch(setAddform(false))
        thunkAPI.dispatch(setButtonLoading(false))
        

    } catch (e) {
        //console.log('error', e)
         data = {
            status: false,
            message: e.message
        }
        //console.log('response+++++++', data)
        toast.error(data.message);
        thunkAPI.dispatch(setButtonLoading(false))
    }
    return data
})

export const getDepartments = createAsyncThunk('department/getDepartments', async (payload) => {
    try {
        const response = await  client.query({query : getDepartmentsQuery , variables: {
            "name":`${payload}`
        }})
        //console.log('Departments list33333333333333333333333',response.data.department)
          return response.data.department
    } catch (e) {
        //console.log('error', e)
    }
})

export const updateDepartment = createAsyncThunk('department/updateDepartment', async (payload , thunkAPI) => {
    //console.log("Update Department Payload ...................", payload)
    let data = {}
    try {
        const response = await client.mutate({
            mutation: updateDepartmentMutation, variables: {
                object: payload
            }
        });
        data = {
            status: true,
            message: 'Department Updated Sucessfully'
        }
        //console.log('response+++++++', data)
        toast.success(data.message);
        thunkAPI.dispatch(setUpdateForm(false))
        thunkAPI.dispatch(setButtonLoading(false))
        
    } catch (e) {
        //console.log('error', e)
        data = {
            status: true,
            message: e.message
        }
        //console.log('response+++++++', data)
        toast.error(data.message);
        thunkAPI.dispatch(setButtonLoading(false))
    }
    return data
})

export const deleteDepartment = createAsyncThunk('department/delete', async (payload,thunkAPI) => {
    let data = {}
    //console.log("deleteDepartment...................", payload)
    try {
        const response = await client.mutate({
            mutation: deleteDepartmentMutation, variables: {
                "id": `${payload}`
            }
        })
        data = {
            status: true,
            message: 'Department Deleted Sucessfully'
        }
        //console.log('response+++++++', data)
        toast.success(data.message);
        thunkAPI.dispatch(setUpdateForm(false))
        thunkAPI.dispatch(setButtonLoading(false))
        
    } catch (e) {
        //console.log('error', e)
        data = {
            status: true,
            message: e.message
        }
        toast.error(data.message);
        thunkAPI.dispatch(setButtonLoading(false))
    }
    return data
})

export const departmentsCsvUpload = createAsyncThunk('departments/bulkUpload', async (payload, thunkAPI, state) => {
    const orgId = thunkAPI.getState().auth.current_organization
    console.log(payload)
    console.log(orgId)
    const token = localStorage.getItem('token');
    let body = {
        filename: payload.name,
        folder_type: 'csv',
    }

    try {
        const response = await axios.post(`${baseUrl}api/configuration/getFileUploadUrl/${orgId}`,body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } )
        const awsResponse = await axios.put(response.data.data, payload, {
            headers: {
              'Content-Type': payload.type,
            },
          }).then(async (res)=> {
            let uploadBody = {
                filename: payload.name,
                folderpath: response.data.folderpath,
            }
            let data = await axios.post(`${baseUrl}uploadCsv/department/${orgId}`,uploadBody, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data
        })
        console.log('response', awsResponse)
        toast.success(awsResponse.message);
        thunkAPI.dispatch(setButtonLoading(false))
        return awsResponse
    }
    catch (e) { 
        console.log(e)
        toast.error(e.message);
        thunkAPI.dispatch(setButtonLoading(false))
    }

})

export const departmentSlice = createSlice({
    name: 'department',
    initialState: {
        departmentsList: [],
        updatedepartmentResponse: {},
        createDepRes :{},
        showAddForm : false,
        showUpdateForm: false,
        buttonLoading : false

    },
    extraReducers: {
        [createDepartment.fulfilled]: (state, action) => {
            state.createDepRes = action.payload;
            //console.log('2222222222222222222222222222222222222',state, action.payload)
            return state;
        },
        [getDepartments.fulfilled]: (state, action) => {
            // //console.log("dsfsdfsdfsdfdsfds.......", state, action);
            state.departmentsList = action.payload;
            return state;
        },
        [updateDepartment.fulfilled]: (state, action) => {
            //console.log('11111111111111')
            state.updatedepartmentResponse = action.payload;
            //console.log('update department return ', action.payload, state.departmentResponse)
            //console.log('2222222222')
            return state;
        },
        [deleteDepartment.fulfilled]: (state, action) => {
            state.updatedepartmentResponse = action.payload;
            //console.log('2222222222222222222222222222222222222')
            return state;
        },
    },
    reducers: {
        setAddform: (state,action) => {
            state.showAddForm = action.payload
            return state;
        },
        setUpdateForm : (state,action) => {
            state.showUpdateForm = action.payload
            return state;
        },
        setButtonLoading : (state, action)=>{
            state.buttonLoading = action.payload
            return state;
        }
    }
}
)

export const { setAddform, setUpdateForm, setButtonLoading } = departmentSlice.actions

export default departmentSlice.reducer