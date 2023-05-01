import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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


export default function SignUpSection(props) {
  var user = {
    name: undefined,
    surname: undefined,
    email: undefined,
    password: undefined,
    receivingEmails: undefined
  }

  const [showPassword, setShowPassword] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  //handlers
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => { event.preventDefault() };
  const handleClick = (where) => { navigate(where) };


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    user.name = data.get('firstName');
    if (!user.name) {
      props.handleMessage(true, 'First name is not filled');
      return;
    }
    user.surname = data.get('lastName');
    if (!user.surname) {
      props.handleMessage(true, 'Last name is not filled');
      return;
    }
    user.email = data.get('email');
    if (!user.email) {
      props.handleMessage(true, 'Email is not filled');
      return;
    }
    user.password = data.get('password');
    if (!user.password) {
      props.handleMessage(true, 'Password is not filled');
      return;
    }
    if (!data.get('confirmPassword')) {
      props.handleMessage(true, 'Confirm password is not filled');
      return;
    }
    if (!user.email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
      props.handleMessage(true, 'Wrong email format');
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

    user.receivingEmails = Boolean(data.get('receivingEmails'));

    props.handleLoadingScreen(true);
    postRequest();
    props.handleLoadingScreen(false);
  }

  //api request
  const postRequest = () => {
    axios.post(SERVER_URL + "/api/register", user).then(res => {
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
    document.title = "Voctionary | Sign Up";

    return () => {
      props.handleMessage(false);
      props.handleLoadingScreen(true);
    };
  }, []);

  return (
    <div style={{ width: '100%' }}>
      {!isEmailSent ?
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: '#01bf71', width: 60, height: 60 }}>
            <LockOutlined sx={{ fontSize: '45px' }} />
          </Avatar>
          <Typography component="h1" variant="h5">Sign up</Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '400px', mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MyFormControl fullWidth>
                  <InputLabel>First Name</InputLabel>
                  <OutlinedInput id="firstName" name="firstName" label="First Name" autoFocus />
                </MyFormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyFormControl fullWidth>
                  <InputLabel>Last Name</InputLabel>
                  <OutlinedInput id="lastName" name="lastName" label="Last Name" />
                </MyFormControl>
              </Grid>
              <Grid item xs={12}>
                <MyFormControl fullWidth>
                  <InputLabel>Email Address</InputLabel>
                  <OutlinedInput id="email" name="email" label="Email Address" />
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
                <FormControlLabel fullWidth control={<Checkbox id="receivingEmails" name="receivingEmails" sx={{ '&.Mui-checked': { color: '#01bf71', } }} />} label="I want to receive inspiration, marketing promotions and updates via email." />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ alignItems: 'center' }}>
                  <MyButton type="submit" sx={{ width: '200px' }}>Sign Up</MyButton>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Grid container sx={{ mt: 3, maxWidth: '400px' }}>
            <Grid item xs={12} sx={{ textAlign: 'right' }}>
              <MyLink to="/signIn">Already have an account?</MyLink>
            </Grid>
          </Grid>
        </Box>
        :
        <div style={{ position: 'fixed', width: '100%', top: '30%' }}>
          <div style={{ maxWidth: '800px', margin: 'auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: '50px', fontWeight: '900', textShadow: '2px 2px 0px #01bf71', textTransform: 'uppercase' }}>Just One More Step</h1>
            <h2 style={{ fontSize: '25px', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1.6px' }}>You Have Successfully Requested For Register</h2>
            <p style={{ color: '#000', marginTop: '20px' }}>Now just follow the instructions sent to your email</p>
            <MyButton sx={{ width: '150px', mt: 4 }} onClick={() => handleClick("/signIn")}>Sign In</MyButton>
          </div>
        </div>
      }
    </div>
  );
}