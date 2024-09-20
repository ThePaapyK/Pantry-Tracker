'use client';
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '@/firebase';
import { Box, Typography, TextField, Button, Divider, Link, Hidden, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/signin'); 
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email already registered');
      } else {
        setError('Failed to sign up. Please try again.');
      }
    }
  };

  const handleSocialSignUp = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/home'); 
    } catch (err) {
      setError('Failed to sign up with social provider. Please try again.');
    }
  };

  const theme = useTheme();

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      sx = {{
        padding: {
          lg: 3,
          xs: 2,
        },
        flexDirection: {
          sm: "column-reverse",
          md: "column-reverse",
          lg: "row"
        }
      }}
    >
      <Box
        height="100%"
        sx={{
          position: "relative",
          width: {
            xs: "100%",
            sm: "100%",
            md: "50%",
            lg: "50%",
          },
        }}
      >
        <Container
          sx={{
            display: {
              xs:"block",
              sm:"none",
              lg:"block",
            }
          }}
        >
        <img
          src="/images/kichin-g.png"
          alt="Kichin Logo"
          style={{ width: 'auto', height: '60px', borderRadius: '8px' }}
        />
        </Container>
        <Box
          height="auto"
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "70%",

            }
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: 600,
            }}
          >Create an account
          </Typography>
          <Button
            startIcon={
              <img 
                src="/images/google_icon.png" 
                alt="Google Logo" 
                style={{ width: '24px', height: '24px' }} 
              />
            }
            sx = {{
              mb: 2,
              outline: "1px solid #7d7d7d;",
              color: "black",
              width: "250px",
              textTransform: "none",
            }}
            onClick={() => handleSocialSignUp(googleProvider)}
          >Sign up with Google
          </Button>
          <Button
            startIcon={
              <img 
                src="/images/facebook logo_icon.png" 
                alt="Facebook Logo" 
                style={{ width: '24px', height: '24px' }} 
              />
            }
            sx = {{
              mb: 2,
              outline: "1px solid #7d7d7d;",
              color: "black",
              width: "250px",
              textTransform: "none",
            }}
            onClick={() => handleSocialSignUp(facebookProvider)}
          >Sign up with Facebook
          </Button>
          <Button
            startIcon={
              <img 
                src="/images/microsoft_icon.png" 
                alt="Microsoft Logo" 
                style={{ width: '24px', height: '24px' }} 
              />
            }
            sx = {{
              mb: 2,
              outline: "1px solid #7d7d7d",
              color: "black",
              width: "250px",
              textTransform: "none",
            }}
          >Sign up with Microsoft
          </Button>
          <hr />
          <Divider sx={{ my: 2, width: "90%", borderColor: "#7d7d7d", borderBottomWidth: 3 }} >or</Divider>
          <TextField
            label="Email"
            size="small"
            sx={{
              width: "250px",
            }}
          />
          <TextField
            id="password"
            label="password"
            size="small"
            sx={{
              width: "250px",
              my: 2,
            }}
          />
          <Button
            variant="contained"
            sx={{
              width: "250px",
              backgroundColor: theme.palette.success.dark,
              '&:hover': {
                backgroundColor: theme.palette.success.main,
              },
            }}
          >
            Create account
          </Button>
          <Typography
            sx={{
              fontSize: "13.5px",
              my: 2,
            }}
          >
            Already have an account? <Link href="#" color="inherit" fontWeight={600}>Login</Link>
          </Typography>
        </Box>
      </Box>
      <Hidden smDown>
      <Box
        borderRadius={2}
        sx={{
                backgroundImage: "url(/images/theleaf.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: 4,
                position: "relative",

                width: {
                  sm: "100%",
                  lg: "50%",
                },
                height: {
                  sm: "45%",
                  lg: "100%",
                },
        }}
      >
        <Typography 
          variant="h3"
          sx={{
            color: "#ffffff",
            fontFamily: "Times New Roman", 
            fontStyle: "italic",
            fontSize: {
              sm: "2rem",
              lg: "3rem",
            }
          }}>
          Enter the Future
        </Typography>
        <Typography
          variant="h3"
          sx={{
            ml: 10,
            color: "#ffffff",
            width: "220px",
            fontWeight: "300",
            fontSize: {
              sm: "2rem",
              lg: "3rem",
            }
          }}
        >
          of Kitchen management, today
        </Typography>
        <img
          src="/images/kichin-w.png"
          alt="Kichin Logo"
          style={{ width: 'auto', height: '45px', position: 'absolute', bottom: '24px', right: '24px' }}
        />
      </Box>
      </Hidden>
    </Box>
  )
}

export default signup;