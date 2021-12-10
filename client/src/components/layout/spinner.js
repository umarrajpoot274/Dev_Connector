import React from "react";
import { Fragment } from "react";
import spinner from "./spinnerGif.gif";

export default function () {
  return (
    <Fragment>
      <img src={spinner} alt="Loading..."></img>
    </Fragment>
  );
}
