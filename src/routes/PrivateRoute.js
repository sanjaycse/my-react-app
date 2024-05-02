import React from 'react';
import { connect } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as appAction from "../redux/actions/app-action";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const authToken = localStorage.getItem('authToken'); 
  console.log(authToken)// Example: Check if user is logged in from local storage

  return (
    <Route
      {...rest}
      element={authToken ? <Element /> : <Navigate to="/login" />}
    />
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
