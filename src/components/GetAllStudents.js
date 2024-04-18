import React, { useEffect, useState } from 'react';
import * as appAction from "../redux/actions/app-action";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from "antd" ;

const GetAllStudents = (props) => {
  console.log(props)
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    props.getAllStudents()
      .then((response) => {
        setStudents(response.data);
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

  const handleDelete = (id) => {
    setLoading(true);
    props.deleteStudentbyId(id).then((response)=>{
      setStudents(response.data)
      setLoading(false);
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div>
      <Link to={'/add'}>Add a Student</Link>
      <br />
      Number of students: {students.length}
      {students && (
        <ul>
          {students.map((item) => (
            <li key={item._id}>{item.name} <Link to={`/student?id=`+ item._id}>Student Details</Link> | <Link to={`/update?id=`+ item._id}>Update Student Details</Link> | <Button onClick={() => handleDelete(item._id)}>Delete</Button></li>
          ))}
        </ul>
      )}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GetAllStudents);
