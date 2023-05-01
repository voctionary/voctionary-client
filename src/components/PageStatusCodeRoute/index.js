import React, { useEffect } from 'react';
import {
    Div,
    Main,
    MainHeader,
    MainHeaderH1,
    MainH2,
    MainP,
    BtnDiv,
    BtnLink
} from '../PageStatusCode/PageStatusCodeElements';

const httpStatusCode403 = {
    httpStatusCode: 403,
    httpStatus: "Forbidden",
    text: "You are not authorized to access the page",
    isReturn: true,
    returnPath: "/signIn",
    returnName: "Sign In"
}

const httpStatusCode404 = {
    httpStatusCode: 404,
    httpStatus: "Not Found",
    text: "The page you are looking for does not exist",
    isReturn: true,
    returnPath: "/",
    returnName: "Home"
}

function sleep(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {}
  }

export default function PageStatusCodeRoute(props) {
    var codeToRender;
    if(props.code === 403){
        codeToRender = httpStatusCode403;
    }
    else{
        codeToRender = httpStatusCode404;
    }

    const handleButton = () => {
        props.handleError(false);
        props.handleLoadingScreen(true);
    };

    useEffect(() => {
        props.handleNavbar(false);
        props.handleLoadingScreen(false);
        document.title = "Voctionary | Error";
        
        return () => {
            props.handleLoadingScreen(true);
            props.handleNavbar(true);
        };
    }, []);

    return (

        <Div>
            <Main>
                <MainHeader>
                    <MainHeaderH1>{codeToRender.httpStatusCode}</MainHeaderH1>
                </MainHeader>
                <MainH2>{codeToRender.httpStatus}</MainH2>
                <MainP>{codeToRender.text}</MainP>
                {codeToRender.isReturn ?
                    <BtnDiv>
                        <BtnLink to={codeToRender.returnPath} onClick={handleButton}>{codeToRender.returnName}</BtnLink>
                    </BtnDiv> : ''
                }
            </Main>
        </Div>

    );
}


