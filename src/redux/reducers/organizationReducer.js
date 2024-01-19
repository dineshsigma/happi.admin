import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'
import { client, baseUrl } from '../../environment'
import { toast } from 'react-toastify';
import axios from 'axios';

// const createOrganizationMutation = gql`mutation add_organization($object:AddMoreOrganizationsInput!) {
//     addOrganization(arg1:$object)
//     {
//       message
//       status
//     }
// }`;

const createOrganizationMutation = gql`mutation add_organization($object:createOrganizationInput!) {
    createOrg(arg1:$object)
    {
      message
      status
    }
  }`;

const getOrganizationsQuery = gql`query getLocations($name:String!){ location (where:{name:{_iregex:$name}}){
    parent
    org_id
    name
    level
    is_primary
    id
    color
    }  
}`;

const updateOrganizationMutation = gql`mutation update_location($object:[location_insert_input!]!) {
    insert_location(objects: $object
    ,
          on_conflict: {
            constraint: locations_pkey,
            update_columns: [name,parent]
          }
      ){
          affected_rows
      }
    }`;

const deleteOrganizationMutation = gql`mutation delete_location($id: Int!) {
    delete_location(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }`;

const getOrganizationsByIds = gql`query exceptOrganization($array:[Int!]!) {
    organization(where:{id: {_in: $array}}) {
       name
       email
       address
       district
       domain_name
       state
       time_zone
       segment_type
       pincode
       logo
       language
       is_active
       is_delete
       contact_no
       business_type
       billing_status
       id
    }
   }`

const sendOtpQuery = gql`mutation epotps($object:emailAndPhoneOtps!) {   
    epOtps(arg1:$object)
   { 
   
  message
     status
     }
}`


export const createOrganization = createAsyncThunk('organizations/create', async (payload, thunkAPI) => {
    // console.log("Create Organization Payload ...................", payload)
    let data = {}
    try {
        const response = await client.mutate({
            mutation: createOrganizationMutation, variables: {
                object: payload
            }
        });
        // console.log(response, 'RRRRRRRRRRRRRRRR');
        if (response.data.createOrg.status) {
            toast.success(response.data.createOrg.message);
            thunkAPI.dispatch(setOrganizationAddform(false))
            thunkAPI.dispatch(setOrganizationButtonLoading(false))
        } else {
            toast.error(response.data.createOrg.message);
        }

    } catch (e) {
        //console.log('error', e)
        data = {
            status: false,
            message: e.message
        }
        //console.log('response+++++++', data)
        toast.error(data.message);
        thunkAPI.dispatch(setOrganizationButtonLoading(false))
    }
    return data
})

export const getOrganizations = createAsyncThunk('organizations/getOrganizations', async (payload) => {
    try {
        const response = await client.query({
            query: getOrganizationsByIds, variables: {
                "array": payload
            }
        })
        console.log('getOrganizations', response.data.organization)
        return response.data.organization
    } catch (e) {
        //console.log('error', e)
    }
})

export const updateOrganization = createAsyncThunk('organizations/updateOrganization', async (payload, thunkAPI) => {
    //console.log("Update Organization Payload ...................", payload)
    let data = {}
    try {
        const response = await client.mutate({
            mutation: updateOrganizationMutation, variables: {
                object: payload
            }
        });
        data = {
            status: true,
            message: 'Organization Updated Sucessfully'
        }
        //console.log('response+++++++', data)
        toast.success(data.message);
        thunkAPI.dispatch(setOrganizationUpdateForm(false))
        thunkAPI.dispatch(setOrganizationButtonLoading(false))
    } catch (e) {
        //console.log('error', e)
        data = {
            status: true,
            message: e.message
        }
        //console.log('response+++++++', data)
        toast.error(data.message);
        thunkAPI.dispatch(setOrganizationButtonLoading(false))
    }
    return data
})

export const deleteOrganization = createAsyncThunk('organizations/delete', async (payload, thunkAPI) => {
    let data = {}
    //console.log("deleteOrganization...................", payload)
    try {
        const response = await client.mutate({
            mutation: deleteOrganizationMutation, variables: {
                "id": `${payload}`
            }
        })
        data = {
            status: true,
            message: 'Organization Deleted Sucessfully'
        }
        //console.log('response+++++++', data)
        toast.success(data.message);
        thunkAPI.dispatch(setOrganizationButtonLoading(false))
    } catch (e) {
        //console.log('error', e)
        data = {
            status: true,
            message: 'Organization Deleted Sucessfully'
        }
        toast.error(data.message);
        thunkAPI.dispatch(setOrganizationButtonLoading(false))
    }
    return data
})

export const sendCreateOrgOtp = createAsyncThunk('organizations/delete', async (payload) => {
    console.log('payload',payload)
    try {
        const response = await client.mutate({
            mutation: sendOtpQuery, variables: {
                object: payload
            }
        })
        console.log('sendOtpQuery', response.data.epOtps)
        return response.data.epOtps
    } catch (e) {
        console.log('error', e)
    }
})





export const organizationSlice = createSlice({
    name: 'organization',
    initialState: {
        organizationsList: [],
        organizationResponse: {},
        showAddForm: false,
        showUpdateForm: false,
        buttonLoading: false,
        plan_details: {},
        createOrgObj: {},
        createUserObj: {}
    },
    extraReducers: {
        [createOrganization.fulfilled]: (state, action) => {
            state.organizationResponse = action.payload;
            //console.log('2222222222222222222222222222222222222')
            return state;
        },
        [getOrganizations.fulfilled]: (state, action) => {
            //console.log("dsfsdfsdfsdfdsfds.......", state, action);
            state.organizationsList = action.payload;
            return state;
        },
        [updateOrganization.fulfilled]: (state, action) => {
            state.organizationResponse = action.payload;
            //console.log('2222222222222222222222222222222222222')
            return state;
        },
        [deleteOrganization.fulfilled]: (state, action) => {
            state.organizationResponse = action.payload;
            //console.log('2222222222222222222222222222222222222')
            return state;
        },
        [deleteOrganization.fulfilled]: (state, action) => {
            state.organizationResponse = action.payload;
            //console.log('2222222222222222222222222222222222222')
            return state;
        },

    },
    reducers: {
        setOrganizationAddform: (state, action) => {
            state.showAddForm = action.payload
            return state;
        },
        setOrganizationUpdateForm: (state, action) => {
            state.showUpdateForm = action.payload
            return state;
        },
        setOrganizationButtonLoading: (state, action) => {
            state.buttonLoading = action.payload
            return state;
        },
        setPlanDetails: (state, action) => {
            console.log(action.payload)
            state.plan_details = action.payload
        },
        setUserObj: (state, action) => {
            console.log(action.payload)
            state.createUserObj = action.payload
        },
        setOrgCreateObj: (state, action) => {
            console.log(action.payload)
            state.createOrgObj = action.payload
        }
    }
}
)

export const { setOrganizationAddform, setOrganizationUpdateForm, setOrganizationButtonLoading, setPlanDetails, setUserObj, setOrgCreateObj } = organizationSlice.actions

export default organizationSlice.reducer