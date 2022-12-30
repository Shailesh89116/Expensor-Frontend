import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Cookie from 'js-cookie';
import { setUser } from "../store/auth";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";


export default function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const user = {
    "_id": "63ac3101a76268ddef4f9b41",
    "firstName": "Tarachandra",
    "lastName": "Gupta",
    "email": "tarachandragupta2784@gmail.com",
    "password": "$2b$10$jxtKrmesjNtQpolEEd1l8evqqWGIxArFRbIcTJKx3NsC692R05dAG",
    "categories": [
      {
        "label": "Travel",
        "icon": "user",
        "_id": "63ac3101a76268ddef4f9b42"
      },
      {
        "label": "Shopping",
        "icon": "user",
        "_id": "63ac3101a76268ddef4f9b43"
      },
      {
        "label": "Investment",
        "icon": "user",
        "_id": "63ac3101a76268ddef4f9b44"
      },
      {
        "label": "Bills",
        "icon": "user",
        "_id": "63ac3101a76268ddef4f9b45"
      }
    ],
    "createdAt": "2022-12-28T12:05:21.990Z",
    "updatedAt": "2022-12-28T12:05:21.990Z",
    "__v": 0
  }
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      login(formData)
    } catch (error) {
      console.log("login error", error);
    }

  };

  async function login(formData) {
    setIsLoading(true)

    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    });

    const { token, user } = await res.json();
    if (res.ok) {
      Cookie.set("token", token);
      dispatch(setUser(user))
      setIsAuthenticated(true)
      // setIsLoading(false)
    }
    setIsLoading(true)

  }

  async function authenticateToken(token) {
    //api call to validate token and if token is valid then get the user
    if (user) {
      dispatch(setUser(user))
      setIsAuthenticated(true)

    }
  }

  async function startLoginSync() {
    setIsLoading(true)
    const token = Cookie.get("token");
    if (token) {
      authenticateToken(token)
      setIsLoading(false)
    }
    setIsLoading(false)


  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

  }, [isAuthenticated])


  useEffect(() => {
    startLoginSync()
  }, [])


  if (isLoading) {
    return <p>Loading.....</p>
  }

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <RouterLink to="/register">
                <Link component="span" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

