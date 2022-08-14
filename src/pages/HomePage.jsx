import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography, Toolbar, IconButton, Grid, Menu, MenuItem, AppBar, Switch, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import React, { useState, useEffect } from 'react'
import { Divider } from '@mui/material';
import { Dashboard, Logout, MoneyOutlined, PersonOutline, } from '@mui/icons-material';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { mainColor } from '../themes/colors';
// import Spin2Win from './Spin2Win';
import Tickets from './Tickets';
import Turnover from './Turnover';
import CashiersPage from './Cashiers';
import CreateUser from './CreateUser';

import io from 'socket.io-client'
import { BASE_URL, MessageCodes } from './utils';


const drawerWidth = 230;
const socket = io.connect(BASE_URL)


const HomePage = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [safeGuard, setSafeGuard] = useState(false)

    const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const startListenningToSockets = () => {
        // socket.emit(MessageCodes.REQUEST_GAME_STATUS)
        socket.emit(MessageCodes.REGUEST_SAFEGUARD_STATUS)

        socket.on(MessageCodes.UPDATE_SAFEGUARD, data => {
            setSafeGuard(data)
        })
    }

    const { window } = props;

    const [mobileOpen, setMobileOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const navigate = useNavigate()

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    };

    const dashboardElement = [
        {
            name: 'Tickets',
            component: <Tickets />,
            icon: <Dashboard sx={{ color: selectedIndex === 0 ? 'white' : '#444' }} />

        },
        {
            name: 'Turnover',
            component: <Turnover />,
            icon: <MoneyOutlined sx={{ color: selectedIndex === 1 ? 'white' : '#444' }} />
        },
        {
            name: 'Cashiers',
            component: <CashiersPage />,
            icon: <PersonOutline sx={{ color: selectedIndex === 2 ? 'white' : '#444' }} />
        },
    ]


    const drawer = (
        <Box>
            <Typography sx={{ fontSize: 22, p: 3 }}>Best Bet <span><Switch
                size='small'
                checked={safeGuard}
                onChange={(e) => {
                    socket.emit(MessageCodes.TOGGLE_SAFEGUARD)
                }}
                inputProps={{ 'aria-label': 'controlled' }}
            /></span></Typography>



            <Divider sx={{ m: 2, p: 1, mt: 1 }} />
            <List>
                {dashboardElement.map((menu, index) => (
                    <Box sx={{ m: 1 }}>
                        <ListItem style={{ borderRadius: 7 }} onClick={() => {
                            navigate('/home')
                            setSelectedIndex(index)
                        }} button key={menu.name} sx={{ backgroundColor: selectedIndex === index ? mainColor : 'white', my: 0, py: 1, '&:hover': { backgroundColor: selectedIndex === index ? mainColor : 'white', } }}>
                            <ListItemIcon>
                                {
                                    menu.icon
                                }
                            </ListItemIcon>
                            <ListItemText disableTypography primary={<Typography sx={{ color: selectedIndex === index ? 'white' : '#444', fontSize: 12, fontWeight: 'bold' }}>{menu.name}</Typography>} />
                        </ListItem>
                    </Box>
                ))}

                <ListItem style={{ borderRadius: 7, marginLeft: 10 }} onClick={() => {
                    localStorage.removeItem('auth-data')
                    navigate('/')
                }} button key={'logout'} sx={{ backgroundColor: selectedIndex === 3 ? mainColor : 'white', my: 0, py: 1, '&:hover': { backgroundColor: selectedIndex === 3 ? mainColor : 'white', } }}>
                    <ListItemIcon >
                        <Logout />
                    </ListItemIcon>
                    <ListItemText disableTypography primary={<Typography sx={{ color: selectedIndex === 3 ? 'white' : '#444', fontSize: 12, fontWeight: 'bold' }}>Sign Out</Typography>} />
                </ListItem>

            </List>

        </Box>
    )

    const container = window !== undefined ? () => window().document.body : undefined
    useEffect(() => {

        startListenningToSockets()

        return () => {
            // stopListenningToSockets()
        }
        // eslint-disable-next-line
    }, [])

    if (!localStorage.getItem('auth-data')) {
        return <Navigate to='/' />
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        backgroundColor: 'white',
                        boxShadow: '3px 2px 3px #10444444'
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, color: mainColor, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Grid container justifyContent='flex-end' alignItems='center'>
                            <Grid item>

                                <Grid container>



                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem onClick={async () => {
                                            navigate('/')
                                        }}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" sx={{ color: mainColor, fontSize: 14 }} />
                                            </ListItemIcon>
                                            <Typography sx={{ fontSize: 14 }}>Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{mt:3, flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    {/* <Toolbar /> */}

                    {
                        <Routes>
                            <Route path='*' element={dashboardElement[selectedIndex]['component']} />
                            <Route path='create-user' element={<CreateUser />} />
                        </Routes>
                    }

                </Box>
            </Box>

        </>
    )
}

export default HomePage