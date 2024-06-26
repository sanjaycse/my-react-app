import React, { useEffect, useState } from 'react';
import * as appAction from "../redux/actions/app-action";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Drawer, Space, Spin, Table, Tag, message } from "antd" ;
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

const GetAllStudents = (props) => {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(props)
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
      render: (categories) => (
        <span>
          {categories.map(category => (
            <Tag key={category._id}>{category.name}</Tag>
          ))}
        </span>
      ),
    },
    {
      title: 'Action',
      render: (text, record)=>(
        <>
          <Space>
            <EyeOutlined onClick={() => handleDrawer(record._id)} />
            <EditOutlined onClick={() => handleUpdate(record._id)} />
            <DeleteOutlined onClick={() => handleDelete(record._id)} />
          </Space>
        </>
      )
    },
  ];

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleDelete = (id) => {
    setLoading(true);
    const userLocal = JSON.parse(localStorage.getItem("user"))
    if(userLocal.id == id){
      message.error("This user is currently Logedin. So you can't delete this user.");
      setLoading(false);
    }else{
      props.deleteStudentbyId(id).then((response)=>{
        setStudents(response.data)
        setLoading(false);
        message.success('Student deleted successfully');
      }).catch((err)=>{
        console.log(err)
      })
    }
  }

  const handleUpdate = (id) =>{
    navigate(`/update?id=`+ id)
  }

  const handleDrawer = (id) =>{
    setLoading(true);
    props.getStudentById(id).then((response)=>{
      setOpen(true);
      setStudentData(response.data)
      setLoading(false);
    }).catch((err)=>{
      console.log(err)
    })
  }
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Spin spinning={loading} tip="Loading...">
        <Table dataSource={students} columns={columns} />

        <Drawer title='Student Details' onClose={onClose} open={open} width={800}>
          <div>
            <p>Name: {studentData?.name}</p>
            <p>Phone: {studentData?.phone}</p>
            <p>Username: {studentData?.username}</p>
            <p>Category:
              <span style={{marginLeft: '10px'}}>
              {
                studentData?.category?.map((category) => (
                  <Tag style={{marginBottom : '5px'}}>{category.name}</Tag>
                ))
              }
              </span> 
            </p>
            <p>Is Enrolled: {studentData?.isEnrolled ? 'Yes' : 'No'}</p>
          </div>
        </Drawer>
      </Spin>
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
