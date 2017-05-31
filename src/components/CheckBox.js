import React from 'react';

export class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <section>
        <h1 id="platforms" className="platforms-menu">Platforms</h1>
          <form>
            <h2>On-site</h2>
              <label id = "ld_label"><input type="checkbox" id="cb" label={"On-Site"} checked={this.isOnSite}onChange={this.handleOnSiteChange}/>Brightcove</label>
            <h2>Off-site</h2>
            <label id = "ld_label"><input type="checkbox" id="cb" label={"Facebook"} checked={this.isFB} onChange={this.handleFBChange}/>Facebook</label><br/>
            <label id = "ld_label"><input type="checkbox" id="cb" label={"Youtube"} checked={this.isYT} disabled={true} onChange={this.handleYTChange}/>Youtube</label><br/>
          </form>

        <h1 id="timeframes" className="platforms-menu">Timeframe</h1>
          <form>
            <label id = "ld_label"><input type="radio" name="timeframe" id="cb" label={"24 hours"} checked={this.isFB} onChange={this.handleFBChange}/>24 hours</label><br/>
            <label id = "ld_label"><input type="radio" name="timeframe" id="cb" label={"7 days"} checked={this.isYT} onChange={this.handleYTChange}/>7 days</label>
          </form>
      </section>

    )
  }
}