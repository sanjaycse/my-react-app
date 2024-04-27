import React, { useEffect, useState } from 'react'
import * as appAction from "../redux/actions/app-action";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Input, Spin} from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if(authToken){
      navigate('/')
    }
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  

  const onFinish = (values) => {
    setLoading(true);
    // Determine if the input is a username or a phone number
    const isPhone = /^\d+$/.test(values.username);
    const loginData = {
      [isPhone ? 'phone' : 'username']: values.username,
      password: values.password
    };
  
    props.login(loginData).then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("authToken", response.data.authToken);
      props.loadUserData(JSON.stringify(response.data.user));
      setLoading(false);
      navigate('/');
    }).catch((err) =>{
      setError(err);
      setLoading(false);
    });
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
    <Spin spinning={loading} tip="Loading...">
      <h2 className='text-center my-5'>Login</h2>

        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, margin: 'auto' }}
            // initialValues={student}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            label="Username or Phone"
            name="username"
            rules={[{ required: true, message: 'Please input your Username or Phone!' }]}
            >
                <Input />
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

        <Link style={{ marginLeft: '40%'}} to={`/signup`}>If you dont have Account, Please click this link?</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);