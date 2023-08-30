import React, { useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { CardActions, Button } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import { useDispatch } from 'react-redux';
import { saveAs } from 'file-saver';

import { deletePost, likePost } from '../../../actions/posts';
import useStyles from './styles';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
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

  const pstTimeOptions = { timeZone: 'America/Los_Angeles' };
  const pstTime = new Date(post.createdAt).toLocaleTimeString('en-US', pstTimeOptions);

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
          {isPlaying ? <PauseCircleOutlineOutlinedIcon fontSize="small" /> : <PlayCircleFilledWhiteOutlinedIcon fontSize="small" />}
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
      <p className="text">Posted {pstTime} PST</p>
    </div>
  );
};

export default Post;
