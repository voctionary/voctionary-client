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
} from './PageStatusCodeElements';

export default function PageStatusCode(props) {

    useEffect(() => {
        props.handleLoadingScreen(false);
        document.title = "Voctionary | Error";

        return () => {
            props.handleError(false);
            props.handleLoadingScreen(true);
        };
    }, []);

    return (

        <Div>
            <Main>
                <MainHeader>
                    <MainHeaderH1>{props.error.httpStatusCode}</MainHeaderH1>
                </MainHeader>
                <MainH2>{props.error.httpStatus}</MainH2>
                <MainP>{props.error.text}</MainP>
                {props.error.isReturn ?
                    <BtnDiv>
                        <BtnLink to={props.error.returnPath}>{props.error.returnName}</BtnLink>
                    </BtnDiv> : ''
                }
            </Main>
        </Div>

    );
}


