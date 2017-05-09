import React from 'react';
// import './lib/firebaseConfig.js';
import {facebookAPI} from './lib/apiConfig.js';
import {YTpromised} from './lib/YTconfig.js';
import ReactTooltip from 'react-tooltip';
import ProgressLabel from 'react-progress-label';
import Sidebar from 'react-sidebar';
import {BigQuery} from './lib/bigquery.js';

// Add components inside curly brackets
// import {Platform, VisualCue, Title, VideoDisplay} from './components';
import {Header, Section, Title, StackedBars} from './components';

export default class App extends React.Component {
  constructor(props) {

    super(props);
  }

  componentDidMount() {
    require('google-client-api')().then((gapi) => {
      YTpromised(gapi).then(res => {
        console.log("Youtube in App: ", res);
        const bigQuery = BigQuery[0];
        let dataChunk = {};
        Object.assign(dataChunk, {
          YT: res,
          Ooyala: {
            weekly: {
              current: {
                views: +bigQuery.results_data_metrics_uniq_plays_requested,
                interactions: +bigQuery.results_data_metrics_embeds_copied +
                              +bigQuery.results_data_metrics_emails_sent,
              }, last: {
                views: +bigQuery.results_data_metrics_uniq_plays_requested - 110,
                interactions: +bigQuery.results_data_metrics_embeds_copied +
                              +bigQuery.results_data_metrics_emails_sent
              }
            },
            popular: {
              id: {
                interactions: +bigQuery.results_data_metrics_embeds_copied +
                              +bigQuery.results_data_metrics_emails_sent,
                platform: "Ooyala",
                publishDate: bigQuery.results_end_date.slice(0,9),
                title: bigQuery.results_data_group_name,
                views: +bigQuery.results_data_metrics_uniq_plays_requested
              }
            }
          }
        });
        console.log("final: ", dataChunk);
        var FBpromised = facebookAPI();
        FBpromised.then(res => {
          // console.log("facebook in app gaaaaian", res);
          // this.setState({"res": res});
          Object.assign(dataChunk, {FB: res});
          // console.log("done? ", dataChunk);
          // console.log("facebookData in App: ", this.state);
          this.setState({dataChunk: dataChunk});
          console.log("state final: ", this.state);
        }).catch((err) => {
          console.log(err);
        });
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
        isInstaMetrics:""}
        )
    }
  }

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
          <Section title="TOP PERFORMERS" data={all_data_object.top_performers_data}/>
          <Section title="PAID vs. ORGANIC" data={all_data_object.overall_paid_organic}/>
          <Section title="DEVICES" data={all_data_object.overall_devices}/>
        </div>
        <Section title="VIEWS" data={all_data_object} />
        <Section title="INTERACTIONS" data={all_data_object}/>
      </section>
    )
  }
}
