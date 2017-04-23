import React from 'react';

<<<<<<< HEAD
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
=======
export class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p>This is Title</p>
    )
  }
>>>>>>> 642fd7aca318ee33a223bdb7fc1c444779904d0c
}