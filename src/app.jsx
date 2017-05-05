import React from 'react';
// import './lib/firebaseConfig.js';
import {facebookAPI} from './lib/apiConfig.js';
import {YTpromised} from './lib/YTconfig.js';
import ReactTooltip from 'react-tooltip';
import ProgressLabel from 'react-progress-label';
import Sidebar from 'react-sidebar';

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
      isInstaMetrics:"",
      sidebarOpen: true
    };

    this.handleFBChange = this.handleFBChange.bind(this);
    this.handleInstaChange = this.handleInstaChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReadMoreFB = this.handleReadMoreFB.bind(this);
    this.handleReadMoreInsta = this.handleReadMoreInsta.bind(this);
    this.handleFetchedData = this.handleFetchedData.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);

  }

  componentDidMount() {
    var FBpromised = facebookAPI();
    FBpromised.then(res => {
      this.setState({res: res.video_insights.data})
      console.log("facebookData in App: ", this.state);
    }).catch((err) => {
      console.log(err);
    });

    window.lennykim = "";
    require('google-client-api')().then((gapi) => {
      YTpromised(gapi).then(res => {
        console.log("Youtube in App: ", res);
      })
    })
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

  onSetSidebarOpen(open) {
     this.setState({sidebarOpen: open});
   }

  render() {
    var sidebarContent = <b>Sidebar content</b>;

    return (
      <section className="container">
        {/*<Sidebar sidebar={sidebarContent}
                 open={this.state.sidebarOpen}
                 onSetOpen={this.onSetSidebarOpen}>
                 docked={true}
          <b>Main content</b>
        </Sidebar>*/}
        <Header />
        <div className="top">
          <Section title="TOP PERFORMERS"/>
          <Section title="PAID vs. ORGANIC"/>
          <Section title="DEVICES"/>
        </div>
        <Section title="VIEWS" />
        <Section title="INTERACTIONS"/>
      </section>
    )
  }
}
