import React from 'react';
import axios from 'axios';
import './lib/firebaseConfig.js';
import {facebookAPI} from './lib/apiConfig.js';
import {YTpromised} from './lib/YTconfig.js';
import ReactTooltip from 'react-tooltip';
import ProgressLabel from 'react-progress-label';
// import Sidebar from 'react-sidebar';
import {BigQuery} from './lib/bigquery.js';
import {bubble as Menu } from 'react-burger-menu';
import {Header, Section, Title, StackedBars, CheckBox} from './components';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // first_load: true,
      load: 0,
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
            paid: 50,
            organic: 50
          },
          weekly: {
            paid: 50,
            organic: 50
          }
        },
        devices: {
          daily: {
            web: 50,
            mobile: 50
          },
          weekly: {
            web: 50,
            mobile: 50
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
    axios.get('https://arcane-sierra-46569.herokuapp.com/api/brightcove').then(res => {
      console.log("brightcove: ", res);
      let data = {
        daily: {
          current: {
            devices: {
              mobile: 0,
              web: 0
            },
            interactions: 0,
            views: 0,
            items: null
          },
          last: {
            devices: {
              mobile: 0,
              web: 0
            },
            interactions: 0,
            views: 0
          }
        },
        weekly: {
          current: {
            devices: {
              mobile: 0,
              web: 0
            },
            interactions: 0,
            views: 0,
            items: null
          },
          last: {
            devices: {
              mobile: 0,
              web: 0
            },
            interactions: 0,
            views: 0
          }
        }
      };

      data.daily.current.interactions = res.data.daily.current.summary.video_impression;
      data.daily.current.views = res.data.daily.current.summary.video_view;
      data.daily.last.interactions = res.data.daily.last.summary.video_impression;
      data.daily.last.views = res.data.daily.last.summary.video_view;

      data.weekly.current.interactions = res.data.weekly.current.summary.video_impression;
      data.weekly.current.views = res.data.weekly.current.summary.video_view;
      data.weekly.last.interactions = res.data.weekly.last.summary.video_impression;
      data.weekly.last.views = res.data.weekly.last.summary.video_view;

      data.daily.current.items = res.data.daily.current.items;
      data.weekly.current.items = res.data.weekly.current.items;

      this.setState({
        brightcove: data
      });

      this.setState({
        load: this.state.load + 1
      })

      if (this.state.load === 1) {
        alert("load complete");
      }

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
    // console.log("state:", state);
    let response = this.state[platform];
    // console.log("response:", response);
    let data = state.data;

    if (state && response && this.state) {

      if (keyword === "-") {
        // paid_organic
        if (platform !== "brightcove") {
          data.paid_organic.daily.organic += response.daily.current.views;
        } else {
          data.paid_organic.daily.paid += response.daily.current.views;
          for (var i = 1; i <= 10; i++) {
            state.data.most_viewed_videos.daily[i] = {
              video: response.daily.current.items[i-1].video_name,
              platform: platform,
              views: response.daily.current.items[i-1].video_view,
              interactions: response.daily.current.items[i-1].video_impression
            }

            state.data.most_viewed_videos.weekly[i] = {
              video: response.weekly.current.items[i-1].video_name,
              platform: platform,
              views: response.weekly.current.items[i-1].video_view,
              interactions: response.weekly.current.items[i-1].video_impression
            }
          }
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

        state.data.most_viewed_videos = {
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
        }
      }
      state.first_load = false;
      state.data.total_views.daily.facebook.best = state.data.total_views.daily.facebook.current + state.data.total_views.daily.facebook.last
      state.data.total_views.daily.brightcove.best = state.data.total_views.daily.brightcove.current + state.data.total_views.daily.brightcove.last
      state.data.total_views.weekly.facebook.best = state.data.total_views.weekly.facebook.current + state.data.total_views.weekly.facebook.last
      state.data.total_views.weekly.brightcove.best = state.data.total_views.weekly.brightcove.current + state.data.total_views.weekly.brightcove.last
      state.data.total_interactions.daily.facebook.best = state.data.total_interactions.daily.facebook.current + state.data.total_views.daily.facebook.last
      state.data.total_interactions.daily.brightcove.best = state.data.total_interactions.daily.brightcove.current + state.data.total_views.daily.brightcove.last
      state.data.total_interactions.weekly.facebook.best = state.data.total_interactions.weekly.facebook.current + state.data.total_views.weekly.facebook.last
      state.data.total_interactions.weekly.brightcove.best = state.data.total_interactions.weekly.brightcove.current + state.data.total_interactions.weekly.brightcove.last

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
