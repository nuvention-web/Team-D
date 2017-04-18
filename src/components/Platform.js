import React from 'react';

export const Platform = (props) => {
  return (
    <div id = "views">
      <h1>VIEWS</h1>
      <form onSubmit = {props.handleSubmit} id = "platforms">
      <div id= "fb_checkbox">
          <input type="checkbox"  value = "Facebook" onChange = {props.handleFBChange} />
          <label>Facebook</label>
      </div>
      <div id = "ig_checkbox">
          <input type="checkbox" value = "Instagram" onChange = {props.handleInstaChange} />
          <label>Youtube</label>
      </div>
    </form>
    </div>
  )
}