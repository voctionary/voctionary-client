import React from 'react';
import {
    MessageDiv
} from './MessageElements';


export default function Message(props) {
    return (
        <MessageDiv borderColor={props.borderColor} style={{ animationDuration: props.duration + 's' }}>
            <p>{props.message}</p>
        </MessageDiv>
    );
}