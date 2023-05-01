import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from 'axios';

import {
    MyButton
  } from '../SignInSection/SignInElements';

  import { SERVER_URL } from "../../server";

export default function ConfirmEmailSection(props) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");
    const isTokenValid = (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i).test(token);

    const handleConfirmEmail = async () => {
        await axios.post(SERVER_URL + "/api/confirmEmail", null, { params: { token: token } }).then(res => {
            if(res.status !== 200){
                props.handleException();
            }
        })
        .catch( (error) => {
            props.handleException(error.response.data);
        });
    }

    const handleClick = () => { navigate("/")};

    useEffect( () => {
        props.handleLoadingScreen(false);
        if(!isTokenValid){
            navigate("/");
        }
        handleConfirmEmail();
        
        return () => {
            props.handleMessage(false);
            props.handleLoadingScreen(true);
        };
    }, []);

    return (
        <>
            <div style={{position: 'fixed', width: '100%', top: '30%'}}>
                <div style={{maxWidth: '800px', margin: 'auto', textAlign: 'center'}}>
                    <h1 style={{fontSize: '50px', fontWeight: '900', textShadow: '2px 2px 0px #01bf71', textTransform: 'uppercase'}}>Welcome To Voctionary</h1>
                    <h2 style={{fontSize: '25px', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1.6px'}}>Your Email Has Been Successfully Confirmed</h2>
                    <p style={{color: '#000', marginTop: '20px'}}>Now you can sign in to continue use Voctionary</p>
                    <MyButton sx={{width: '150px', mt: 4}} onClick={() => handleClick}>Home</MyButton>
                </div>
            </div>
        </>
    );
}