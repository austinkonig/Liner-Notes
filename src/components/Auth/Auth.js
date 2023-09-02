import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
import useStyles from "./styles";
import Input from "./Input";
import "./Auth.css";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};


const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
    <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
  </svg>
);

const clientId = process.env.REACT_APP_CLIENT_ID;

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleChange = useCallback((e) =>
    setForm({ ...form, [e.target.name]: e.target.value }), [form]);

  const handleShowPassword = useCallback(() =>
    setShowPassword((prevShowPassword) => !prevShowPassword), []);

    const switchMode = useCallback(() => {
      setForm(initialState);
      setIsSignup((prevIsSignup) => !prevIsSignup);
      setShowPassword(false);
    }, []);
  

    const googleSuccess = useCallback((res) => {
      console.log("Login Success: currentUser:", res.profileObj);
    }, []);
  
    const googleFailure = useCallback((res) => {
      console.log("Login Failed:", res);
    }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  }, [dispatch, form, history, isSignup]);


  // const googleSuccess = async (res) => {
  //   const result = res?.profileObj;
  //   const token = res?.tokenId;

  //   try {
  //     dispatch({ type: AUTH, data: { result, token } });

  //     history.push("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const googleError = () =>
  //   console.log("Google Sign In was unsuccessful. Try again later");


  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <div style={{ marginTop: "15px" }}></div>

          <button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={`${classes.submit} button auth`}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
          {isSignup && (
            <div id="sign-in-button">
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign Up with Google"
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </div>
          )}
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
