import React from 'react';

export const Title = (props) => {
  return (
    <section className="topTitle">
      <div id = "top">
      <img src={require("../../images/logo.png")} id = "logo_img"/>
      <h1 id = "title"> > ALL PLATFORMS</h1>
      <hr id = "top_divider"></hr>
      </div>
    </section>
  );
}