'use client';
import { Box, Typography, Modal, Stack, TextField, Button } from '@mui/material';
import { keyframes } from '@emotion/react';
import { firestore } from '@/firebase';
import { collection, addDoc, getDocs, query, setDoc, getDoc, doc, deleteDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
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

const PEXELS_API_KEY = "rzswgEd5bPi2qOP1soMtFRcXEL2c4zZNvVZ1fhT5d6rW3Dt2tyKns1Dn"

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
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 }, {merge: true}) 
    } else {
      const imageUrl = await fetchImageFromPexels(item)
      await setDoc(docRef, { quantity: 1, imageUrl })
    }
    await updateInventory()
  }
  
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }
  
  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
    >
      <Box
	width="50%"
	height="inherit"
	display={'flex'}
	flexDirection="column"
	sx={{
	  backgroundImage: "url(/images/pantry_shelf.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
	  padding: 4,
	  filter: 'blur(4px)'
	}}
      />
      <Box
        sx={{
          position: 'absolute',
	  p: 4,
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
          backdropFilter: 'blur(4px)', // Optional: blur the overlay content as well
        }}
      >
        <Box
	   display={'flex'}
	   alignItems="center"
	   sx={{
	     animation: `${slideIn} 1s ease-out`,
	   }}
	>
	  <img
	    src="/images/carrot.png"
	    style={{
	      height: 80,
	      width: 50,
	      filter: 'invert(1) brightness(2)',
	    }}
	      
	  />
          <Typography variant="h2" color="#ffffff">
	     Fobi Pantry Tracker
          </Typography>
        </Box>
        <Box
	  color="#ffffff"
	  sx={{
            marginTop: 'auto',
            animation: `${slideIn} 1s ease-out`,
	  }}
        >
	  <Typography variant="h4">
	    Smart Tracking for a Smarter Kitchen
	  </Typography>
	  <Typography variant="body1">
	    Our Pantry Tracker is designed to bring ease and efficiency to your kitchen management.
	    Say goodbye to the frustration of forgetting what you have or letting items go to waste.
	    Whether you're a busy parent, a meal prep enthusiast, or simply someone who values organization,
	    our Pantry Tracker ensures you always know what's in stock, helping you save time, reduce waste,
	    and make smarter grocery decisions.
	  </Typography>
        </Box>
     </Box>
     <Box
       width="50%"
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
        <Button variant="contained" sx={{mb: 2}} onClick={handleOpen}>
          Add New Item
        </Button>
	<TextField
          id="search"
          label="Search Items"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2, width: '600px', maxwidth: '800px' }}
        />
        <Box border={'1px solid #333'}>
          <Box
            width="600px"
            height="100px"
	    color="white"
            bgcolor="#ADD8E6"
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
              Pantry Items
            </Typography>
          </Box>
          <Stack width="600px" height="300px" spacing={2} overflow={'auto'}>
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
                  paddingX={5}
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
                      <Typography variant={'h4'} color={'#333'} textAlign={'center'}>
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                      </Typography>
                      <Typography variant={'h6'} color={'#333'} textAlign={'center'}>
                        Quantity: {quantity}
                      </Typography>
		    </Box>
		  </Box>
                  <Button variant="contained" onClick={() => removeItem(name)}>
                    Remove
                  </Button>
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
