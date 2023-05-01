import React from 'react';
import {
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SideBtnWrap,
    SidebarRoute,
    SideUser,
    UserName,
    UserIcon,
    ProfileLink
} from './SidebarElements'

const Sidebar = (props) => {

    return (
        <SidebarContainer isOpen={props.isOpen} onClick={props.toggle}>
            <Icon onClick={props.toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                {props.isAuthorized ?
                    <>
                        <SidebarMenu>
                            <SidebarLink to={props.wordId ? '/word/' + props.wordId : '/'} onClick={props.toggle}>
                                Dictionary
                            </SidebarLink>
                            <SidebarLink to='/lists' onClick={props.toggle}>
                                List
                            </SidebarLink>
                            <SidebarLink to='/test' onClick={props.toggle}>
                                Test
                            </SidebarLink>
                        </SidebarMenu>
                        <SideUser>
                            <ProfileLink to='/profile'>
                                <UserIcon style={{ marginRight: '7px', color: 'white', fontSize: 40 }} />
                                <UserName variant="subtitle1" sx={{ color: 'white', fontSize: 20 }}>{props.userInfo.name}</UserName>
                            </ProfileLink>
                        </SideUser>
                    </> :
                    <>
                        <SidebarMenu>
                            <SidebarLink to={props.wordId ? '/word/' + props.wordId : '/'} onClick={props.toggle}>
                                Dictionary
                            </SidebarLink>
                        </SidebarMenu>
                        <SideBtnWrap>
                            <SidebarRoute to='/signIn'>Sign In</SidebarRoute>
                        </SideBtnWrap>
                    </>
                }
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar;