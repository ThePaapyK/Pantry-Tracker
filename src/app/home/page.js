'use client';
import { Box, Typography, Modal, Stack, TextField, Button, Avatar, Tooltip, IconButton, Menu, MenuItem, Divider, ListItemIcon, useMediaQuery } from '@mui/material';
import { PersonAdd, Settings, Logout, } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import { auth, firestore } from '@/firebase';
import { collection, addDoc, getDocs, query, setDoc, getDoc, doc, deleteDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import axios from 'axios'



const slideIn = keyframes`
  from {
    transform: translateX(-15%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY

const fetchImageFromPexels = async (query) => {
  try {
    const response = await axios.get('https://api.pexels.com/v1/search', {
      params: {
        query: `${query}`,
        per_page: 1, // Number of images to return
      },
      headers: {
        Authorization: PEXELS_API_KEY
      }
    })

    // Return the URL of the first image
    return response.data.photos.length > 0 ? response.data.photos[0].src.medium : ''
  } catch (error) {
    console.error('Error fetching image:', error)
    return ''
  }
}


export default function Home() {
  const [inventory,setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false)
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const router = useRouter();
  const reveal = Boolean(anchorEl);
  const [editingItem, setEditingItem] = useState(null); // Track the item being edited
  const [newQuantity, setNewQuantity] = useState(''); // Track the new quantity input
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuClose = () => {
    setAnchorEl(null);
  };

   // Check authentication status
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

   useEffect(() => {
    if (typeof window !== 'undefined') {
      // Code that accesses the window object
      updateInventory();
    }
  }, []);

  const addItem = async (item) => {
    if (!user) return;
    const docRef = doc(collection(firestore, `users/${user.uid}/inventory`), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 }, {merge: true}) 
    } else {
      const imageUrl = await fetchImageFromPexels(item)
      await setDoc(docRef, { quantity: 1, imageUrl })
    }
    await updateInventory(user.uid)
  }
  
  const removeItem = async (item) => {
    if (!user) return;
    const docRef = doc(collection(firestore, `users/${user.uid}/inventory`), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory(user.uid)
  }

  const handleQuantityChange = async (item, newQuantity) => {
    if (!user || isNaN(newQuantity)) return;
    const docRef = doc(collection(firestore, `users/${user.uid}/inventory`), item);
    await setDoc(docRef, { quantity: Number(newQuantity) }, { merge: true });
    setEditingItem(null); // Close the editing mode
    await updateInventory(user.uid); // Update the inventory
  };


  const deleteItem = async(item) => {
    if (!user) return;
    const docRef = doc(collection(firestore, `users/${user.uid}/inventory`), item)
    await deleteDoc(docRef)
    await updateInventory(user.uid)
  }
  
  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleOpenRemoveModal = (item) => {
    setItemToDelete(item);
    setOpenRemoveModal(true);
  }

  const handleCloseRemoveModal = () => setOpenRemoveModal(false);

  const handleConfirmDelete = () => {
    deleteItem(itemToDelete); // Remove the item
    handleCloseRemoveModal(); // Close the modal
  };

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
        <MenuItem onClick={menuClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={menuClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={menuClose}>
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
      <Box
      sx={{
        textAlign: "center",
      }}
      >
        {user ?
          (
            <Typography sx={{fontSize: "24px", }}>Welcome, {user.displayName}</Typography>
          ):(
            <Typography >Welcome, User</Typography>
          )
        }
        <Typography sx={{fontStyle: "italic"}}>Keep track of 'em groceries</Typography>
      </Box>
     <Box
       width="100%"
       height="inherit"
       backgroundColor="white"
       display={'flex'}
       flexDirection="column"
       justifyContent="center"
       alignItems="center"
     >
       <Modal
           open={open}
           onClose={handleClose}
           aria-labelledby="modal-modal-title"
           aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Item
            </Typography>
            <Stack width="100%" direction={'row'} spacing={2}>
              <TextField
                id="outlined-basic"
                label="Item"
                variant="outlined"
                fullwidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  addItem(itemName)
                  setItemName('')
                  handleClose()
                }}
              >
               Add
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Modal open={openRemoveModal} onClose={handleCloseRemoveModal}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirm Delete
            </Typography>
            <Typography>
              Are you sure you want to delete {itemToDelete}?
            </Typography>
            <Stack width="100%" direction={'row'} spacing={2} justifyContent="flex-end">
              <Button variant="contained" color="error" onClick={handleConfirmDelete}>
                Delete
              </Button>
              <Button variant="outlined" onClick={handleCloseRemoveModal}>
                Cancel
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Button variant="contained" sx={{mb: 2}} onClick={handleOpen}>
          Add New Item
        </Button>
	      <TextField
          id="search"
          label="Search Items"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2, width: {sm: "90%", md: "600px", lg: "600px", xlg: "800px"}, }}
        />
        <Box border={'1px solid #333'}
          sx={{
            width: {
              sm: "97%",
              md: "600px",
              lg: "600px",
            }
          }}
        >
          <Box
            width="100%"
            height="100px"
	          color="white"
            bgcolor="#ADD8E6"
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
              Items
            </Typography>
          </Box>
          <Stack width="100%" height="300px" spacing={2} overflow={'auto'}>
	          {filteredInventory.length > 0 ? (
              filteredInventory.map(({name, quantity, imageUrl}) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={'#f0f0f0'}
              sx={{
                minHeight: {
                  sm: "95px",
                  md: "150px"
                },
                paddingX: {
                  sm: 2,
                  md: 5,
                }
              }}
            >
		        <Box
		          display={'flex'}
		          justifyContent="space-between"
		        >
		          {imageUrl && <img src={imageUrl} alt={name} style={{ width: '100px', height: '100px', marginRight: '16px' }} />}
		          <Box
		            display={'flex'}
		            flexDirection="column"
		            justifyContent="center"
		            sx={{ gap: 1}}
		            alignItems="flex-start"
		          >
                <Typography color={'#333'} textAlign={'center'}
                  sx={{
                    fontSize: {
                      sm: "22px",
                      md: "28px",
                    }
                  }}
                >
                {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
              {editingItem === name ? (
                    <TextField
                      type="number"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(e.target.value)}
                      onBlur={() => handleQuantityChange(name, newQuantity)} // Save on blur
                      autoFocus
                      sx={{ maxWidth: '70px' }}
                    />
                  ) : (
                    <Typography
                      sx={{
                        fontSize: {
                          sm: "11px",
                          md: "18px",
                        },
                      }}
                    >
                      Quantity: {quantity}{" "}
                      <IconButton size="small" onClick={() => {
                        setEditingItem(name); // Set item to edit mode
                        setNewQuantity(quantity); // Initialize with the current quantity
                      }}>
                        <EditIcon fontSize='14px' />
                      </IconButton>
                    </Typography>
                  )}
		       </Box>
		  </Box>
        <>      
        { isSmallScreen? (
          <IconButton size="small" onClick={() => handleOpenRemoveModal(name)} >
            <DeleteIcon fontSize='16px'/>
          </IconButton>
        ):(
        <Button variant="contained" onClick={() => handleOpenRemoveModal(name)}>
          Remove All
        </Button>
        )}
        </>
        <Box display="flex" alignItems="center">
          <Button size="small" variant="outlined" onClick={() => removeItem(name)} sx={{ minWidth: "30px", marginRight: "7.5px", fontWeight: "700", fontSize: {sm: "11px", md: "20px"} }}>
            -
          </Button>
          <Button size="small" variant="outlined" onClick={() => addItem(name)} sx={{ minWidth: "30px", marginLeft: "7.5px", fontWeight: "700", fontSize: {sm: "11px", md: "20px"}}}>
            +
          </Button>
        </Box>
      </Box>
        ))
	    ) : (
	      <Box
		width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                p={5}
              >
                <Typography variant="h4" color="text.primary" textAlign="center">
                  No items found
                </Typography>
              </Box>
	    )}
          </Stack>
	</Box>
      </Box>
    </Box>
  );
}
