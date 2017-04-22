import React from 'react';
// import './lib/firebaseConfig.js';
import {facebookAPI} from './lib/apiConfig.js';
import ReactTooltip from 'react-tooltip';
import ProgressLabel from 'react-progress-label';

// Add components inside curly brackets
// import {Platform, VisualCue, Title, VideoDisplay} from './components';
import {Header, Section, Title, StackedBars} from './components';

export default class App extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      isFB: false,
      isInsta: false,
      isFBMetrics:"",
      isInstaMetrics:""
    };

    this.handleFBChange = this.handleFBChange.bind(this);
    this.handleInstaChange = this.handleInstaChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReadMoreFB = this.handleReadMoreFB.bind(this);
    this.handleReadMoreInsta = this.handleReadMoreInsta.bind(this);
    this.handleFetchedData = this.handleFetchedData.bind(this);

  }

  componentDidMount() {
    var promised = facebookAPI();
    promised.then(res => {
      this.setState({res: res.video_insights.data})
      console.log("facebookData in App: ", this.state);
    }).catch((err) => {
      console.log(err);
    });

  }

  handleFetchedData(res) {
    this.setState({res});
  }

  handleFBChange(e) {
    if(e.target.checked){
      this.setState({
        isFB: true
      })
    } else{

      this.setState({
        isFB: false
      })
    }
  }

  handleInstaChange(e) {
    if(e.target.checked){
      this.setState({
        isInsta: true

      })
    } else{
      this.setState({
        isInsta: false
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

    return (
      <section className="container">
        <Header />
        <Section />
        <Section />
        <Section />
        <Section />
      </section>
    )
  }
}
