import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from 'axios';

import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  Typography,
  Box,
  Grid,
  Avatar
} from '@mui/material/';

import {
  Visibility,
  VisibilityOff,
  LockOutlined
} from '@mui/icons-material/';

import {
  MyButton, MyFormControl
} from '../SignInSection/SignInElements';

import { SERVER_URL } from "../../server";

export default function ResetPasswordSection(props) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const isTokenValid = (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i).test(token);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  var user = {
    email: undefined,
    password: undefined
  }

  //handlers
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => { event.preventDefault() };
  const handleClick = (where) => { navigate(where) };

  //handlers
  const handleRequest = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    if (!email) {
      props.handleMessage(true, 'Email is not filled');
      return;
    }
    if (!email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
      props.handleMessage(true, 'Wrong email format');
      return;
    }
    requestResetPassword(email);
  };

  const handleReset = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    user.password = data.get('password');
    if (!user.password) {
      props.handleMessage(true, 'Password is not filled');
      return;
    }
    if (!data.get('confirmPassword')) {
      props.handleMessage(true, 'Confirm password is not filled');
      return;
    }

    if (user.password !== data.get('confirmPassword')) {
      props.handleMessage(true, 'Password are not equal');
      return;
    }

    if (user.password.length < 6) {
      props.handleMessage(true, 'Password must contain 6 chars min');
      return;
    }
    if (user.password.length > 20) {
      props.handleMessage(true, 'Password must contain 20 chars max');
      return;
    }

    user.email = token;
    resetPassword(user);
  }

  //api request
  const requestResetPassword = (email) => {
    axios.put(SERVER_URL + "/api/requestResetPassword", null, { params: { email: email } }).then(res => {
      if (res.status === 200) {
        setIsRequested(true);
      }
      else {
        props.handleException(undefined);
      }
    })
      .catch(error => {
        props.handleException(error.response.data);
      });
  };

  const resetPassword = (user) => {
    axios.put(SERVER_URL + "/api/resetPassword", user).then(res => {
      if (res.status === 200) {
        setIsEmailSent(true);
      }
      else {
        props.handleException(undefined);
      }
    })
      .catch(error => {
        props.handleException(error.response.data);
      });
  };


  //useEffect
  useEffect(() => {
    props.handleLoadingScreen(false);
    document.title = "Voctionary | Reset Password";

    return () => {
      props.handleLoadingScreen(true);
      props.handleMessage(false);
    };
  }, []);


  return (
    <div style={{width: '100%'}}>
      {!isTokenValid ?
        <>
          {!isRequested ?
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ m: 1, bgcolor: '#01bf71', width: 60, height: 60 }}>
                <LockOutlined sx={{ fontSize: '45px' }} />
              </Avatar>
              <Typography component="h1" variant="h5">Request password reset</Typography>
              <Box component="form" noValidate onSubmit={handleRequest} sx={{ width: '400px', mt: 2 }}>
                <MyFormControl fullWidth>
                  <InputLabel>Email Address</InputLabel>
                  <OutlinedInput id="email" name="email" label="Email Address" autoFocus />
                </MyFormControl>
                <FormControl fullWidth sx={{ alignItems: 'center', mt: 3 }}>
                  <MyButton type="submit" sx={{ width: '200px' }}>Request reset</MyButton>
                </FormControl>
              </Box>
            </Box>
            :
            <div style={{ position: 'fixed', width: '100%', top: '30%' }}>
              <div style={{ maxWidth: '800px', margin: 'auto', textAlign: 'center' }}>
                <h1 style={{ fontSize: '50px', fontWeight: '900', textShadow: '2px 2px 0px #01bf71', textTransform: 'uppercase' }}>Just One More Step</h1>
                <h2 style={{ fontSize: '25px', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1.6px' }}>You Have Successfully Requested For Reset</h2>
                <p style={{ color: '#000', marginTop: '20px' }}>Now just follow the instructions sent to your email</p>
                <MyButton sx={{ width: '150px', mt: 4 }} onClick={() => handleClick(props.wordId ? "/word/" + props.wordId : "/")}>Home</MyButton>
              </div>
            </div>
          }
        </>
        :
        <>
          {!isEmailSent ?
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ m: 1, bgcolor: '#01bf71', width: 60, height: 60 }}>
                <LockOutlined sx={{ fontSize: '45px' }} />
              </Avatar>
              <Typography component="h1" variant="h5">Reset password</Typography>
              <Box component="form" noValidate onSubmit={handleReset} sx={{ width: '400px', mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MyFormControl fullWidth>
                      <InputLabel>Password</InputLabel>
                      <OutlinedInput id="password" name="password" label="Password" type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                          </InputAdornment>
                        }
                      />
                    </MyFormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <MyFormControl fullWidth>
                      <InputLabel>Confirm Password</InputLabel>
                      <OutlinedInput id="confirmPassword" name="confirmPassword" label="Confirm Password" type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                          </InputAdornment>
                        }
                      />
                    </MyFormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ alignItems: 'center' }}>
                      <MyButton type="submit" sx={{ width: '200px' }}>Reset</MyButton>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            :
            <div style={{ position: 'fixed', width: '100%', top: '30%' }}>
              <div style={{ maxWidth: '800px', margin: 'auto', textAlign: 'center' }}>
                <h1 style={{ fontSize: '50px', fontWeight: '900', textShadow: '2px 2px 0px #01bf71', textTransform: 'uppercase' }}>Great News</h1>
                <h2 style={{ fontSize: '25px', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1.6px' }}>Your Password Has Been Successfully Reset</h2>
                <p style={{ color: '#000', marginTop: '20px' }}>Now you can sign in to continue use Voctionary</p>
                <MyButton sx={{ width: '150px', mt: 4 }} onClick={() => handleClick("/signIn")}>Sign In</MyButton>
              </div>
            </div>
          }
        </>

      }

    </div>
  );
}