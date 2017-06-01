import React from 'react';

export class CheckBox extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log("Checkbox: ", this.props);
    const handleCheckBox = this.props.onChange;
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    let value = e.target.value;
    this.props.onChange(value);
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
            <label id = "ld_label"><input onChange={this.handleOnChange} type="radio" name="timeframe" id="cb" label={"24 hours"} value="daily" />24 hours</label><br/>
            <label id = "ld_label"><input onChange={this.handleOnChange} type="radio" name="timeframe" id="cb" label={"7 days"}  value="weekly" />7 days</label>
          </form>
      </section>

    )
  }
}