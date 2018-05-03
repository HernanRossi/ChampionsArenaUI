import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import * as cssStyles from "../../../styles/Styles.css";
import store from "../../store/index.js";

import {
  Button,
  ButtonToolbar,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  InputGroup,
  Panel,
  Row
} from "react-bootstrap";

class CharacterFilter extends React.Component {
  constructor(props, context) {
    super(props, context);
    CharacterFilter.createInitFilter = CharacterFilter.createInitFilter.bind(this);
    const newInitFilter = CharacterFilter.createInitFilter(this.props.initFilter);
    this.applyFilter = this.applyFilter.bind(this);
    this.onChangeRace = this.onChangeRace.bind(this);
    this.onChangeClass = this.onChangeClass.bind(this);
    this.onChangeLevelLte = this.onChangeLevelLte.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);

    this.state = {
      class: newInitFilter.class,
      race: newInitFilter.race,
      level_gte: newInitFilter.level_gte,
      level_lte: newInitFilter.level_lte,
      changed: false,
      open: true
    };
  }

  static createInitFilter(oldInitFilter) {
    let queryString = oldInitFilter.split("&");
    let newInitFilter = {};
    const queryLength = queryString.length;
    if(queryLength > 1) {
	    for (let i = 1; i < queryLength ; i += 1) {
		    let currentFilter = queryString[i].split("=");
		    let key = currentFilter[0];
		    newInitFilter[key] = currentFilter[1];
		    console.log(currentFilter);
	    }
    }
    return newInitFilter;
  }

  componentWillReceiveProps(newProps) {
    newProps.initFilter = CharacterFilter.createInitFilter(newProps.initFilter);
    this.setState({
      class: newProps.initFilter.class,
      race: newProps.initFilter.race,
      level_gte: newProps.initFilter.level_gte,
      level_lte: newProps.initFilter.level_lte,
      changed: false
    });
  }

  onChangeRace(e) {
    this.setState({ race: e.target.value, changed: true });
  }

  onChangeClass(e) {
    this.setState({ class: e.target.value, changed: true });
  }

  onChangeLevelLte(e) {
    const levelString = e.target.value;
    if (levelString.match(/^\d*$/)) {
      this.setState({ level_lte: e.target.value, changed: true });
    }
  }

  onChangeLevelGte(e) {
    const levelString = e.target.value;
    if (levelString.match(/^\d*$/)) {
      this.setState({ level_gte: e.target.value, changed: true });
    }
  }

  resetFilter() {
    let filters = ['class', 'race','level_gte','level_lte'];
    for(let index in filters){
      if(this.props.initFilter[filters[index]] === undefined){
	      this.props.initFilter[filters[index]]='';
      }
    }
    this.setState({
      class: this.props.initFilter.class,
      race: this.props.initFilter.race,
      level_gte: this.props.initFilter.level_gte,
      level_lte: this.props.initFilter.level_lte,
      changed: false
    });
  }

  clearFilter() {
    this.props.setFilter({});
  }

  applyFilter() {
    const newFilter = {};
    if (this.state.race) newFilter.race = this.state.race;
    if (this.state.class) newFilter.class = this.state.class;
    if (this.state.level_gte) newFilter.level_gte = this.state.level_gte;
    if (this.state.level_lte) newFilter.level_lte = this.state.level_lte;
    this.props.setFilter(newFilter);
  }

  render() {
    return (
      <Panel defaultExpanded>
        <Panel.Heading className={cssStyles.panelHeader}>
          <Panel.Title toggle className={cssStyles.panelHeaderText}>
            Filter Characters
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <Row>
              <Col xs={6} sm={4} md={3} lg={3}>
                <FormGroup>
                  <ControlLabel>Class</ControlLabel>
                  <FormControl
                    componentClass={"select"}
                    value={this.state.class}
                    onChange={this.onChangeClass}
                  >
                    <option value={""}>Any</option>
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
                    <option value="Bard">Bard</option>
                    <option value="Barbarian">Barbarian</option>
                  </FormControl>
                </FormGroup>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3}>
                <FormGroup>
                  <ControlLabel>Race</ControlLabel>
                  <FormControl
                    componentClass={"select"}
                    value={this.state.race}
                    onChange={this.onChangeRace}
                  >
                    <option value={''}>Any</option>
                    <option value={"Human"}>Human</option>
                    <option value={"Dwarf"}>Dwarf</option>
                    <option value={"Elf"}>Elf</option>
                    <option value={"Gnome"}>Gnome</option>
                    <option value={"Half-Elf"}>Half-Elf</option>
                    <option value={"Half-Orc"}>Half-Orc</option>
                    <option value="Halfling">Halfling</option>
                  </FormControl>
                </FormGroup>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3}>
                <FormGroup>
                  <ControlLabel>Level</ControlLabel>
                  <InputGroup>
                    <FormControl
                      value={this.state.level_gte}
                      onChange={this.onChangeLevelGte.bind(this)}
                    />
                    <InputGroup.Addon>-</InputGroup.Addon>
                    <FormControl
                      value={this.state.level_lte}
                      onChange={this.onChangeLevelLte.bind(this)}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <ControlLabel>&nbsp;</ControlLabel>
                  <ButtonToolbar>
                    <Button
                      bsStyle={"primary"}
                      onClick={this.applyFilter.bind(this)}
                    >
                      Apply
                    </Button>
                    <Button
                      onClick={this.resetFilter}
                      disabled={!this.state.changed}
                    >
                      Reset
                    </Button>
                    <Button onClick={this.clearFilter.bind(this)}>Clear</Button>
                  </ButtonToolbar>
                </FormGroup>
              </Col>
            </Row>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }
}

CharacterFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  initFilter: PropTypes.object.isRequired
};

export default withRouter(CharacterFilter);