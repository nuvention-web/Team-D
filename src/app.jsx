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
      // first_load: true,
      timeframe: "daily",
      flag_brightcove: false,
      flag_facebook: false,
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
              best: 1000000
            },
            brightcove: {
              current: 0,
              last: 0,
              best: 1000000
            }
          },
          weekly: {
            facebook: {
              current: 0,
              last: 0,
              best: 1000000
            },
            brightcove: {
              current: 0,
              last: 0,
              best: 1000000
            }
          }
        },
        total_interactions: {
          daily: {
            facebook: {
              current: 0,
              last: 0,
              best: 1000000
            },
            brightcove: {
              current: 0,
              last: 0,
              best: 1000000
            }
          },
          weekly: {
            facebook: {
              current: 0,
              last: 0,
              best: 1000000
            },
            brightcove: {
              current: 0,
              last: 0,
              best: 1000000
            }
          }
        }
      }
    }

    this.handleRadioButton = this.handleRadioButton.bind(this);
    this.handleBrightcove = this.handleBrightcove.bind(this);
    this.handleFacebook = this.handleFacebook.bind(this);
    this.handleYoutube = this.handleYoutube.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/brightcove').then(res => {
      console.log("brightcove: ", res);
      this.setState({
        brightcove: res
      });
    }).catch(err => {
      console.error("brightcove data fetch error! :(");
    })

    const FBpromised = facebookAPI();
    FBpromised.then(res => {
      console.log("facebook: ", res);
      this.setState({
        facebook: res
      });
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

  handleData(uh, platform, keyword) {
    let state = Object.assign({}, this.state)
    console.log("state:", state);
    let response = this.state[platform];
    console.log("response:", response);
    let data = state.data;

    if (state && response && this.state) {

      if (keyword === "-") {
        // paid_organic
        if (platform !== "brightcove") {
          data.paid_organic.daily.organic += response.daily.current.views;
        } else {
          data.paid_organic.daily.paid += response.daily.current.views;
        }

        // devices
        data.devices.daily.mobile += response.daily.current.devices.mobile;
        data.devices.daily.web += response.daily.current.devices.web;
        data.devices.weekly.mobile += response.weekly.current.devices.mobile;
        data.devices.weekly.web += response.weekly.current.devices.web;

        // views
        data.total_views.daily[platform].current += response.daily.current.views;
        data.total_views.daily[platform].last += response.daily.last.views;
        data.total_views.weekly[platform].current += response.weekly.current.views;
        data.total_views.weekly[platform].last += response.weekly.last.views;

        // interactions
        data.total_interactions.daily[platform].current += response.daily.current.interactions;
        data.total_interactions.daily[platform].last += response.daily.last.interactions;
        data.total_interactions.weekly[platform].current += response.weekly.current.interactions;
        data.total_interactions.weekly[platform].last += response.weekly.last.interactions;
      } else if (keyword === "+") {
        if (platform !== "brightcove") {
          data.paid_organic.daily.organic -= response.daily.current.views;
        } else {
          data.paid_organic.daily.paid -= response.daily.current.views;
        }

        // devices
        data.devices.daily.mobile -= response.daily.current.devices.mobile;
        data.devices.daily.web -= response.daily.current.devices.web;
        data.devices.weekly.mobile -= response.weekly.current.devices.mobile;
        data.devices.weekly.web -= response.weekly.current.devices.web;

        // views
        data.total_views.daily[platform].current -= response.daily.current.views;
        data.total_views.daily[platform].last -= response.daily.last.views;
        data.total_views.weekly[platform].current -= response.weekly.current.views;
        data.total_views.weekly[platform].last -= response.weekly.last.views;

        // interactions
        data.total_interactions.daily[platform].current -= response.daily.current.interactions;
        data.total_interactions.daily[platform].last -= response.daily.last.interactions;
        data.total_interactions.weekly[platform].current -= response.weekly.current.interactions;
        data.total_interactions.weekly[platform].last -= response.weekly.last.interactions;
      }
      state.first_load = false;
      this.setState({
        state
      });
    }

  }

  handleRadioButton(selected) {
    this.setState({timeframe: selected});
  }

  handleBrightcove(selected) {
    this.setState({flag_brightcove: !this.state.flag_brightcove});
    let flag = this.state.flag_brightcove;
    if (flag) {
      this.handleData(this.state, "brightcove", "+")
    } else {
      this.handleData(this.state, "brightcove", "-")
    }
  }

  handleFacebook(selected) {
    this.setState({flag_facebook: !this.state.flag_facebook});
    let flag = this.state.flag_facebook;
    if (flag) {
      this.handleData(this.state, "facebook", "+")
    } else {
      this.handleData(this.state, "facebook", "-")
    }
  }

  handleYoutube(selected) {
    this.setState({flag_youtube: !this.state.flag_youtube});
    let flag = this.state.flag_youtube;
    if (flag) {
      this.handleData(this.state, "youtube", "+")
    } else {
      this.handleData(this.state, "youtube", "-")
    }
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
