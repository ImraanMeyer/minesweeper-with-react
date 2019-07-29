import React from 'react';
import PropTypes from 'prop-types';

const BoardHead = props => {
  const minutes = Math.floor(props.time / 60);
  const seconds = props.time - minutes * 60 || 0;

  const formatedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const timer = `${minutes}:${formatedSeconds}`;
  const status =
    props.status === 'running' || props.status === 'waiting' ? (
      <img src="./assets/laugh-beam-regular.svg" alt="happy svg smile emoji" />
    ) : (
      <img src="./assets/sad-cry-regular.svg" alt="sad svg smile emoji" />
    );
  return (
    <div className="board-head">
      <div className="flag-count">{props.flags}</div>
      <button className="reset" onClick={props.reset}>
        {status}
      </button>
      <div className="timer">{timer}</div>
    </div>
  );
};

BoardHead.propTypes = {
  time: PropTypes.number.isRequired,
  flags: PropTypes.number.isRequired
};

export default BoardHead;
