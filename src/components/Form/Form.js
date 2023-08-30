import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Typography, Paper, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

import './Form.css';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const [formVisible, setFormVisible] = useState(true); // State for toggling form visibility
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  // icons imported from primer style -> https://primer.style/design/foundations/icons

  const UpArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
      <path d="M3.47 7.78a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0l4.25 4.25a.751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018L9 4.81v7.44a.75.75 0 0 1-1.5 0V4.81L4.53 7.78a.75.75 0 0 1-1.06 0Z"></path>
    </svg>
  );

  const DownArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
    <path d="M13.03 8.22a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L3.47 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018l2.97 2.97V3.75a.75.75 0 0 1 1.5 0v7.44l2.97-2.97a.75.75 0 0 1 1.06 0Z"></path>
  </svg>
);


  const clear = useCallback(() => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: [], selectedFile: '' });
  }, [setCurrentId]);

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post, clear]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  const handleToggleForm = () => {
    setFormVisible(!formVisible);
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to post and like on Liner Notes.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <IconButton color="primary" onClick={handleToggleForm}>
      {formVisible ? <UpArrowIcon /> : <DownArrowIcon />}
      </IconButton>
      {formVisible && (
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">{currentId ? `Edit "${post?.title}"` : 'Create a Post'}</Typography>
          <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
          <div style={{ padding: '5px 0', width: '94%' }}>
            <ChipInput
              name="tags"
              variant="outlined"
              label="Tags"
              fullWidth
              value={postData.tags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
            />
          </div>
          <div className="fileInput"><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
          <button className="formButton" variant="contained" color="primary" size="small" type="submit" fullWidth>Submit</button>
          <button className="formButton" variant="contained" color="secondary" size="small" onClick={(e) => { e.preventDefault(); clear(); }} fullWidth>Clear</button>
          {/* temp fix for clear button, submits instead of clears */}
        </form>
      )}

    </Paper>
  );
};

export default Form;
