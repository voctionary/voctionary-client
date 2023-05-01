import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Div = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 20%;
`

export const Main = styled.div`
    max-width: 520px;
    margin: auto;
    text-align: center;
`

export const MainHeader = styled.div`
    height: 210px;
    line-height: 210px;
`

export const MainHeaderH1 = styled.h1`
    font-size: 188px;
    font-weight: 700;
    margin: 0px;
    text-shadow: 4px 4px 0px #01bf71;
`

export const MainH2 = styled.h2`
    font-size: 42px;
    font-weight: 700;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1.6px;
`

export const MainP = styled.p`
    color: #000;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 25px;
`

export const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const BtnLink = styled(Link)`
  border-radius: 50px;
  background: #01bf71;
  white-space: nowrap;
  padding: 10px 22px;
  color: white;
  font-size: 16px;
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