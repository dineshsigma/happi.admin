import { useDispatch } from "react-redux";
import {logOut } from '../redux/reducers/authReducer'
import { useNavigate } from "react-router-dom";


const Analytics = () => {
  //console.log('++++++++++++++++++++++++++++++++ This is Analytics Page ++++++++++++++++++++++++')
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userLogin = (event) => {
    dispatch(logOut())
    navigate('/')
  }
  
  

  return (
    <div>
      <div className="title"> Analytics</div>
      <button onClick={userLogin}>Logout</button>
    </div>
  );
  
};

export default Analytics;
