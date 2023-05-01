import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';

import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  Container,
  Typography,
  Box,
  Grid,
  Checkbox,
  FormControlLabel,
  Avatar
} from '@mui/material/';

import {
  Visibility,
  VisibilityOff,
  LockOutlined
} from '@mui/icons-material/';

import {
  MyButton, MyLink, MyFormControl
} from '../SignInSection/SignInElements';

import { SERVER_URL } from "../../server";

export default function SignInSection(props) {
  var email = undefined;
  var password = undefined;
  var rememberMe = "false";

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //handlers
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => { event.preventDefault() };
  const handleCheckbox = (event) => { rememberMe = event.target.checked ? 'true' : 'false' };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    email = data.get('email');
    if (!email) {
      props.handleMessage(true, 'Email is not filled');
      return;
    }
    if (!email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
      props.handleMessage(true, 'Wrong email format');
      return;
    }
    password = data.get('password');
    if (!password) {
      props.handleMessage(true, 'Password is not filled');
      return;
    }
    if (password.length < 6) {
      props.handleMessage(true, 'Password must contain 6 chars min');
      return;
    }
    if (password.length > 20) {
      props.handleMessage(true, 'Password must contain 20 chars max');
      return;
    }
    postRequest();
  };

  // api request
  const postRequest = () => {
    props.handleLoadingScreen(true);
    var data = qs.stringify({
      'email': email,
      'password': password,
      'rememberMe': rememberMe
    });
    var config = {
      method: 'post',
      url: SERVER_URL + '/api/logIn',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data,
      withCredentials: true,
    };
    axios(config)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          props.fetchUserInfo();
          navigate(props.wordId ? "/word/" + props.wordId : "/");
        }
        else {
          props.handleException(undefined);
        }
      })
      .catch(error => {
        props.handleLoadingScreen(false);
        console.log(error);
        props.handleException(error.response.data);
      });
  };

  //useEffect
  useEffect(() => {
    props.handleLoadingScreen(false);
    document.title = "Voctionary | Sign In";

    return () => {
      props.handleLoadingScreen(true);
      props.handleMessage(false);
    };
  }, []);


  return (
    <div style={{width: '100%'}}>
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: '#01bf71', width: 60, height: 60 }}>
          <LockOutlined sx={{ fontSize: '45px' }} />
        </Avatar>
        <Typography component="h1" variant="h5">Sign in</Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '400px', mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MyFormControl fullWidth>
                <InputLabel>Email Address</InputLabel>
                <OutlinedInput id="email" name="email" label="Email Address" autoFocus />
              </MyFormControl>
            </Grid>
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
              <FormControl fullWidth>
                <FormControlLabel control={<Checkbox value="remember" sx={{ '&.Mui-checked': { color: '#01bf71' } }} />} label="Remember me" onChange={handleCheckbox} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ alignItems: 'center' }}>
                <MyButton type="submit" sx={{ width: '200px' }}>Sign In</MyButton>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Grid container sx={{ mt: 3, maxWidth: '400px' }}>
          <Grid item xs={6}>
            <MyLink to="/resetPassword">Forgot password?</MyLink>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            <MyLink to="/signUp">Don't have an account?</MyLink>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}