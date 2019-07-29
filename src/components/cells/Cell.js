import React from 'react';

const Cell = props => {
  let cell = () => {
    if (props.data.isOpen) {
      if (props.data.hasMine) {
        return (
          <div
            className="cell open"
            onContextMenu={e => {
              e.preventDefault();
            }}
            onClick={() => props.open(props.data)}
          >
            <img src="./assets/bomb-solid.svg" alt="mines bomb svg icon" />
          </div>
        );
      } else if (props.data.count === 0) {
        return (
          <div
            className="cell open"
            onContextMenu={e => {
              e.preventDefault();
              props.flag(props.data);
            }}
            onClick={() => props.open(props.data)}
          />
        );
      } else {
        return (
          <div
            className="cell open"
            onContextMenu={e => {
              e.preventDefault();
            }}
            onClick={() => props.open(props.data)}
          >
            {props.data.count}
          </div>
        );
      }
    } else if (props.data.hasFlag) {
      return (
        <div
          className="cell open-flag"
          onContextMenu={e => {
            e.preventDefault();
            props.flag(props.data);
          }}
          onClick={() => props.open(props.data)}
        >
          <img src="./assets/flag-regular.svg" alt="svg icon flag" />
        </div>
      );
    } else {
      return (
        <div
          className="cell"
          onContextMenu={e => {
            e.preventDefault();
            props.flag(props.data);
          }}
          onClick={() => props.open(props.data)}
        />
      );
    }
  };
  return cell();
};

export default Cell;
