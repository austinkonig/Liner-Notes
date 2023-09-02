import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';

import { getPosts } from '../actions/posts';
import useStyles from './styles';

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const classes = useStyles();

  // Memoized debounced dispatch function with reduced delay
  const delayedDispatch = useMemo(
    () =>
      debounce((newPage) => {
        dispatch(getPosts(newPage));
      }, 100), // Adjust the delay time as needed
    [dispatch]
  );

  useEffect(() => {
    if (page) {
      delayedDispatch(page);
    }
    return () => delayedDispatch.cancel();
  }, [page, delayedDispatch]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
