'use client'
import React, { useState } from "react";
import { Button, TextField, Typography, Container, Box, Alert } from "@mui/material";
import { auth, googleProvider, facebookProvider } from '@/firebase';
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth(firebaseApp);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");  // Replace with the route you want to redirect to
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh"
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ width: "100%", marginBottom: "16px" }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: "16px" }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
