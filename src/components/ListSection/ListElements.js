import {
    Grid,
    Paper,
    Typography,
    Divider,
    Switch,
    Tooltip 
} from '@mui/material/';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

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

export const ListsDiv = styled.div`
    width: 80%;
    max-width: 800px;
`;

export const GridContainerList = styled(Grid)`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const GridItemList = styled(Grid)`
    display: flex;
    justify-content: center;
`;

export const ListTypography = styled(Typography)`
`;

export const ListPaper = styled(Paper)`
    padding: 10px 20px;
    margin: 10px;
    transition: all .2s;
    cursor: pointer;

    &:hover {
        color: #01bf71;
        transform: scale(1.1);
        box-shadow: 0px 2px 1px -1px #01bf71, 
            0px 1px 1px 0px #01bf71, 
            0px 1px 3px 0px #01bf71;
        transition: all .2s;
  }

  &.focusedList{
    color: #01bf71;
    transform: scale(1.1);
    box-shadow: 0px 2px 1px -1px #01bf71, 
            0px 1px 1px 0px #01bf71, 
            0px 1px 3px 0px #01bf71;
    transition: all .2s;
  }
`;

export const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const FocusedListPaper = styled(Paper)`
    width: 100%;
`;

export const FocusedListWord = styled(NavLink)`
    color: #000;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
    cursor: pointer;
    text-decoration: none;
    justify-content: space-between;

    &:hover {
        background: #505050;
        border-radius: 10px;

        ${ListTypography}{
            color: white;
        }
    }
    @media screen and (max-width: 700px) {
        height: 80px;
    }
`;

export const WordDivider = styled(Divider)`
`;

export const Btn = styled.button`
  border-radius: 50px;
  background: #01bf71;
  white-space: nowrap;
  padding: 4px 10px;
  color: white;
  font-size: 13px;
  outline: none;
  border: 2px solid #01bf71;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-right: 0;


  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #01bf71;
  }
`;

/*
export const ListSwitch = styled(Switch)`
  &.MuiSwitch-root {
    color: green;
  }
`;*/

export const ListSwitch = withStyles({
    switchBase: {
      color: "#757575",
      '&$checked': {
        color: "#4caf50",
      },
      '&$checked + $track': {
        backgroundColor: "#4caf50",
      },
    },
    checked: {},
    track: {},
  })(Switch);

export const SwitchTooltip = styled(Tooltip)`
`;