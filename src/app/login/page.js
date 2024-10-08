'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider, microsoftProvider } from '@/firebase';
import { Box, Typography, TextField, Button, Divider, Link, Hidden, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const signin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/home');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleSocialSignIn = async (provider) => {
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
      height="100dvh"
      display={'flex'}
      sx = {{
        position: "relative",
        padding: {
          lg: 3,
          xs: 2,
        },
        flexDirection: {
          sm: "row",
          md: "row",
          lg: "row"
        },
        "@media (width: 1024px) and (max-height: 600px)": {
          flexDirection: "row", // Set flex direction to column for 1024x600px devices
        },
      }}
    >
      <Box
        height="100%"
        sx={{
          position: "relative",
          width: {
            xs: "100%",
            sm: "35%",
            md: "35%",
            lg: "50%",
          },
        }}
      >
        <img
          src="/images/kichin-g.png"
          alt="Kichin Logo"
          style={{ width: 'auto', height: '60px', borderRadius: '8px' }}
        />
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

            },
            mt: {
              xs: 2.5,
              sm: 0,
            }
          }}
        >
          {error && (
          <Alert severity="error" sx={{ width: "100%", marginBottom: "16px" }}>
            {error}
          </Alert>
        )}
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: 600,
            }}
          >Sign In
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
            onClick={() => handleSocialSignIn(googleProvider)}
          >Continue with Google
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
            onClick={() => handleSocialSignIn(facebookProvider)}
          >Continue with Facebook
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
            onClick={() => handleSocialSignIn(microsoftProvider)}
          >Continue with Microsoft
          </Button>
          <hr />
          <Divider sx={{ my: 2, width: "90%", borderColor: "#7d7d7d", borderBottomWidth: 3 }} >or</Divider>
          <Box component="form" onSubmit={handleEmailSignIn}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              size="small"
              sx={{
                width: "250px",
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              size="small"
              sx={{
                width: "250px",
                my: 2,
              }}
            />
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "250px",
              backgroundColor: theme.palette.success.dark,
              '&:hover': {
                backgroundColor: theme.palette.success.main,
              },
            }}
          >
            Sign In
          </Button>
          <Typography
              sx={{
                fontSize: "11px",
                my: 1,
                width: "300px",
                textAlign: "center"
              }}
            >
              By continuing, you agree to our <Link href="/privacy_policy" color="inherit" fontWeight={600}>Privacy Policy</Link> and our <Link href="/Terms_of_Service" color="inherit" fontWeight={600}>Terms of Service</Link>
            </Typography>
          <Typography
            sx={{
              fontSize: "13.5px",
              my: 2,
            }}
          >
            Don't have an account? <Link href="/" color="inherit" fontWeight={600}>Sign Up</Link>
          </Typography>
          </Box>
        </Box>
        <Typography variant="h7"
          sx={{
            position: "absolute",
            textAlign: "center",
            color: "#130",
            margin: "auto",
            left: 0,
            right: 0,
            width: "fit-content",
            display: {
              xs: "block",
              sm: "none",
              md: "none",
              lg: "none",
            },
            top: "95%",
            fontFamily: "Times New Roman", 
            fontStyle: "italic",
          }}
        >
          Enter the future of Kitchen management, today
        </Typography>
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
                  sm: "65%",
                  lg: "50%",
                },
                height: {
                  sm: "100%",
                  lg: "100%",
                },
                "@media (width: 1024px) and (height: 600px)": {
          height: "100%", // Set flex direction to column for 1024x600px devices
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

export default signin;