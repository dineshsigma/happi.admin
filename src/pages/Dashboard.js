import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setActiveSubMenu, setHeader} from '../redux/reducers/authReducer';

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeader("Dash Board"));
  }, [])
  //console.log('++++++++++++++++++++++++++++++++ This is Dashboard Page ++++++++++++++++++++++++')
  useEffect(() => {
    
  })
  const accessToken = useSelector((state)=> state.auth.accessToken)
  return (
    // <div className="title">dashboard</div>
    <div>
      
    </div>
  )
};

export default Dashboard;
