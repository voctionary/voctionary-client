import React from 'react';
import { FaBars } from 'react-icons/fa';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
  NavUser,
  UserName,
  UserIcon,
  ProfileLink
} from './NavbarElements';



const Navbar = (props) => {

  return (
    <>
      <Nav>
        <NavbarContainer>
          {props.isAuthorized ?
            <>
              <NavLogo to={props.wordId ? '/word/' + props.wordId : '/'}>Voctionary</NavLogo>
              <MobileIcon onClick={props.toggle}>
                <FaBars />
              </MobileIcon>
              <NavMenu>
                <NavItem>
                  <NavLinks to={props.wordId ? '/word/' + props.wordId : '/'}>Dictionary</NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks to='/list'>List</NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks to='/test'>Test</NavLinks>
                </NavItem>
              </NavMenu>
              <NavUser>
                <ProfileLink to='/profile'>
                  <UserIcon style={{ marginRight: '7px', color: 'white', fontSize: 40 }} />
                  <UserName variant="subtitle1" sx={{ color: 'white', fontSize: 20 }}>{props.userInfo.name}</UserName>
                </ProfileLink>
              </NavUser>
            </> :
            <>
              <NavLogo to={props.wordId ? '/word/' + props.wordId : '/'}>Voctionary</NavLogo>
              <MobileIcon onClick={props.toggle}>
                <FaBars />
              </MobileIcon>
              <NavMenu>
                <NavItem>
                  <NavLinks to={props.wordId ? '/word/' + props.wordId : '/'}>Dictionary</NavLinks>
                </NavItem>
              </NavMenu>
              <NavBtn>
                <NavBtnLink to='/signIn'>Sign In</NavBtnLink>
              </NavBtn>
            </>
          }
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
