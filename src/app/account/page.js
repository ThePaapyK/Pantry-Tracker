'use client'
import { Box, Typography, Modal, Stack, TextField, Button, Avatar, Tooltip, IconButton, Menu, MenuItem, Divider, ListItemIcon, useMediaQuery } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PersonAdd, Settings, Logout, } from '@mui/icons-material';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, query } from 'firebase/firestore';
import { auth, firestore } from '@/firebase';

const settings = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const reveal = Boolean(anchorEl);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const [inventory,setInventory] = useState([]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const menuClose = () => {
        setAnchorEl(null);
      };

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (!user) {
            router.push('/login'); 
          } else {
            setUser(user);
            updateInventory(user.uid); 
          }
        });
        return () => unsubscribe();
      }, [router]);

      const updateInventory = async (userId) => {
        const snapshot = query(collection(firestore, `users/${userId}/inventory`))
        const docs = await getDocs(snapshot)
        const inventoryList = []
        docs.forEach((doc) => {
          inventoryList.push({ name: doc.id, ...doc.data() })
        })
        setInventory(inventoryList)
    }

      const handleLogout = async () => {
        try {
          await signOut(auth);
          router.push('/login');  // Redirect to the login page
          console.log("successfully logged out")
        } catch (error) {
          console.error('Error signing out: ', error);
        }
      };

    return (
        <>
        <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      sx={{
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          padding: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <img
          src="/images/kichin-g.png"
          alt="Kichin Logo"
          style={{ width: 'auto', height: '60px', borderRadius: '8px', margin: '16px' }}
        />
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              width: "40px",
              height: "40px",
            }}
            aria-controls={reveal ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={reveal ? 'true' : undefined}
          >
            {user ? (
              <Avatar >{user.displayName ? user.displayName.charAt(0) : 'U'}</Avatar>
            ):(
              <Avatar>U</Avatar>
            )
          }
          </IconButton>
        </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={reveal}
        onClose={menuClose}
        onClick={menuClose}
        slotProps={{
          paper: {
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
              '&::before': {
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
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => {router.push('/account')}}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => {router.push('/home')}}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Home
        </MenuItem>
        <MenuItem onClick={() => {router.push('/account')}}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      </Box>
    </Box>
        </>
    );
};

export default settings;