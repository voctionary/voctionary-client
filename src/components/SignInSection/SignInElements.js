import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  FormControl,
  Button
} from '@mui/material/';



export const MyButton = styled(Button)`
  && {
    border-radius: 50px;
    background: #01bf71;
    padding: 10px;
    color: white;
    font-size: 18px;
    border: 2px solid #01bf71;

    &:hover {
      transition: all 0.2s ease-in-out;
      background: #fff;
      color:  #01bf71;
    }
  }

`;

export const MyFormControl = styled(FormControl)`
  label {
    color: #bbb;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: #bbb;
    }
    &:hover fieldset {
      border-color: #01bf71;
    }
    &:focus-within fieldset {
      border-color: #01bf71;
    }
  }
  &:hover label {
    color: #01bf71;
  }
  &:focus-within label {
    color: #01bf71;
  }

  .MuiIconButton-root {
    color: #bbb;
    &:hover {
      color: #01bf71;
      background-color: transparent;
    }
    &:focus {
      color: #01bf71;
      background-color: transparent;
    }
  }
`;

export const MyLink = styled(Link)`
  font-size: 15px;
  color: #01bf71;

  &:visited {
    color: #01bf71;
  }

  &:hover {
    font-weight: bold;
  }
`;
