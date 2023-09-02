import React, { useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { CardActions, Button } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { useDispatch } from 'react-redux';
import { saveAs } from 'file-saver';

import { deletePost, likePost } from '../../../actions/posts';
import useStyles from './styles';
import './Post.css';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const waveformRef = useRef(null);
  const [waveSurfer, setWaveSurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
const pstTime = new Date(post.createdAt).toLocaleDateString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});  

  // icons imported from primer style -> https://primer.style/design/foundations/icons

  const FileDownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
      <path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"></path>
      <path d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969Z"></path>
    </svg>
  );

  const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm4.879-2.773 4.264 2.559a.25.25 0 0 1 0 .428l-4.264 2.559A.25.25 0 0 1 6 10.559V5.442a.25.25 0 0 1 .379-.215Z"></path>
    </svg>
  );

  const PauseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm224-72V328c0 13.3-10.7 24-24 24s-24-10.7-24-24V184c0-13.3 10.7-24 24-24s24 10.7 24 24zm112 0V328c0 13.3-10.7 24-24 24s-24-10.7-24-24V184c0-13.3 10.7-24 24-24s24 10.7 24 24z"/>
    </svg>
  );
  
  
  
  
  const handleLike = () => {
    dispatch(likePost(post._id));
  };

  const handlePlayReplay = () => {
    if (!isPlaying) {
      waveSurfer.play();
      setIsPlaying(true);
    } else {
      waveSurfer.stop(); // Stop the playback
      setIsPlaying(false);
      setCurrentTime(0); // Reset the current time
    }
  };

  const handleDownload = async () => {
    if (post.selectedFile) {
      try {
        const response = await fetch(post.selectedFile);
        const blob = await response.blob();

        const fileExtension = blob.type.split('/')[1];
        const fileName = `${post.title}.${fileExtension}`;

        saveAs(blob, fileName);
      } catch (error) {
        console.error('Error downloading the file:', error);
      }
    }
  };

  const handleWaveformClick = (e) => {
    const clickedTime = (e.nativeEvent.offsetX / waveformRef.current.clientWidth) * totalTime;
    waveSurfer.seekTo(clickedTime / totalTime);
    setCurrentTime(clickedTime);
  };

  useEffect(() => {
    if (waveformRef.current && post.selectedFile) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'lightgrey',
        progressColor: 'purple',
        barWidth: 1,
        barHeight: 1,
        responsive: true,
        height: 60,
      });

      wavesurfer.on('audioprocess', () => {
        setCurrentTime(wavesurfer.getCurrentTime());
      });

      wavesurfer.on('ready', () => {
        setTotalTime(wavesurfer.getDuration());
      });

      wavesurfer.on('finish', () => {
        setIsPlaying(false); // Pause the playback
        setCurrentTime(0); // Reset the current time
      });

      setWaveSurfer(wavesurfer);
      wavesurfer.load(post.selectedFile);

      return () => {
        wavesurfer.destroy();
      };
    }
  }, [post.selectedFile]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const isUserAuthorized = user?.result?.googleId === post?.creator || user?.result?._id === post?.creator;

  const truncatedTitle = post.title.length > 22 ? post.title.slice(0, 22) + '...' : post.title;

  return (
    <div className={`card ${classes.card}`}>
      <div className={`${classes.timestamp} timestamp`}>
        {formatTime(currentTime)} / {formatTime(totalTime)}
      </div>
      <div ref={waveformRef} className={classes.waveform} onClick={handleWaveformClick} />
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={handlePlayReplay}>
          {isPlaying ? <PauseIcon fontSize="small" /> : <PlayIcon fontSize="small" />}
        </Button>
        <Button size="small" color="primary" onClick={handleLike}>
          <ThumbUpAltIcon fontSize="small" />
        </Button>
        <Button size="small" color="primary" onClick={handleDownload}>
          <FileDownloadIcon fontSize="small" />
        </Button>
      </CardActions>
      {isUserAuthorized && (
        <div style={{ textAlign: 'right' }}>
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" />
          </Button>
        </div>
      )}
      <h4 className="text">{truncatedTitle}</h4>
      <p className="text">{post.details}</p>
      <p className="text">Posted by {post.name}</p>
      <p className="text">Posted on {pstTime}</p>
    </div>
  );
};

export default Post;
