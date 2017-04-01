import React from 'react';

export const VideoDisplay = (props) => {
  let ids = {};
  if (props.id === "left-half") {
    ids.h1 = "title1";
    ids.iframe = "image1";
    ids.ul = "content1";
  } else {
    ids.h1 = "title2";
    ids.iframe = "image2";
    ids.ul = "content2";
  }

  return (
    <div id={props.id}>
      <article>
        <h1 id={ids.h1}></h1>
        <div id="img">
          <iframe id={ids.iframe}></iframe>
        </div>
        <div  style={{display: props.display ? 'block' : 'none', top: '120px'}}></div>
        <ul id={ids.ul}></ul>
      </article>
    </div>
  )
}