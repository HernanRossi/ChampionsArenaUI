import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import store from "../store/index.js";
import * as HeroActionCreators from "../actions/index.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class CreateHeroComponent extends React.Component {
  constructor(props) {
    super(props);
    // STR, DEX, CON, INT, WIS, CHA
    this.generateStats = this.generateStats.bind(this);
	  this.createNewHero = this.createNewHero.bind(this);
    this.state = {
      heroStats: {
        STR: 15,
        DEX: 14,
        CON: 13,
        INT: 12,
        WIS: 10,
        CHA: 8
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
	  const { dispatch } = props;
	  this.boundActionCreators = bindActionCreators(HeroActionCreators, dispatch);
  }

  generateStats() {
    const newStats = [];

    let i;
    let j;
    let currentStat = 0;
    let statRolls = [];
    for (i = 0; i < 6; i += 1) {
      statRolls = [];
      currentStat = 0;
      for (j = 0; j < 4; j += 1) {
        statRolls.push(Math.floor(Math.random() * 6) + 1);
      }
      statRolls.sort();
      currentStat = statRolls[1] + statRolls[2] + statRolls[3];
      newStats.push(currentStat);
    }
    this.setState({
      heroStats: {
        STR: newStats[0],
        DEX: newStats[1],
        CON: newStats[2],
        INT: newStats[3],
        WIS: newStats[4],
        CHA: newStats[5]
      }
    });
  }

	createNewHero(newHero) {
		let { dispatch } = this.props;
		let action = HeroActionCreators.createHero(newHero);
		dispatch(action);
	}

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.heroForm;
    this.createNewHero({
      name: form.name.value,
      class: form.class.value,
      race: form.race.value,
      title: form.title.value,
      age: form.age.value,
      level: 5,
      XP: 0,
      STR: this.state.heroStats.STR,
      DEX: this.state.heroStats.DEX,
      CON: this.state.heroStats.CON,
      INT: this.state.heroStats.INT,
      WIS: this.state.heroStats.WIS,
      CHA: this.state.heroStats.CHA,
      attributePointsToSpend: 0,
      items: {},
      abilities: {},
      traits: {}
    });
    form.reset();
    this.setState({
      heroStats: {
        STR: 15,
        DEX: 14,
        CON: 13,
        INT: 12,
        WIS: 10,
        CHA: 8
      }
    });
  }

  render() {
    const styles = {
      buttonStyle: {
        backgroundColor: "#fd9c47"
      }
    };
    return (
      <div>
        <button onClick={this.generateStats}> Roll for Stats</button>
        <form name="heroForm" onSubmit={this.handleSubmit}>
          <input type="text" name="name" placeholder="Name" />
          <select name="race">
            <option value="Human">Human</option>
            <option value="Dwarf">Dwarf</option>
            <option value="Half-Orc">Half-Orc</option>
            <option value="Elf">Elf</option>
            <option value="Gnome">Gnome</option>
            <option value="Half-Elf">Half-Elf</option>
            <option value="Halfling">Halfling</option>
          </select>
          <select name="class">
            <option value="Monk">Monk</option>
            <option value="Ranger">Ranger</option>
            <option value="Wizard">Wizard</option>
            <option value="Druid">Druid</option>
            <option value="Fighter">Fighter</option>
            <option value="Paladin">Paladin</option>
            <option value="Sorcerer">Sorcerer</option>
            <option value="Rogue">Rogue</option>
            <option value="Cleric">Cleric</option>
            <option value="Warlock">Warlock</option>
          </select>
          {/*<input type="text" name="title" placeholder="Title" />*/}
          <input type="text" name="age" placeholder="Age" />
          <StatsTable stats={this.state.heroStats} />
          <button style={styles.buttonStyle}>Create New Hero</button>
        </form>
        <Link to="/heros">Back to hero list</Link>
      </div>
    );
  }
}

function StatsTable(props) {
  const borderedStyle = { border: "1px solid silver", padding: 4 };
  return (
    <table className={borderedStyle}>
      <tbody>
        <tr>
          <td>STR: {props.stats.STR}</td>
          <td>DEX: {props.stats.DEX}</td>
          <td>CON: {props.stats.CON}</td>
          <td>INT: {props.stats.INT}</td>
          <td>WIS: {props.stats.WIS}</td>
          <td>CHA: {props.stats.CHA}</td>
        </tr>
      </tbody>
    </table>
  );
}

const { number, shape } = PropTypes;
StatsTable.propTypes = {
  stats: shape({
    STR: number.isRequired,
    DEX: number.isRequired,
    CON: number.isRequired,
    INT: number.isRequired,
    WIS: number.isRequired,
    CHA: number.isRequired
  }).isRequired
};

export default withRouter(connect()(CreateHeroComponent));