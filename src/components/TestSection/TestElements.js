import styled from  'styled-components';
import {
    Grid,
    Paper,
    Typography,
} from '@mui/material/';

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
    margin: 20px auto;
    z-index: -1;
    width: 100%;
`;

export const TestDiv = styled.div`
    width: 80%;
    max-width: 800px;
`;

export const GridContainerTest = styled(Grid)`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const GridItemTest = styled(Grid)`
    display: flex;
    justify-content: center;
`;

export const TestPaper = styled(Paper)`
    padding: 10px 25px;
    justify-content: center;
`;

export const TestTypography = styled(Typography)`
    display: flex;
    justify-content: center;
    text-align: center;
`;

export const TestOption = styled.div`
    display: flex;
    margin: 15px auto;
    border-radius: 50px;
    border: 2px solid grey;
    cursor: pointer;
    transition: all .2s;

    &:hover{
        transform: scale(1.15);
        border: 2px solid;
        transition: all .2s;
    }

    &.activedOption{        
        &:hover{
            color: #01bf71;
            border: 2px solid #01bf71;
        }
    }

    &.chosenOption{
        transform: scale(1.15);
    }    

    &.correctOption{
        color: #01bf71;
        border: 2px solid #01bf71;
    }

    &.wrongOption{
        color: red;
        border: 2px solid red;
    }
`

export const BtnDiv = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 40px;
    width: 100%;
`

export const Btn = styled.button`
  border-radius: 50px;
  background: #01bf71;
  white-space: nowrap;
  padding: 8px 16px;
  color: white;
  font-size: 15px;
  outline: none;
  border: 2px solid #01bf71;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  width: 150px;

  &:hover{
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #01bf71;
  }
`;