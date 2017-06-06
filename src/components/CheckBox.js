import React from 'react';

export class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brightcove: true,
      facebook: true,
      youtube: true
    }

  }

  componentDidMount() {
    this.handleRadioButton = this.handleRadioButton.bind(this);
    this.handleCheckBox1 = this.handleCheckBox1.bind(this);
    this.handleCheckBox2 = this.handleCheckBox2.bind(this);
    this.handleCheckBox3 = this.handleCheckBox3.bind(this);
  }

  handleRadioButton(e) {
    let value = e.target.value;
    this.props.onChange(name, value);
  }

  handleCheckBox1(e) {
    let name = e.target.name;
    this.setState({
      brightcove: !this.state[name]
    });
  }

  handleCheckBox2(e) {
    let name = e.target.name;
    this.setState({
      facebook: !this.state[name]
    });
  }

  handleCheckBox3(e) {
    let name = e.target.name;
    this.setState({
      youtube: !this.state[name]
    });
  }

  render() {


    return (
      <section>
        <h1 id="platforms" className="platforms-menu">Platforms</h1>
          <form>
            <h2>On-site</h2>
              <label id = "ld_label"><input type="checkbox" id="cb" name="brightcove" label={"On-Site"} checked={this.state.brightcove} onChange={this.handleCheckBox1}/>Brightcove</label>
            <h2>Off-site</h2>
            <label id = "ld_label"><input type="checkbox" id="cb" name="facebook" label={"Facebook"} checked={this.state.facebook} onChange={this.handleCheckBox2}/>Facebook</label><br/>
            <label id = "ld_label"><input type="checkbox" id="cb" name="youtube" label={"Youtube"} checked={this.state.youtube} disabled={true} onChange={this.handleCheckBox3}/>Youtube</label><br/>
          </form>

        <h1 id="timeframes" className="platforms-menu">Timeframe</h1>
          <form>
            <label id = "ld_label"><input onChange={this.handleRadioButton} type="radio" name="timeframe" id="cb" label={"24 hours"} value="daily" />24 hours</label><br/>
            <label id = "ld_label"><input onChange={this.handleRadioButton} type="radio" name="timeframe" id="cb" label={"7 days"}  value="weekly" />7 days</label>
          </form>
      </section>

    )
  }
}