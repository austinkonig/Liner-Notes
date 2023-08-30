import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Toolbar, Button, Modal } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { Close } from '@material-ui/icons';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [aboutOpen, setAboutOpen] = useState(false);

  const token = user?.token;

  const handleLogout = useCallback(() => {
    dispatch({ type: actionType.LOGOUT });
    history.push('/auth');
    setUser(null);
  }, [dispatch, history]);

  const toggleAbout = () => {
    setAboutOpen(!aboutOpen);
  };

  useEffect(() => {
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, token, handleLogout]);

  const renderAuthButtons = () => (
    <div>
      <button className="navButton" onClick={() => { window.location.href = "/auth" }}>
        Sign In
      </button>
      <button className="navButton" onClick={toggleAbout}>
        About
      </button>
    </div>
  );

  const renderProfile = () => (
    <div className={classes.profile}>
      <Typography className={`${classes.userName} username`} variant="h6">
        {user?.result.name.length > 25
          ? `${user?.result.name.substring(0, 25)}...`
          : user?.result.name}
      </Typography>

      <div style={{ marginLeft: 'auto' }}>
        <button className="navButton" onClick={toggleAbout}>
          About
        </button>
        <button className="navButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer} style={{ textDecoration: "none" }}>
        <h1 className="LN">
          Liner Notes{' '}
          <span className="poweredBy">
            Powered by{' '}
            <a href="https://wavesurfer-js.org/" className="poweredBy" target="_blank" rel="noopener noreferrer">
              Wavesurfer.js
            </a>
          </span>
        </h1>
      </Link>

      <Toolbar className={classes.toolbar}>
        {user?.result ? renderProfile() : renderAuthButtons()}
      </Toolbar>

      <Modal open={aboutOpen} onClose={toggleAbout}>
        <div className={classes.modalContainer}>
          <div className={classes.modalContent}>
            <h2 className='LN'>Liner Notes</h2>

            <h3>What is Liner Notes?</h3>
            <p className={classes.greyText}>
              Liner Notes is an audio platform catering to musicians, DJs, producers, and multimedia designers. As a Liner Notes member, you're able to upload, stream, and download a diverse range of community-contributed loops, drums, one-shots, and acapellas.
            </p>

            <h3>Why the name "Liner Notes?"</h3>
            <p className={classes.greyText}>
              The name "Liner Notes" pays homage to the analog recording era, specifically to the countless credits found on the 'liner notes' of vinyl, CDs, and other physical records.
            </p>
            <h3>Who Developed Liner Notes?</h3>
            <p className={classes.greyText}>
              LN is developed by <a href="https://www.linkedin.com/in/austin-konig-735225282/">Austin Konig</a>, sophomore from Stanford University's Class of 2026. For more on my projects & updates to LN, check out my <a href="https://github.com/austinkonig">GitHub!</a>.
            </p>
            <h3>Where can I report potential bugs with Liner Notes?</h3>
            <p className={classes.greyText}>
              Thank you for your interest! If you have any feedback or suggestions, please feel free to send them to me through this <a href="https://forms.gle/1GWsVhKJCLHa6mEf6">Google Form</a> or <a href="https://www.linkedin.com/in/austin-konig-735225282/">LinkedIn</a>.
            </p>
            <p className={classes.evenGreyerText}>
              Please note that Liner Notes is currently developed by a solo developer and may contain bugs and errors, as this is my first project on GitHub. Any feedback is greatly appreciated.
            </p>


            <Button className="navButton" onClick={toggleAbout}>
              <Close />
            </Button>
          </div>
        </div>
      </Modal>
    </div>

  );

};

export default Navbar;
