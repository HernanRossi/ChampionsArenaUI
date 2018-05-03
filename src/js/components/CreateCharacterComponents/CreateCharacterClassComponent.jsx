import React from "react";
import * as cssStyles from "../../../styles/Styles.css";
import { SelectedClassModalBody } from "./CreateCharacterClassModalContent.jsx";
import {
  Col,
  ControlLabel,
  FormGroup,
  FormControl,
  Popover,
  Tooltip,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  OverlayTrigger,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  ButtonToolbar
} from "react-bootstrap";

export default class CreateCharacterClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.setClass = this.setClass.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
      selectedClass: "",
	    allowedAlignments: ['LG', 'NG', 'CG', 'LN','N','CN','LE','NE','CE'],
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  setClass(e) {
    const targetText = e.target.textContent.toString();
    this.props.updateClass(targetText);
    this.handleShow();
    this.setState({ selectedClass: targetText });
  }

  render() {
    const popover = (
      <Popover id={"modal-popover"} title={"popover"}>
        Placeholder text for popover
      </Popover>
    );
    const tooltip = <Tooltip id={"modal-tooltip"}>Tooltip text </Tooltip>;
    return (
      <FormGroup>
        <Col sm={1} />
        <Col
          componentClass={ControlLabel}
          sm={2}
          className={cssStyles.createColLabelStyle}
        ><div style={{fontSize:'19px',fontFamily: "'Josefin Sans', sans-serif"}}>Class:</div>
        </Col>
        <Col sm={7}>
          <ButtonToolbar>
            <ToggleButtonGroup
              type="radio"
              name="raceValue"
              onClick={this.setClass}
              className={cssStyles.alignmentButtonGroupParent}
            >
	            <ToggleButton
		            value={"Barbarian"}
		            className={cssStyles.alignmentButtonGroup}
	            >
		            Barbarian
	            </ToggleButton>
              <ToggleButton
                value={"Monk"}
                className={cssStyles.alignmentButtonGroup}
              >
                Monk
              </ToggleButton>
              <ToggleButton
                value={"Wizard"}
                className={cssStyles.alignmentButtonGroup}
              >
                Wizard
              </ToggleButton>
              <ToggleButton
                value={"Ranger"}
                className={cssStyles.alignmentButtonGroup}
              >
                Ranger
              </ToggleButton>
              <ToggleButton
                value={"Druid"}
                className={cssStyles.alignmentButtonGroup}
              >
                Druid
              </ToggleButton>
              <ToggleButton
                value={"Paladin"}
                className={cssStyles.alignmentButtonGroup}
              >
                Paladin
              </ToggleButton>
              <ToggleButton
                value={"Sorcerer"}
                className={cssStyles.alignmentButtonGroup}
              >
                Sorcerer
              </ToggleButton>
              <ToggleButton
                value={"Rogue"}
                className={cssStyles.alignmentButtonGroup}
              >
                Rogue
              </ToggleButton>
              <ToggleButton
                value={"Fighter"}
                className={cssStyles.alignmentButtonGroup}
              >
                Fighter
              </ToggleButton>{" "}
              <ToggleButton
                value={"Cleric"}
                className={cssStyles.alignmentButtonGroup}
              >
                Cleric
              </ToggleButton>{" "}

	            <ToggleButton
                value={"Bard"}
                className={cssStyles.alignmentButtonGroup}
              >
                Bard
              </ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </Col>
        <Modal show={this.state.show} onHide={this.handleClose} className={cssStyles.createHeroClassModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.selectedClass}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SelectedClassModalBody selectedClass={this.state.selectedClass} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </FormGroup>
    );
  }
}



