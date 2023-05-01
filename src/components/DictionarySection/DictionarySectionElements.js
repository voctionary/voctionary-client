import {
    FormControl,
    Stack,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    Grid,
    Paper,
    Typography
} from '@mui/material/';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Flags from 'country-flag-icons/react/3x2'

export const SearchStack = styled(Stack)`
    max-width: 440px;
    margin: 35px auto 0 auto;
    position: relative;
    background: white;
`;

export const SearchForm = styled.form`
`;

export const SearchFormStack = styled(Stack)`
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 10px;
`;

export const LanguageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px auto 5px auto;
`;

export const Language = styled(FormControl)`
    & label {
        color: #777;
        transition: none;
    }
    &:hover {
        & label {
            color: #01bf71;
        }
    }
    & label.Mui-focused {
        color: #01bf71;
    }

    & .MuiOutlinedInput-root {
        color: #777;
        & fieldset {
            border-color: #777;
        }
        & svg {
            color: #777;
        }

        &:hover{
            color: #01bf71;
            & fieldset {
                border-color: #01bf71;
            }
            & svg {
                color: #01bf71;
            }
        }

        &.Mui-focused {
            color: #01bf71;
        }
        &.Mui-focused fieldset {
            border-color: #01bf71;
        }
        &.Mui-focused svg {
            color: #01bf71;
        }
    }
`;

export const LanguageLabel = styled(InputLabel)`
`;

export const LanguageSelect = styled(Select)`
    min-width: 150px;
`;

export const LanguageSelectItem = styled(MenuItem)`
`;

export const WordWrapper = styled.div`
    margin: 5px 10px 0 10px;
`;

export const Word = styled(TextField)`
    transition: 1s ease-in-out;

    & label {
        color: #777;
        transition: none;
    }
    &:hover {
        & label {
            color: #01bf71;
        }
    }
    & label.Mui-focused {
        color: #01bf71;
    }

    & .MuiOutlinedInput-root {
        & fieldset {
            border-color: #777;
        }
        & input {
            color: #777;
        }
        & svg {
            color: #777;
        }

        &:hover{
            & fieldset {
                border-color: #01bf71;
            }
            & input {
                color: #01bf71;
            }
            & svg {
                color: #01bf71;
            }
        }

        &.Mui-focused fieldset {
            border-color: #01bf71;
        }
        &.Mui-focused input {
            color: #01bf71;
        }
        &.Mui-focused svg {
            color: #01bf71;
        }
    }

`;

export const Autocomplete = styled.div`
    max-width: 410px;
    max-height: 280px;
    margin: 0 auto;
    background: #eee;
    border-radius: 10px;
`;

export const AutocompleteTypography = styled(Typography)`
    color: black;
`;


export const AutocompleteItem = styled.li`
    list-style: none;
    padding: 8px 20px;
    width: 100%;
    cursor: pointer;

    &:hover{
        background: #505050;
        border-radius: 10px;

        ${AutocompleteTypography}{
            color: white;
        }
    }
`;


export const FocusedWordWrapper = styled.div`
    top: 345px;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    z-index: -1;
    width: 100%;
`;

export const GridContainer = styled(Grid)`

`;

export const GridItem = styled(Grid)`

`;

export const GridMainPaper = styled(Paper)`
    width: 80%;
    max-width: 800px;
    padding: 15px 30px 10px 30px;
`;

export const GridSensePaper = styled(Paper)`
    margin: 10px 0 20px 0;
    padding: 0 0 10px 0;
`;

export const WrapperIconText = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

export const SenseTypography = styled(Typography)`
    background: #eee;
    width: fit-content;
    padding: 5px 10px;
`;

export const SenseTranslatedTypography = styled(Typography)`
    display: inline;
`;

export const ExampleTypography = styled(Typography)`
`;

export const ExampleTranslatedTypography = styled(Typography)`
`;

export const FlagUK = styled(Flags.GB)`
    width: 22px;
    height: 14px;
`;

export const Btn = styled.button`
  border-radius: 50px;
  background: #01bf71;
  white-space: nowrap;
  padding: 7px 14px;
  color: white;
  font-size: 14px;
  outline: none;
  border: 2px solid #01bf71;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;


  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #01bf71;
  }
`;

export const BtnLink = styled(Link)`
  border-radius: 50px;
  background: #01bf71;
  white-space: nowrap;
  padding: 7px 14px;
  color: white;
  font-size: 14px;
  outline: none;
  border: 2px solid #01bf71;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;


  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #01bf71;
  }
`;