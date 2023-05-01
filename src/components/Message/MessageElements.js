import styled, { keyframes, css } from 'styled-components';

const fade = keyframes`
  0% { 
    opacity: 0;
  }
  10% { 
    opacity: 1;
  }
  90% { 
    opacity: 1;
  }
  100% { 
    opacity: 0;
  }
`;

export const MessageDiv = styled.div`
    position: fixed;
    top: 95px;
    right: 15px;
    padding: 10px;
    min-width: 200px;
    max-width: 40vw;
    font-size: 0.9rem;
    font-weight: bold;
    opacity: 0;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 2px ${(props) => props.borderColor};
    animation-name: ${fade};
    animation-iteration-count: 1;
    background-color: white;
`;