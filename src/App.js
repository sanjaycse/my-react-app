import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GetAllStudents  from './components/GetAllStudents';
import GetStudentById from './components/GetStudentById';
import UpdateStudentbyId from './components/UpdateStudentbyId';
import AddStudent from './components/AddStudent';
import Login from './components/Login';
import { useEffect } from 'react';
import Nav from './components/Nav';
import PrivateRoute from './routes/PrivateRoute';
import routeOptions from "./routes/routes";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appAction from "../src/redux/actions/app-action";

function App(props) {
  const isAuthenticated = props.loadUserData();
  useEffect(() => {
    
  }, []
  );
  return (
    <>
    <Router>
      <Nav />
      <br />
      <div className='container'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<GetAllStudents />} />
          <Route path="/student" element={<GetStudentById />} />
          <Route path="/update" element={<UpdateStudentbyId />} />
          <Route path="/signup" element={<AddStudent />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

function mapStateToProps(state) {
  return {

  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
      { ...appAction },
      dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
