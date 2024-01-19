import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'
import { client } from '../../environment'
import { toast } from 'react-toastify';

// const createTaskMutation = gql ``
const createTicketMutation = gql`mutation insert_ticket($object: ticket_insert_input!) {

    insert_ticket_one(object: $object) {
        id
        
        }
  
  }`;

  const getTicketQuery = gql`query getTicket($title: String!) {
    ticket(where: {title: {_iregex: $title}}) {
      id
      title
      type
      comment
      user_id
      date
      status
      assignee
      org_id
     
      
    }
  }`;

  const updateTicketMutation = gql`mutation update_ticket($object:[ticket_insert_input!]!) {
    insert_ticket(objects: $object
    ,
          on_conflict: {
            constraint: ticket_pkey,
            update_columns: [title,type,comment,status]
          }
      ){
          affected_rows
      }
    }`;

    const deleteTicketMutation = gql`mutation deleteTicket($id: Int!) {
        delete_ticket(where: {id: {_eq: $id}}) {
          affected_rows
        }
      }`;
    
    const getTickets_byid =  gql`query getCommentsByTicketId($ticket_id:Int!,$user_type:String!){
        ticket_comment(where:{ticket_id:{_eq:$ticket_id},user_type:{_eq:$user_type}}) {
          id
          comment
          ticket_id
          user_id
          user_type
        }
    }`;

    const getCommentsMutation =  gql`mutation insert_ticket_comment_one($object:ticket_comment_insert_input!) {
        insert_ticket_comment_one(object: $object) {
          id
          comment
          ticket_id
          user_id 
          user_type
        }
        }
      `;

export const getAll_tickets = createAsyncThunk('tickets/getall', async (payload, thunkAPI) => {
     let name = {
        title:payload
     }
        try {
            const response = await client.query({
                query: getTicketQuery, variables: name
            })
            
            return response.data.ticket
        } catch (e) {
            console.log('error', e)
        }
    })
    export const create_tickets = createAsyncThunk('tickets/create', async (payload, thunkAPI) => {
        console.log("pay",payload)
        let data = {}
           try {
               const response = await client.mutate({
                mutation: createTicketMutation, variables: {
                    object: payload
                }
               })
               data = {
                status: true,
                message: 'Ticket Created Sucessfully'
            }
            thunkAPI.dispatch(setButtonLoading(false))
            toast.success(data.message);
               return response.data
           } catch (e) {
               console.log('error', e)
           }
           thunkAPI.dispatch(setButtonLoading(false))
           toast.success(data.message);
       })

       export const deleteTicket = createAsyncThunk('tickets/delete', async (payload, thunkAPI) => {
        let data = {}
           try {
               const response = await client.mutate({
                mutation: deleteTicketMutation, variables: {
                        "id": `${payload}`
                }
               })
               data = {
                status: true,
                message: 'Ticket deleted Sucessfully'
            }
               toast.success(data.message);
               thunkAPI.dispatch(setButtonLoading(false))
               return response.data
           } catch (e) {
            data = {
                status: true,
                message: e.message
            }
            toast.error(data.message);
            thunkAPI.dispatch(setButtonLoading(false))
               console.log('error', e)
           }
       })
       export const getAll_ticketsComments_byid = createAsyncThunk('tickets/getticketsbyid', async (payload, thunkAPI) => {
       
           try {
               const response = await client.query({
                   query: getTickets_byid, variables: payload
               })
               console.log(response.data)
               return response.data.ticket_comment
           } catch (e) {
               console.log('error', e)
           }
       })

       export const create_Comment = createAsyncThunk('tickets/comment', async (payload, thunkAPI) => {
        console.log(payload)
           try {
               const response = await client.mutate({
                mutation: getCommentsMutation, variables: {
                    "object" : payload
                }
               })
               return response.data
           } catch (e) {
               console.log('error', e)
           }
       })
export const taskSlice = createSlice({
    name: 'tickets',
    initialState: {
        showTask : false,
        showTemplateForm : false,
        buttonLoading: false,
        taskResponse : {},
        tickets : [],
        deleteTicketResponse : {},
        createTicketResponse : {},
        getTicketsByid : [],
        createCommentResponse : {},
        buttonLoading : false
    },
    extraReducers: {
        [getAll_tickets.fulfilled]: (state, action) => {
            state.tickets = action.payload;
            return state;
        },
        [create_tickets.fulfilled]: (state, action) => {
            state.createTicketResponse = action.payload;
            return state;
        },
        [deleteTicket.fulfilled]: (state, action) => {
            state.deleteTicketResponse = action.payload;
            return state;
        },
        [getAll_ticketsComments_byid.fulfilled]: (state, action) => {
            state.getTicketsByid = action.payload;
            return state;
        },
        [create_Comment.fulfilled]: (state, action) => {
            state.createCommentResponse = action.payload;
            return state;
        },
       
    },
    reducers: {
        setTaskAddform: (state, action) => {
            state.showTask = action.payload
            return state;
        },
        setTemplateAddform: (state, action) => {
            state.showTemplateForm = action.payload
            return state;
        },
        setButtonLoading : (state, action)=>{
            state.buttonLoading = action.payload
            return state;
        }
    }
}
)

export const { setTaskAddform , setTemplateAddform,setButtonLoading} = taskSlice.actions

export default taskSlice.reducer