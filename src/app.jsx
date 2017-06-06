import React from 'react';
import axios from 'axios';
import './lib/firebaseConfig.js';
import {facebookAPI} from './lib/apiConfig.js';
import {YTpromised} from './lib/YTconfig.js';
import ReactTooltip from 'react-tooltip';
import ProgressLabel from 'react-progress-label';
import Sidebar from 'react-sidebar';
import {BigQuery} from './lib/bigquery.js';
import {bubble as Menu } from 'react-burger-menu';
import {Header, Section, Title, StackedBars, CheckBox} from './components';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeframe: "daily",
      flag_brightcove: true,
      flag_facebook: true,
      flag_youtube: false,
      data: {
        most_viewed_videos: {
          daily: {
            1:{video: "Video 1" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"},
            2:{video: "Video 2" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"},
            3:{video: "Video 3" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"},
            4:{video: "Video 4" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"},
            5:{video: "Video 5" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"},
            6:{video: "Video 6" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"},
            7:{video: "Video 7" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"},
            8:{video: "Video 8" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"},
            9:{video: "Video 9" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"},
            10:{video: "Video 10" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"}
          },
          weekly: {
            1:{video: "Video 1" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"},
            2:{video: "Video 2" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"},
            3:{video: "Video 3" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"},
            4:{video: "Video 4" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"},
            5:{video: "Video 5" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"},
            6:{video: "Video 6" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"},
            7:{video: "Video 7" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"},
            8:{video: "Video 8" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"},
            9:{video: "Video 9" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"},
            10:{video: "Video 10" , platform: "test_plat", publish_date: "mm/dd/yy", views: "###", interactions: "###"}
          }
        },
        paid_organic: {
          daily: {
            paid: 0,
            organic: 0
          },
          weekly: {
            paid: 0,
            organic: 0
          }
        },
        devices: {
          daily: {
            web: 0,
            mobile: 0
          },
          weekly: {
            web: 0,
            mobile: 0
          }
        },
        total_views: {
          daily: {
            facebook: {
              current: 0,
              last: 0,
              best: 0
            },
            brightcove: {
              current: 0,
              last: 0,
              best: 0
            }
          },
          weekly: {
            facebook: {
              current: 0,
              last: 0,
              best: 0
            },
            brightcove: {
              current: 0,
              last: 0,
              best: 0
            }
          }
        },
        total_interactions: {
          daily: {
            facebook: {
              current: 0,
              last: 0,
              best: 15
            },
            brightcove: {
              current: 0,
              last: 0,
              best: 0
            }
          },
          weekly: {
            facebook: {
              current: 0,
              last: 0,
              best: 15
            },
            brightcove: {
              current: 0,
              last: 0,
              best: 0
            }
          }
        }
      }
    }

    this.handleRadioButton = this.handleRadioButton.bind(this);
    this.handleBrightcove = this.handleBrightcove.bind(this);
    this.handleFacebook = this.handleFacebook.bind(this);
    this.handleYoutube = this.handleYoutube.bind(this);
    this.handleMerge = this.handleMerge.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/brightcove').then(res => {
      console.log("brightcove: ", res);
    }).catch(err => {
      console.error("brightcove data fetch error! :(");
    })

    const FBpromised = facebookAPI();
    FBpromised.then(res => {
      console.log("facebook: ", res);
    }).catch(err => {
      console.error("facebook data fetch error! :(");
    })

    /* Only Youtube
    require('google-client-api')().then((gapi) => {
      YTpromised(gapi).then(res => {
        console.log("Youtube in App: ", res);

        let dataChunk = {};
        Object.assign(dataChunk, {
          YT: res
        });
        this.setState({dataChunk: dataChunk});
        // var FBpromised = facebookAPI();
        // FBpromised.then(res => {
        //   Object.assign(dataChunk, {FB: res});
        //   this.setState({dataChunk: dataChunk});
        //   console.log("state final: ", this.state);
        // }).catch((err) => {
        //   console.log("facebook error: ", err);
        // });
      })
    });
    */

  }

  handleMerge(state, keyword) {
    return;
  }

  handleRadioButton(selected) {
    this.setState({timeframe: selected});
  }

  handleBrightcove(selected) {
    this.setState({flag_brightcove: !this.state.flag_brightcove});
  }

  handleFacebook(selected) {
    this.setState({flag_facebook: !this.state.flag_facebook});
  }

  handleYoutube(selected) {
    this.setState({flag_youtube: !this.state.flag_youtube});
  }

  render() {
    let brightcove = this.state.flag_brightcove;
    let facebook = this.state.flag_facebook;
    let youtube = this.state.flag_youtube;

    let data = {
      brightcove, facebook, youtube
    }

    return (
      <div id="outer-container">
      <section className="container">
        <Menu className="menu" pageWrapId={"page-wrap"} outerContainerId={ "outer-container"} width={"15%"} isOpen={true} noOverlay>
          <CheckBox handleRadioButton={this.handleRadioButton} handleBrightcove={this.handleBrightcove} handleFacebook={this.handleFacebook} handleYoutube={this.handleYoutube} data={data}/>
        </Menu>
        <main id="page-wrap">
          <Header />
          <div className="top">
            <Section title="TOP PERFORMERS" data={this.state.data.most_viewed_videos[this.state.timeframe]}/>
            <Section title="PAID vs. ORGANIC" data={this.state.data.paid_organic[this.state.timeframe]}/>
            <Section title="DEVICES" data={this.state.data.devices[this.state.timeframe]}/>
          </div>
          <Section title="TOTAL VIEWS" data={this.state.data.total_views[this.state.timeframe]} />
          <Section title="TOTAL INTERACTIONS" data={this.state.data.total_interactions[this.state.timeframe]}/>
        </main>
      </section>
      </div>
    )
  }
}
