import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Approutes from './approutes/Approutes'
import CreateTaskComponent from './components/CreateTaskComponent';
import Button from 'react-bootstrap/Button';
import { FaPlus } from "react-icons/fa";
import { useDispatch} from 'react-redux';
import {setTaskAddform} from './redux/reducers/taskReducer'
import CreateTemplateTask from './components/CreateTemplateTask'
import { ToastContainer } from 'react-toastify';

function App() {
  //console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ App Loading')
  const accessToken = useSelector((state) => state.auth.accessToken)
  const showAddform = useSelector((state) => state.tasks.showTask)
  const showTemplateAddform = useSelector((state) => state.tasks.showTemplateForm)
  const dispatch = useDispatch()

  // const accessToken = localStorage.getItem('token')
  //console.log('login', accessToken)
  return (
    <BrowserRouter>
          <ToastContainer />
        <div>
          <Approutes />
          {
            showAddform && <CreateTaskComponent />
          }
          {
            showTemplateAddform && <CreateTemplateTask />
          }
          {/* {accessToken &&
            <Button variant="primary" className="fab-btn"  onClick={() => dispatch(setTaskAddform(!showAddform))} ><FaPlus/></Button>
          } */}
        </div>
    </BrowserRouter>


  );
}

export default App;
