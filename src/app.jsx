import React from 'react';
import './fbConfig.js';
import ReactTooltip from 'react-tooltip'
const ProgressLabel = require('react-progress-label');

// Add components inside curly brackets
import {Platform} from './components';

export default class App extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      isFB: "",
      isInsta:"",
      isFBMetrics:"",
      isInstaMetrics:"",
    };

    this.handleFBChange = this.handleFBChange.bind(this);
    this.handleInstaChange = this.handleInstaChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReadMoreFB = this.handleReadMoreFB.bind(this);
    this.handleReadMoreInsta = this.handleReadMoreInsta.bind(this);

  }

  componentDidMount() {
      const ACCESS_TOKEN = "EAAR6flJrG9wBAOUYlIqDAGRs4yZBU6fTUQJZC8dxOkqvnjZADkLExaD7RhGtPRbncEtwPdMclrSPUayvq3p3HzYomVrvvmjGRqC2hg794zZAjevjMudFsscoFbmV1FcSq8O1ZALVDPSTQkgKBgUsKpvpIsA7491sZD";

      // Test Video # 1 ID
      const TEST1 = "10154546043703533";
      // Test Video #2 ID
      const TEST2 = "10154564632168533";
      // Facebook Page Id
      const PAGE = "8947243532";
      const params = {
          fields: "video_insights{title,values},title,picture,source",
          access_token: ACCESS_TOKEN
      }

      // Test Video # 1
      FB.api(
          '/' + TEST2,
          params,
          function (response) {
            if (response && !response.error) {
              /* handle the result */
              console.log("Test video #1 response: ", response);
              if (response.title) {
                document.getElementById("title1").innerHTML = response.title;
              } else {
                document.getElementById("title1").innerHTML = "Facebook";
              }

              document.getElementById("image1").src = response.source;

              var container1 = document.getElementById("content1");
              var video_insights = response.video_insights.data;
              for (var i = 0; i < video_insights.length; i++) {
                let li = document.createElement('li');
                let data = video_insights[i];
                let title = data.title;
                let value = data.values[0].value;

                value = title + ": " + value;
                li.innerHTML = value;
                container1.appendChild(li);
              }
            } else {
              console.error("error loading facebook video");
            }
          }
      );

      // Test Video #2
      FB.api(
          '/' + TEST2,
          params,
          function (response) {
            if (response && !response.error) {
              /* handle the result */
              console.log("Test video #2 response: ", response);
              if (response.title) {
                document.getElementById("title2").innerHTML = response.title;
              } else {
                document.getElementById("title2").innerHTML = "Instagram";
              }
              document.getElementById("image2").src = response.source +"&autoplay=0";

              var container2 = document.getElementById("content2");
              var video_insights = response.video_insights.data;
              // for (var i = 0; i < video_insights.length; i++) {
              //   let li = document.createElement('li');
              //   let data = video_insights[i];
              //   let title = data.title;
              //   let value = data.values[0].value;

              //   value = title + ": " + value;
              //   li.innerHTML = value;
              //   container2.appendChild(li);
              // }
            } else {
              console.error("error loading facebook video");
            }
          }
      );

  }


  handleFBChange(e) {
    if(e.target.checked){
      this.setState({
        isFB:"Facebook",
      })
    } else{

      this.setState({
        isFB: ""
      })
    }
  }

  handleInstaChange(e) {
    if(e.target.checked){
      this.setState({
        isInsta:"Instagram"

      })
    } else{
      this.setState({
        isInsta:""
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  handleReadMoreFB(e) {
    if(e.target.checked){
      this.setState({
        isFBMetrics:"ShowMoreFBmetrics"

      })
    } else {
      this.setState({
        isFBMetrics:""
      })
    }
  }

  handleReadMoreInsta(e) {
    if(e.target.checked){
      this.setState({
        isInstaMetrics:""

      })
    } else {
      this.setState({
      isInstaMetrics:"ShowMoreInstametrics"
      })
    }
  }

  render() {

    var progress = "80";
    var textStyle = {
      'fill': '#ffffff',
      'textAnchor': 'middle'
    };
    var textStyle2 = {
      'fill': '#FFDD57',
      'textAnchor': 'middle',
      'font-size': "50px"
    };


    return (
      <section className="container">
        <div id = "top">TELEOS</div>
        <img src={require("../images/logo.png")} id = "logo_img"/>

        {/* Platform Selection */}
        <Platform handleSubmit={this.handleSubmit}
                  handleFBChange={this.handleFBChange}
                  handleInstaChange={this.handleInstaChange}
        />

        {/* Visual Cue */}
        <section id="labels">
          <ProgressLabel
                style={{display: this.state.isFB ? 'block' : 'none', top: "120px"}}
                data-tip
                data-for="1"
                progress={100}
                startDegree={0}
                progressWidth={8}
                trackWidth={30}
                cornersWidth={4}
                size={400}
                fillColor="black"
                trackColor="white"
                progressColor="#3b5998">
                <text data-tip data-for="score" x="200" y="170" style={textStyle}>Nova Score:</text>
                <text data-tip data-for="score" x="200" y="230" style={textStyle2}>39.39</text>
          </ProgressLabel>
          <ReactTooltip id="1" effect='solid'>
            <span>Total Video Reach</span>
            <ul>
              <li>Facebook: 1711</li>
              <li>Instagram: 291</li>
            </ul>

          </ReactTooltip>

          <ProgressLabel
                style={{display: this.state.isInsta ? 'block' : 'none', top: "150px" }}
                data-tip
                data-for="2"
                progress={45.15}
                startDegree={0}
                progressWidth={8}
                trackWidth={30}
                cornersWidth={4}
                size={340}
                fillColor="black"
                trackColor="white"
                progressColor="#fbad50">
                <text data-tip data-for="score" x="170" y="160" style={textStyle}>Nova Score:</text>
                <text data-tip data-for="score" x="170" y="210" style={textStyle2}>45.15</text>
          </ProgressLabel>
          <ReactTooltip id="2" effect='solid'>
            <span>Total Video Views</span>
            <ul>
              <li>Facebook: 674</li>
              <li>Instagram: 230</li>
            </ul>
          </ReactTooltip>
        </section>


        {/* Left Video */}
        <div id="left-half">
          <article>
            <h1 id="title1"></h1>
            <div id="img">
              <iframe id="image1"></iframe>
            </div>
            <div  style={{display: this.state.isFBMetrics? 'block' : 'none', top: '120px'}}></div>
            <ul id="content1"></ul>
          </article>
        </div>

        {/* Right Video */}
        <div id="right-half">
          <article>
            <h1 id="title2"></h1>
            <div id="img">
              <iframe id="image2"></iframe>
            </div>
            <div style={{display: this.state.isInstaMetrics ? 'block' : 'none', top: '150px'}}></div>
            <ul id="content2">
              <li>Total Views: 230</li>
              <li>Engagement: 44</li>
              <li>Total Reach: 291</li>
              <li>Likes: 41</li>
              <li>Comments: 2</li>
              <li>Impressions: 450</li>
            </ul>
          </article>
        </div>
      </section>

    )
  }
}
