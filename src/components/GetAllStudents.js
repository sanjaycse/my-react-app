import React, { useEffect, useState } from 'react';
import * as appAction from "../redux/actions/app-action";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from "antd" ;
import { useNavigate } from 'react-router-dom';

const GetAllStudents = (props) => {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const authToken = localStorage.getItem("authToken");
  if(!authToken){
    navigate('/login')
  }

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

  const handleLogout = ()=> {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    navigate('/login')
  }

  return (
    <div>
      Number of students: {students.length}
      {students && (
        <ul>
          {students.map((item) => (
            <li key={item._id}>{item.name} <Link to={`/student?id=`+ item._id}>Student Details</Link> | <Link to={`/update?id=`+ item._id}>Update Student Details</Link> | <Button onClick={() => handleDelete(item._id)}>Delete</Button></li>
          ))}
        </ul>
      )}

      <Button onClick={handleLogout}>Logout</Button>
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
