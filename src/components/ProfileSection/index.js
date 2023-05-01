import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  Tooltip,
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
  AccountCircle
} from '@mui/icons-material/';

import {
  MyButton, MyFormControl
} from '../SignInSection/SignInElements';

import { SERVER_URL } from "../../server";

export default function ProfileSection(props) {
  const user = {
    name: undefined,
    surname: undefined,
    email: undefined,
    password: undefined,
    receivingEmails: undefined
  }

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  //handlers
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => { event.preventDefault() };
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
    user.email = props.userInfo.email;
    user.password = data.get('password');
    user.receivingEmails = Boolean(data.get('receivingEmails'));

    if (user.password.length < 6) {
      props.handleMessage(true, 'Password must contain 6 chars min');
      return;
    }
    if (user.password.length > 20) {
      props.handleMessage(true, 'Password must contain 20 chars max');
      return;
    }

    if(user.name != props.userInfo.name || user.surname != props.userInfo.surname || user.receivingEmails != props.userInfo.receivingEmails || user.password){
      putRequest();
    }
    
  }

  //api request
  const handleLogOut = async () => {
    await axios.get(SERVER_URL + "/api/logOut", { withCredentials: true }).then(res => {
      if (res.status === 200) {
        props.fetchUserInfo();
        navigate(props.wordId ? "/word/" + props.wordId : "/");
      }
      else {
        props.handleException();
      }
    })
      .catch(error => {
        props.handleException(error.response.data);
      });
  }

  const putRequest = () => {
    axios.put(SERVER_URL + "/api/updateUser", user, { withCredentials: true }).then(res => {
      props.handleMessage(true, "Your data are saved");
    })
      .catch(error => {
        props.handleException(error.response.data);
      });
  };


  useEffect(() => {
    console.log(props.userInfo);
    props.handleLoadingScreen(false);
    document.title = "Voctionary | Profile";

    return () => {
      props.handleLoadingScreen(true);
    };
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: '#01bf71', width: 60, height: 60 }}>
          <AccountCircle sx={{ fontSize: '60px' }} />
        </Avatar>
        <Typography component="h1" variant="h5">Profile</Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '400px', mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <MyFormControl fullWidth>
                <InputLabel>First Name</InputLabel>
                <OutlinedInput id="firstName" name="firstName" label="First Name" defaultValue={props.userInfo.name} />
              </MyFormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MyFormControl fullWidth>
                <InputLabel>Last Name</InputLabel>
                <OutlinedInput id="lastName" name="lastName" label="Last Name" defaultValue={props.userInfo.surname} />
              </MyFormControl>
            </Grid>
            <Grid item xs={12}>
            <Tooltip title="The email cannot be changed" placement="top">
              <MyFormControl fullWidth>
                <InputLabel>Email Address</InputLabel>
                <OutlinedInput id="email" name="email" label="Email Address" defaultValue={props.userInfo.email} disabled={true}/>
              </MyFormControl>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Tooltip title="Fill in for changing your password" placement="top">
                <MyFormControl fullWidth>
                  <InputLabel>New Password</InputLabel>
                  <OutlinedInput id="password" name="password" label="New Password" type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                      </InputAdornment>
                    }
                  />
                </MyFormControl>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel fullWidth control={<Checkbox id="receivingEmails" name="receivingEmails" defaultValue={props.userInfo.receivingEmails} defaultChecked={props.userInfo.receivingEmails} sx={{ '&.Mui-checked': { color: '#01bf71' } }} />} label="I want to receive inspiration, marketing promotions and updates via email." />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ alignItems: 'center' }}>
                <MyButton type="submit" sx={{ width: '150px' }}>Save Data</MyButton>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ alignItems: 'center', mt: 2 }}>
                <MyButton sx={{ width: '150px' }} onClick={handleLogOut}>Log Out</MyButton>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>

  );;
}