import React, { useEffect, useState } from 'react';
import { Paper, Typography, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';

const PostDetails = () => {
  const [showUploadSuccess, setShowUploadSuccess] = useState(true);
  const { post, posts } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
    const timer = setTimeout(() => setShowUploadSuccess(false), 3000);
    return () => clearTimeout(timer);
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post.tags.join(',') }));
    }
  }, [post, dispatch]);

  // const redirectToPost = postId => history.push(`/posts/${postId}`);

  if (!post) return null;
  const relevantPosts = posts.filter(p => p._id !== post._id);

  return (
    <Paper className={classes.paper}>
      {showUploadSuccess && <Typography variant="subtitle2">Post Uploaded!</Typography>}
      <div className={classes.postContent}>
        <Typography variant="h5">{post.title}</Typography>
        <Typography variant="subtitle1">{post.tags.map(tag => `#${tag} `)}</Typography>
        <Typography variant="body1">{post.message}</Typography>
        <Typography variant="subtitle1">Authored by: {post.name}</Typography>
        <Typography variant="caption">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <Divider className={classes.divider} />
      <Typography variant="subtitle1">Realtime Chat - coming soon!</Typography>
      <Typography variant="subtitle1">Comments - coming soon!</Typography>
      <Typography variant="subtitle1">Waveform Display - coming soon!</Typography>

      {relevantPosts.length > 0 && (
        <div className={classes.relatedPosts}>
          <Typography variant="h6">You might also be interested in:</Typography>
          {relevantPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
            <div key={_id} className={classes.relevantPost}>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body2">{name}</Typography>
              <Typography variant="body2">{message}</Typography>
              <Typography variant="caption">Likes: {likes.length}</Typography>
              <img src={selectedFile} alt={title} className={classes.relevantPostImage} />
            </div>
          ))}
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
