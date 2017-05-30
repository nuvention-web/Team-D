import React from 'react';
import axios from 'axios';
// import './lib/firebaseConfig.js';
import {facebookAPI} from './lib/apiConfig.js';
import {YTpromised} from './lib/YTconfig.js';
import ReactTooltip from 'react-tooltip';
import ProgressLabel from 'react-progress-label';
import Sidebar from 'react-sidebar';
import {BigQuery} from './lib/bigquery.js';
import {push as Menu } from 'react-burger-menu';
//import Checkbox from 'react-checkbox';
//import {TreeMenu, TreeNode} from 'react-tree-menu';
// test comment!!!

// Add components inside curly brackets
// import {Platform, VisualCue, Title, VideoDisplay} from './components';
import {Header, Section, Title, StackedBars} from './components';

export default class App extends React.Component {
  constructor(props) {

    super(props);
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/brightcove').then(res => {
      console.log("inside APP accesstoken: ", res);
    });

    // require('google-client-api')().then((gapi) => {
    //   YTpromised(gapi).then(res => {
    //     console.log("Youtube in App: ", res);
    //     const bigQuery = BigQuery[0];
    //     let dataChunk = {};
    //     Object.assign(dataChunk, {
    //       YT: res
    //       Ooyala: {
    //         weekly: {
    //           current: {
    //             views: +bigQuery.results_data_metrics_uniq_plays_requested,
    //             interactions: +bigQuery.results_data_metrics_embeds_copied +
    //                           +bigQuery.results_data_metrics_emails_sent,
    //           }, last: {
    //             views: +bigQuery.results_data_metrics_uniq_plays_requested - 110,
    //             interactions: +bigQuery.results_data_metrics_embeds_copied +
    //                           +bigQuery.results_data_metrics_emails_sent
    //           }
    //         },
    //         popular: {
    //           id: {
    //             interactions: +bigQuery.results_data_metrics_embeds_copied +
    //                           +bigQuery.results_data_metrics_emails_sent,
    //             platform: "Ooyala",
    //             publishDate: bigQuery.results_end_date.slice(0,9),
    //             title: bigQuery.results_data_group_name,
    //             views: +bigQuery.results_data_metrics_uniq_plays_requested
    //           }
    //         }
    //       }
    //     });
    //     var FBpromised = facebookAPI();
    //     FBpromised.then(res => {
    //       Object.assign(dataChunk, {FB: res});
    //       this.setState({dataChunk: dataChunk});
    //       console.log("state final: ", this.state);
    //     }).catch((err) => {
    //       console.log("facebook error: ", err);
    //     });
    //   })
    // });

    /* Only Youtube */
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

  handleYTChange(e) {
    if(e.target.checked){
      this.setState({
        isYT: true

      })
    } else{
      this.setState({
        isYT: false
      })
    }
  }

  handleOnSiteChange(e) {
    if(e.target.checked){
      this.setState({
        isOnSite: true

      })
    } else{
      this.setState({
        isOnSite: false
      })
    }
  }

  // handleSubmit(e) {
  //   e.preventDefault()
  // }

  // handleReadMoreFB(e) {
  //   if(e.target.checked){
  //     this.setState({
  //       isFBMetrics:"ShowMoreFBmetrics"

  //     })
  //   } else {
  //     this.setState({
  //       isFBMetrics:""
  //     })
  //   }
  // }

  // handleReadMoreInsta(e) {
  //   if(e.target.checked){
  //     this.setState({
  //       isInstaMetrics:""}
  //       )
  //   }
  // }

  render() {
    var all_data_object = {
    // in Section.js
      top_performers_data: {
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
      }, //array of 10 videos, platform, date, views, interactions

      overall_paid_organic: {
        paid: 100,
        organic: 300
      },

      overall_devices:  {
        web: 500,
        mobile: 150
      },

      overall_views: {
        facebook: 1000,
        youtube: 1500,
        onsite: 3000
      },

      overall_interactions: {
        facebook: 5000,
        youtube: 100,
        onsite: 250
      },

    // in StackedBars.js
      overall_views_sb: {
        daily: {
          current: 5,
          last: 10,
          best: 15
        },
        weekly: {
          current: 20,
          last: 25,
          best: 30
        },
        monthly: {
          current: 35,
          last: 40,
          best: 45
        }
      },

      overall_interactions_sb: {
        daily: {
          current: 6,
          last: 12,
          best: 18
        },
        weekly: {
          current: 24,
          last: 30,
          best: 36
        },
        monthly: {
          current: 42,
          last: 48,
          best: 54
        }
      }
    }

    // console.log(this.state);
    if (this.state) {
      if (this.state.dataChunk) {
        console.log("inside render: ", this.state.dataChunk);
        // Lenny
        const data = this.state.dataChunk;
        const popular = data.YT.popular;
        let sorted = [];
        for (var i in popular) {
          sorted.push(popular[i]);
          sorted.sort((prev, next) => {
            if (prev.views > next.views) return -1;
            else return 1;
          })
        }

        for (let i = 1; i <= 10; i++) {
          all_data_object.top_performers_data[i] = sorted[i - 1];
        }

        all_data_object.overall_views_sb.daily = {
          current: data.FB.daily.current.views + data.YT.daily.current.views,
          last: data.FB.daily.last.views + data.YT.daily.last.views,
          best: data.FB.daily.last.views + data.YT.daily.last.views + 50
        }

        all_data_object.overall_views_sb.weekly = {
          current: data.FB.weekly.current.views + data.YT.weekly.current.views + data.Ooyala.weekly.current.views,
          last: data.FB.weekly.last.views + data.YT.weekly.last.views + data.Ooyala.weekly.last.views,
          best: data.FB.weekly.last.views + data.YT.weekly.last.views
        }

        all_data_object.overall_views_sb.monthly = {
          current: data.FB.monthly.current.views + data.YT.monthly.current.views,
          last: data.FB.monthly.last.views + data.YT.monthly.last.views,
          best: data.FB.monthly.last.views + data.YT.monthly.last.views + 50
        }

        all_data_object.overall_interactions_sb.daily = {
          current: data.FB.daily.current.interactions + data.YT.daily.current.interactions,
          last: data.FB.daily.last.interactions + data.YT.daily.last.interactions,
          best: data.FB.daily.last.interactions + data.YT.daily.last.interactions + 50
        }

        all_data_object.overall_interactions_sb.weekly = {
          current: data.FB.weekly.current.interactions + data.YT.weekly.current.interactions + data.Ooyala.weekly.current.interactions,
          last: data.FB.weekly.last.interactions + data.YT.weekly.last.interactions + data.Ooyala.weekly.last.interactions,
          best: data.FB.weekly.last.interactions + data.YT.weekly.last.interactions
        }

        all_data_object.overall_interactions_sb.monthly = {
          current: data.FB.monthly.current.interactions + data.YT.monthly.current.interactions,
          last: data.FB.monthly.last.interactions + data.YT.monthly.last.interactions,
          best: data.FB.monthly.last.interactions + data.YT.monthly.last.interactions + 50
        }

        // Prithvi
         all_data_object.overall_paid_organic.paid = this.state.dataChunk.FB.paid.current.views;
         all_data_object.overall_paid_organic.organic = this.state.dataChunk.FB.organic.current.views;
         all_data_object.overall_devices.devices_web = this.state.dataChunk.YT.device.desktop;
         all_data_object.overall_devices.devices_mobile = this.state.dataChunk.YT.device.mobile;
         all_data_object.overall_views.facebook = this.state.dataChunk.FB.monthly.current.views;
         all_data_object.overall_views.youtube = this.state.dataChunk.YT.monthly.current.views;
         all_data_object.overall_views.onsite = this.state.dataChunk.Ooyala.weekly.current.views;

      }
    }



    //var sidebarContent = <b>Sidebar content</b>;

    return (
      <div id="outer-container">
      <section className="container">
        <Menu className="menu" pageWrapId={ "page-wrap"} outerContainerId={ "outer-container"} width={'20%'} noOverlay>
          <h1 id="platforms" className="platforms-menu">Platforms</h1>
            <label id = "ld_label"><input type="checkbox" id="cb" label={"Facebook"} checked={this.isFB} onChange={this.handleFBChange}/>Facebook</label>
            <label id = "ld_label"><input type="checkbox" id="cb" label={"Youtube"} checked={this.isYT} onChange={this.handleYTChange}/>Youtube</label>
            <label id = "ld_label"><input type="checkbox" id="cb" label={"On-Site"} checked={this.isOnSite}onChange={this.handleOnSiteChange}/>On-Site</label>
        </Menu>
        <main id="page-wrap">
          <Header />
          <div className="top">
            <Section title="TOP PERFORMERS" data={all_data_object.top_performers_data}/>
            <Section title="PAID vs. ORGANIC" data={all_data_object.overall_paid_organic}/>
            <Section title="DEVICES" data={all_data_object.overall_devices}/>
          </div>
          <Section title="VIEWS" data={all_data_object} />
          <Section title="INTERACTIONS" data={all_data_object}/>
        </main>
      </section>
      </div>
    )
  }
}
