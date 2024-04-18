import React, { useEffect, useState } from 'react'
import * as appAction from "../redux/actions/app-action";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const GetStudentById = (props) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id")
  useEffect(() => {
    props.getStudentById(id)
    .then((response) => {
      setStudent(response.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setError(err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if(!id){
    return <div>Error: 404</div>;
  }
  return (
    <>
      <h2>{student.name} Details</h2>
      <ul>
        <li>Phone: {student.phone}</li>
        <li>Category: {student.category.name}</li>
        <li>Is Enrolled: {student.isEnrolled? 'Yes':'No'}</li>
      </ul>
    </>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(GetStudentById);