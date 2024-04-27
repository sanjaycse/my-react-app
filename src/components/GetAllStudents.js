import React, { useEffect, useState } from 'react';
import * as appAction from "../redux/actions/app-action";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Space, Table, Tag } from "antd" ;
import { useNavigate } from 'react-router-dom';

const GetAllStudents = (props) => {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if(!authToken){
      navigate('/login')
    }else{
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
    }
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (text, record)=>(
        <>
          <Tag>
            {record.category.name}
          </Tag>
        </>
      )
    },
    {
      title: 'Action',
      render: (text, record)=>(
        <>
          <Space>
            <Button onClick={() => handleUpdate(record._id)}>Update Details</Button>
            <Button onClick={() => handleDelete(record._id)}>Delete</Button>
          </Space>
        </>
      )
    },
  ];

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

  const handleUpdate = (id) =>{
    navigate(`/update?id=`+ id)
  }

  return (
    <>
      <Table dataSource={students} columns={columns} />
    </>
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
