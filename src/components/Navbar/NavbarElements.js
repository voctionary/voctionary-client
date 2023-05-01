import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';

export const Nav = styled.nav`
  background: #000;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px){
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`;

export const NavLogo = styled(NavLink)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: #01bf71;
    transition: 0.2s ease-in-out;
  }
`;

export const MobileIcon = styled.div`
  display: none;

  &:hover {
    color: #01bf71;
    transition: 0.2s ease-in-out;
  }

  @media screen and (max-width: 768px){
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media screen and (max-width: 768px){
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;

export const NavLinks = styled(NavLink)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 2rem;
  height: 100%;
  cursor: pointer;
  font-size: 1.1rem;

  &.active {
    border-bottom: 3px solid #01bf71;
    color: #01bf71;
  }

  &:hover {
    color: #01bf71;
    transition: 0.2s ease-in-out;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px){
    display: none;
  }
`;

export const NavBtnLink = styled(NavLink)`
  border-radius: 50px;
  background: #01bf71;
  white-space: nowrap;
  padding: 10px 22px;
  color: #010606;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

export const UserIcon = styled(AccountCircleIcon)`
    margin-right: 7px;
    fill: white;
    font-size: 40;
    transition: 0.2s ease-in-out;
`

export const UserName = styled(Typography)`
    margin-right: 7px;
    color: white;
    font-size: 40;
    transition: 0.2s ease-in-out;
`

export const ProfileLink = styled(NavLink)`
  display: flex;
  align-items: center;
  min-height: inherit;
  text-decoration: none;
  margin: auto;

  &.active {
    border-bottom: 3px solid #01bf71;
    color: #01bf71;
    ${UserIcon} {
      fill: #01bf71;
      transition: 0.2s ease-in-out;
    }
    ${UserName} {
      color: #01bf71;
      transition: 0.2s ease-in-out;
    }
  }
`;

export const NavUser = styled.nav`
  align-self: center;
  min-height: 80px;

  &:hover {
    ${UserIcon} {
      fill: #01bf71;
      transition: 0.2s ease-in-out;
    }
    ${UserName} {
      color: #01bf71;
      transition: 0.2s ease-in-out;
    }
  }

  @media screen and (max-width: 768px){
    display: none;
  }

`;