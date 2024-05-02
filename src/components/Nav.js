import { Button, Space, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from "../redux/actions/app-action";
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Nav = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    props.loadUserData()
  }, [location.pathname]);

  const handleLogout = ()=> {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    message.info('Logout successfully');
    navigate('/login');
  }
  return (
    
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
            <Link className="navbar-brand" to="/">Learning</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/">Add Student</Link>
                </li> */}
                </ul>
                
                {props.loadUserData()?.payload ? (
                  <Space>
                      <h5 style={{color:'white'}}>Welcome {props.loadUserData()?.payload?.name}</h5>
                      <Button onClick={handleLogout}>Logout</Button>
                  </Space>
                ) : (
                  <Space>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/signup'}>Sign Up</Link>
                  </Space>
                )}
            </div>
            </div>
        </nav>
    </>
  )
}

function mapStateToProps(state) {
  return {
    userData: state.userReducer
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
      { ...appAction },
      dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);