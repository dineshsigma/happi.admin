import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'
import { client, baseUrl } from '../../environment'
import { toast } from 'react-toastify';
import axios from 'axios';

const createLocationMutation = gql`mutation addLocation($object:locations_insert_input!){
    insert_locations_one(object:$object){
        id
    }
}`;

const getLocationsQuery = gql`query getLocations($name:String!){ locations (where:{name:{_iregex:$name}}){
    parent
    org_id
    name
    level
    is_primary
    id
    color
    }  
}`;

const updateLocationMutation = gql`mutation update_location($object:[locations_insert_input!]!) {
    insert_locations(objects: $object
    ,
          on_conflict: {
            constraint: locations_pkey,
            update_columns: [name,parent]
          }
      ){
          affected_rows
      }
    }`;
const deleteLocationMutation = gql`mutation delete_location($id: Int!) {
    delete_locations(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }`;


const locationCSVDownload = gql`mutation locationDownload($object:locationCsvDownload!) {
    locationCsv(arg1:$object) {
      status
      message
    }
  }`

export const createLocation = createAsyncThunk('locations/create', async (payload, thunkAPI) => {
    //console.log("Create Location Payload ...................", payload)
    let data = {}
    try {
        const response = await client.mutate({
            mutation: createLocationMutation, variables: {
                object: payload
            }
        });
        data = {
            status: true,
            message: 'Location Added Sucessfully'
        }
        //console.log('response+++++++11', data)
        toast.success(data.message);
        thunkAPI.dispatch(setLocationAddform(false))
        thunkAPI.dispatch(setLocationButtonLoading(false))

    } catch (e) {
        //console.log('error', e)
        data = {
            status: false,
            message: e.message
        }
        //console.log('response+++++++', data)
        toast.error(data.message);
        thunkAPI.dispatch(setLocationButtonLoading(false))
    }
    return data
})

export const getLocations = createAsyncThunk('locations/getLocations', async (payload) => {
    try {
        const response = await client.query({
            query: getLocationsQuery, variables: {
                "name": `${payload}`
            }
        })
        //console.log('getLocations', response.data.location)
        return response.data.locations
    } catch (e) {
        //console.log('error', e)
    }
})

export const updateLocation = createAsyncThunk('locations/updateLocation', async (payload, thunkAPI) => {
    //console.log("Update Location Payload ...................", payload)
    let data = {}
    try {
        const response = await client.mutate({
            mutation: updateLocationMutation, variables: {
                object: payload
            }
        });
        data = {
            status: true,
            message: 'Location Updated Sucessfully'
        }
        //console.log('response+++++++', data)
        toast.success(data.message);
        thunkAPI.dispatch(setLocationUpdateForm(false))
        thunkAPI.dispatch(setLocationButtonLoading(false))
    } catch (e) {
        //console.log('error', e)
        data = {
            status: true,
            message: e.message
        }
        //console.log('response+++++++', data)
        toast.error(data.message);
        thunkAPI.dispatch(setLocationButtonLoading(false))
    }
    return data
})

export const deleteLocation = createAsyncThunk('locations/delete', async (payload, thunkAPI) => {
    let data = {}
    //console.log("deleteLocation...................", payload)
    try {
        const response = await client.mutate({
            mutation: deleteLocationMutation, variables: {
                "id": `${payload}`
            }
        })
        data = {
            status: true,
            message: 'Location Deleted Sucessfully'
        }
        //console.log('response+++++++', data)
        toast.success(data.message);
        thunkAPI.dispatch(setLocationButtonLoading(false))
    } catch (e) {
        //console.log('error', e)
        data = {
            status: true,
            message: 'Location Deleted Sucessfully'
        }
        toast.error(data.message);
        thunkAPI.dispatch(setLocationButtonLoading(false))
    }
    return data
})

export const locationsCsvUpload = createAsyncThunk('locations/bulkUpload', async (payload, thunkAPI, state) => {
    const orgId = thunkAPI.getState().auth.current_organization
    console.log(payload)
    console.log(orgId)
    const token = localStorage.getItem('token');
    let body = {
        filename: payload.name,
        folder_type: 'csv',
    }

    try {
        const response = await axios.post(`${baseUrl}api/configuration/getFileUploadUrl/${orgId}`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const awsResponse = await axios.put(response.data.data, payload, {
            headers: {
                'Content-Type': payload.type,
            },
        }).then(async (res) => {
            let uploadBody = {
                filename: payload.name,
                folderpath: response.data.folderpath,
            }
            let data = await axios.post(`${baseUrl}uploadCsv/location/${orgId}`, uploadBody, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return data
        })
        console.log('response', awsResponse)
        toast.success(awsResponse.message);
        thunkAPI.dispatch(setLocationButtonLoading(false))
        return awsResponse
    }
    catch (e) {
        console.log(e)
        toast.error(e.message);
        thunkAPI.dispatch(setLocationButtonLoading(false))
        return e
    }
})

export const downloadCSVLocation  = createAsyncThunk('locations/delete', async (payload, thunkAPI) => {
    try {
        const response = await client.query({
            query: locationCSVDownload, variables: {
                object:{
                    "org_id":93
                  }
            }
        })
        console.log('getLocations', response)
        return response
    } catch (e) {
        //console.log('error', e)
    }
})


export const locationSlice = createSlice({
    name: 'location',
    initialState: {
        locationsList: [],
        locationResponse: {},
        showAddForm: false,
        showUpdateForm: false,
        buttonLoading: false
    },
    extraReducers: {
        [createLocation.fulfilled]: (state, action) => {
            state.locationResponse = action.payload;
            //console.log('2222222222222222222222222222222222222')
            return state;
        },
        [getLocations.fulfilled]: (state, action) => {
            //console.log("dsfsdfsdfsdfdsfds.......", state, action);
            state.locationsList = action.payload;
            return state;
        },
        [updateLocation.fulfilled]: (state, action) => {
            state.locationResponse = action.payload;
            //console.log('2222222222222222222222222222222222222')
            return state;
        },
        [deleteLocation.fulfilled]: (state, action) => {
            state.locationResponse = action.payload;
            //console.log('2222222222222222222222222222222222222')
            return state;
        },
    },
    reducers: {
        setLocationAddform: (state, action) => {
            state.showAddForm = action.payload
            return state;
        },
        setLocationUpdateForm: (state, action) => {
            state.showUpdateForm = action.payload
            return state;
        },
        setLocationButtonLoading: (state, action) => {
            state.buttonLoading = action.payload
            return state;
        }
    }
}
)

export const { setLocationAddform, setLocationUpdateForm, setLocationButtonLoading } = locationSlice.actions

export default locationSlice.reducer