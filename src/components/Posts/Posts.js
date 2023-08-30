import React, { useState, useEffect } from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import "./Posts.css";
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const [loadingProgress, setLoadingProgress] = useState(0); // Add state for loading progress
  const classes = useStyles();

  useEffect(() => {
    let progressInterval;

    if (isLoading) {
      // Start the progress interval
      progressInterval = setInterval(() => {
        setLoadingProgress((prevProgress) => {
          // Increment the progress value by a small amount
          const newProgress = prevProgress + 5;
          return newProgress > 100 ? 100 : newProgress; // Limit to 100
        });
      }, 500); // Adjust the interval as needed
    } else {
      // Reset progress when loading is complete
      setLoadingProgress(100);
      clearInterval(progressInterval);
    }

    return () => {
      clearInterval(progressInterval);
    };
  }, [isLoading]);

  return (
    <div className={classes.container}>
      {isLoading && <LinearProgress className="linprog" variant="determinate" value={loadingProgress} />}
      <Grid container alignItems="stretch" spacing={3}>
        {isLoading ? (
          <div className="typing-indicator">
            <div className="typing-circle"></div>
            <div className="typing-circle"></div>
            <div className="typing-circle"></div>
            <div className="typing-shadow"></div>
            <div className="typing-shadow"></div>
            <div className="typing-shadow"></div>
          </div>
        ) : (
          posts?.length ? (
            posts.map((post) => (
              <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            ))
          ) : null
        )}
      </Grid>
    </div>
  );
};

export default Posts;
