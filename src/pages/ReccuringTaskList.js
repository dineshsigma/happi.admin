import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TfiLoop } from "react-icons/tfi";
import { setTemplateAddform, get_Recursivetasks } from '../redux/reducers/taskReducer'
import NoDataFound from '../assets/No_Data_File.png'
import { BsFlagFill } from "react-icons/bs";


function ReccuringTaskList() {
    const dispatch = useDispatch()
    const orgId = useSelector((state) => state.auth.current_organization)
    const showTemplateForm = useSelector((state) => state.tasks.showTemplateForm)
    const recurrringTasksList = useSelector((state) => state.tasks.recursiveTaskList)
    const [getRecursivePayload, setGetRecursivePayload] = useState({ task_type: "reccurssive", org_id: orgId })

    useEffect(() => {
        dispatch(get_Recursivetasks(getRecursivePayload))
    }, [])
    return (
        <>
            <div className='row m-4'>
                <div className='text-start mt-2 col-6'>
                    <h4>Reccuring Task</h4>
                </div>
                <div className="col-6 mt-2 text-end">
                    <Button variant="primary" size="md" onClick={() => dispatch(setTemplateAddform(!showTemplateForm))}>
                        Create Reccuring Task
                    </Button>
                </div>
            </div>
            {
                recurrringTasksList?.length > 0 ?
                    recurrringTasksList.map((item) => {
                        return (
                            <div className='row m-4'>
                                <div className='col-md-12'>
                                    <div className="card-grid-item">
                                        <div className='card-gt-body d-flex align-items-center justify-content-between gap_1rm'>
                                            <div className='avatar d-flex align-items-center justify-content-center text-center'>
                                                {item.priority === 'high' &&  <BsFlagFill color='red' />}
                                                {item.priority === 'medium' && <BsFlagFill color='orange' />}
                                                {item.priority === 'low' && <BsFlagFill color='green' />}
                                            </div>
                                            <div className='content d-flex align-items-center justify-content-between '>
                                                <h4>
                                                    {item.name}
                                                </h4> 
                                            </div>
                                        </div>
                                        <div><p><TfiLoop /> &nbsp;&nbsp;
                                            {item.rule_text} (~ approximate)
                                        </p></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : <div className='col-md-12 center text-center'>
                        <img src={NoDataFound} height='500px' />
                    </div>
            }
        </>
    )
};

export default ReccuringTaskList;
