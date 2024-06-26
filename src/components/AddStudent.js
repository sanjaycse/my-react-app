import React, { useEffect, useState } from 'react'
import * as appAction from "../redux/actions/app-action";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Input, InputNumber, Select, Spin, Switch, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const AddStudent = (props) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    props.getAllCategories().then((response) => {
        setCategory(response.data);
        setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setError(err);
      setLoading(false);
    });
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const authToken = localStorage.getItem("authToken");
  if(authToken){
    navigate('/')
  }

  const onFinish = (values) => {
    setLoading(true);
    props.addStudent(values).then((response) => {
        setStudent(response.data);
        message.success('Accout for this student created successfully');
        setLoading(false);
        navigate('/login');
    }).catch((err) =>{
        setError(err);
        message.error(err);
        setLoading(false);
    })

  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Spin spinning={loading} tip="Loading...">
        <h2 className='text-center my-5'>Signup or Add New Student</h2>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, margin:'auto' }}
            initialValues={student}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
            label="Phone"
            name="phone"
            min='10'
            rules={[{ required: true, message: 'Please input your phone!' }]}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item
            label="Is Enrolled"
            name="isEnrolled"
            >
                <Switch />
            </Form.Item>

            <Form.Item
                label="Category"
                name="categoryId"
                initialValue={student?.category?._id}
                rules={[{ required: true, message: 'Please select Category!' }]}
            >
                <Select mode="multiple">
                    {category && category.length > 0 &&
                        category.map(function (item) {
                            return (
                                <Select.Option key={item._id} value={item._id}>
                                    {item.name}
                                </Select.Option>
                            );
                        })
                    }
                </Select>
            </Form.Item>


            <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input Password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
        </Form>
      </Spin>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddStudent);