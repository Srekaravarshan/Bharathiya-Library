import React from "react";
import './Loading.css'
import Heading from "../../components/typography/Heading";
import LoadingWidget from "../../components/widgets/LoadingWidget";

function Loading() {
  return (
    <div className="loading">
    <LoadingWidget/>
      <Heading className="loading__heading">Loading...</Heading>
    </div>
  );
}

export default Loading;
