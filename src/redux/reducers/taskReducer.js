import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'
import { client } from '../../environment'
import { toast } from 'react-toastify';
import { RRule, RRuleSet, rrulestr } from 'rrule'
import ms from 'ms'

// const createTaskMutation = gql ``
const createTaskMutation = gql`mutation createTask($object:tasks_insert_input!){

    insert_tasks_one(object:$object){

        id

    }

}`;
const createTaskMutation_individual = gql`mutation createTask($objects:[tasks_insert_input!]!){

    insert_tasks(objects:$objects){
        returning{
        id
        }

    }       

}`;

const createReccurssiveTaskMutation = gql`mutation createTask($object:task_template_insert_input!){
    insert_task_template_one(object:$object){
        id
    }
}`

const getTaskByIdMutation = gql`query getTask($id:Int!){
    tasks(where:{id:{_eq:$id}}) {
        name
        description
        assignee_type
        start_date
        due_date
        status
        priority
        task_type
        is_active
        checklistprogress
        remainder_interval
        parent
        create_individualTask
        assignee
        next_notification
        org_id
        id
      
    }
}`

const getSubtasksList = gql`query getTasks($parent: Int!) {
    tasks(where: {parent: {_eq: $parent}}) {
        name
        description
        assignee_type
        start_date
        due_date
        status
        priority
        task_type
        is_active
        checklistprogress
        remainder_interval
        parent
        create_individualTask
        assignee
        next_notification
        org_id
        id
     
    }
  }`

const getTasks = gql`query getTasks($name: String!) {
    tasks(where: {name: {_iregex: $name}}) {
        name
        description
        assignee_type
        start_date
        due_date
        status
        priority
        task_type
        is_active
        checklistprogress
        remainder_interval
        parent
        create_individualTask
        assignee
        next_notification
        org_id
        id
     
    }
  }`

const updateTaskMutation = gql`mutation updateTask($object:[tasks_insert_input!]!) {
    insert_tasks(objects: $object
    ,
          on_conflict: {
            constraint: tasks_pkey,
            update_columns: [name,assignee,description,due_date,start_date,priority,status,remainder_interval]
          }
      ){
          affected_rows
      }
    }
    `

const deleteTaskMutation = gql`mutation deleteTasks($id: Int!) {
        delete_tasks(where: {id: {_eq: $id}}) {
          affected_rows
        }
      }
      `

const getRecurring_Tasks = gql`query MyQuery {
    task_template(where:{task_type:{_eq:"reccurssive"}}) {                                       
      id
      name
      org_id
      assignee
      description
      start_date
      untill_date
      status
      priority
      next_trigger_time
      rule_text
      is_active
    }
  }`;

export const getTaskById = createAsyncThunk('tasks/getById', async (payload) => {
    // console.log("getTaskById...................", payload)
    try {
        const response = await client.query({
            query: getTaskByIdMutation, variables: {
                "id": parseInt(payload.id)
            }
        })
        console.log('getTaskById', response.data.tasks[0])
        return response.data.tasks[0]
    } catch (e) {
        console.log('error', e)
    }
})

export const updateTask = createAsyncThunk('tasks/update', async (payload) => {
    console.log("getTaskById...................", payload)
    try {
        var temp = payload;
        var assignees = temp.assignee
        console.log(`{${assignees.join(',')}}`)
        temp.assignee = `{${assignees.join(',')}}`
        const response = await client.query({
            query: updateTaskMutation, variables: {
                object: temp
            }
        })
        console.log('update task', response)
        return response
    } catch (e) {
        console.log('error', e)
    }
})

export const getSubtasks = createAsyncThunk('tasks/subtasks', async (payload) => {
    // console.log("getTaskById...................", payload)
    try {
        const response = await client.query({
            query: getSubtasksList, variables: {
                "parent": payload
            }
        })
        console.log('getTaskById', response.data.tasks)
        return response.data.tasks
    } catch (e) {
        console.log('error', e)
    }
})

export const createTask = createAsyncThunk('tasks/create', async (payload, thunkAPI) => {
    console.log("Create User Payload ...................", payload)
    let individual_task = payload.indiv;
    let payload_data = payload

    if (payload_data.assignee.length > 1) {
        payload_data.assignee_type = "group"
    } else {
        payload_data.assignee_type = "single"
    }
    let data = {}
    if (!individual_task) {
        try {
            const response = await client.mutate({
                mutation: createTaskMutation, variables: {
                    object: payload_data
                }
            });
            data = {
                status: true,
                message: 'created Task Successfully'
            }
            console.log('response+++++++11', data)
            toast.success(data.message);
            // thunkAPI.dispatch(setUserAddform(false))
            // thunkAPI.dispatch(setUserButtonLoading(false))

        } catch (e) {
            // console.log('error', e)
            // data = {
            //     status: false,
            //     message: e.message
            // }
            //console.log('response+++++++', data)

        }
    } else {
        let payload_array = []
        payload.assignee.forEach((item_id) => {
            payload_array.push({ ...payload_data, assignee: `{${item_id}}` })
        })

        try {
            const response = client.mutate({
                mutation: createTaskMutation_individual, variables: {
                    objects: payload_array
                }
            });
            data = {
                status: true,
                message: 'created Task Successfully'
            }
            console.log('response+++++++11', data)
            toast.success(data.message);
            thunkAPI.dispatch(setButtonLoading(false))
        } catch (e) {
            // console.log('error', e)
            // data = {
            //     status: false,
            //     message: e.message
            // }
            //console.log('response+++++++', data)

        }
        console.log(payload_array)
    }
    return data
})

export const getAll_tasks = createAsyncThunk('tasks/getall', async (payload, thunkAPI) => {
    let name = {
        name: payload
    }
    try {
        const response = await client.query({
            query: getTasks, variables: name
        })
        return response.data.tasks
    } catch (e) {
        console.log('error', e)
    }
})
export const deleteTask = createAsyncThunk('tasks/delete', async (payload, thunkAPI) => {
    let data = {}
    try {
        const response = await client.mutate({
            mutation: deleteTaskMutation, variables: {
                "id": `${payload}`
            }
        })
        data = {
            status: true,
            message: 'Task Deleted Sucessfully'
        }
        toast.success(data.message);
        thunkAPI.dispatch(setButtonLoading(false))
        //console.log('response+++++++', data)


    } catch (e) {
        //console.log('error', e)
        data = {
            status: true,
            message: e.message
        }
        toast.error(data.message);
        thunkAPI.dispatch(setButtonLoading(false))
    }
})

export const get_Recursivetasks = createAsyncThunk('tasks/getRecursiveTasks', async (payload, thunkAPI) => {

    try {
        const response = await client.query({
            query: getRecurring_Tasks, variables: payload
        })
        return response.data.task_template
    } catch (e) {
        console.log('error', e)
    }
})

export const createReccurssiveTask = createAsyncThunk('templates/create', async (payload, thunkAPI) => {
    console.log("Create User Payload ...................", payload)
   
    let data = {}
    try {
        const response = await client.mutate({
            mutation: createReccurssiveTaskMutation, variables: {
                object: payload
            }
        });
        data = {
            status: true,
            message: 'Reccurssive task Added Sucessfully'
        }
        //console.log('response+++++++11', data)
        toast.success(data.message);
        thunkAPI.dispatch(setShowTemplateForm(false))
        thunkAPI.dispatch(setButtonLoading(false))
    } catch (e) {
        console.log('error', e)
        data = {
            status: false,
            message: e.message
        }
        //console.log('response+++++++', data)
        toast.error(data.message);
        // thunkAPI.dispatch(setReccurssiveTaskButtonLoading(false))
    }
    return data
})

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        showTask: false,
        showTemplateForm: false,
        buttonLoading: false,
        taskResponse: {},
        taskDetails: {},
        subTasksList: [],
        recursiveTaskList: {},
        tasks: {},
        deleteTaskResponse: {},
    },
    extraReducers: {
        [createTask.fulfilled]: (state, action) => {
            state.taskResponse = action.payload;
            return state;
        },

        [getSubtasks.fulfilled]: (state, action) => {
            state.subTasksList = action.payload;
            return state;
        },

        [getAll_tasks.fulfilled]: (state, action) => {
            state.tasks = action.payload;
            return state;
        },
        [deleteTask.fulfilled]: (state, action) => {
            state.deleteTaskResponse = action.payload;
            return state;
        },
        [get_Recursivetasks.fulfilled]: (state, action) => {
            state.recursiveTaskList = action.payload;
            return state;
        },
        [createReccurssiveTask.fulfilled]: (state, action) => {
            state.taskResponse = action.payload;
            return state;
        }
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
        setButtonLoading: (state, action) => {
            state.buttonLoading = action.payload
            return state;
        },
        setShowTemplateForm: (state,action) => {
            state.showTemplateForm = action.payload
        }
    }
}
)

export const { setTaskAddform, setTemplateAddform, setButtonLoading, setShowTemplateForm } = taskSlice.actions

export default taskSlice.reducer