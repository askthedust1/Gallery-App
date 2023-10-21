import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import {Link} from 'react-router-dom';
import { useAppDispatch } from '../../app/hook';
import {IUser} from "../../types";
import {logout} from "../../features/users/usersThunk";
import {apiUrl} from "../../constants";

interface Props {
    user: IUser;
}

const UserMenu: React.FC<Props> = ({ user }) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goOut = () => {
        dispatch(logout());
    };

    let userAva;

    if (user.googleID) {
        userAva = user.avatar;
    }

    if (!user.googleID) {
        userAva = apiUrl + '/' + user.avatar;
    }

    return (
        <>
            {user.avatar && userAva ? (
                <img className="user-ava" src={userAva} alt={user.displayName} />
            ) : (
                <img className="user-ava" src="https://i.redd.it/v6fk4w7a76j91.png" alt={user.displayName} />
            )}
            <Button onClick={handleClick} color="inherit">
                Hello, {user.displayName}
            </Button>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem><Link style={{textDecoration: 'none', color:'black'}} to='/my_cocktails'>My cocktails</Link></MenuItem>
                <MenuItem><Link style={{textDecoration: 'none', color:'black'}} to='/add_new'>Add new cocktail</Link></MenuItem>
                <MenuItem onClick={goOut}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;
