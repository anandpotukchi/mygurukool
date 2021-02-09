import React, { Component } from "react";
import SplitPane from "react-split-pane";
import Classwork from "./Classwork";
import Conference from "./communication/Conference";
import Header from "./Header";
// import CustomScroll from "react-custom-scroll";
// import "../scss/customScroll.css";
import { Scrollbars } from "react-custom-scrollbars";
import * as _constants from "./util/constants";
import { Wrapper } from "./util/Wrapper";
import FloatingButton from "./util/FloatingButton";
import GroupName from "./GroupName";
// import GroupNameDropdown from "./util/DropdownUtil";
import CreateCourse from "./CreateCourse";
import Welcome from "./Welcome";
import {DEFAULT_GROUP_NAME} from "./util/constants";

import * as _googleClassworkUtil from "./google//ClassworkUtil"

class Home extends Component {
  constructor() {
    super();
    this.toggleBtmHeight = this.toggleBtmHeight.bind(this);
    this.state = {
      userData: { name: "name", group: [DEFAULT_GROUP_NAME], isTeacherLogin: false, selectedCourseId: 'null' },
      cssContainer: "container",
      showCreateCourse:false,
    };
    this.handleUserData = this.handleUserData.bind(this);
    this.handleConferencePanelSize = this.handleConferencePanelSize.bind(this);
    this.floatingButtonAction = this.floatingButtonAction.bind(this);
    this.child = React.createRef();
  }
  componentWillMount() {
    let provider = sessionStorage.getItem(_constants.LOGIN_PROVIDER)

    if (provider === _constants.GOOGLE) {
      _googleClassworkUtil.autoAcceptCourseInvitations()
    }
  }
  componentDidMount() {
    this.setState({
      btmHeight: "",
      showConfPane: false,
      splitPercentage: "100%",
    });
  }

  handleUserData = (userData) => {
    this.setState({
      userData: userData,
    });
  };

  floatingButtonAction = (performAction) => {
    if(performAction) this.handleConferencePanelSize(!this.state.showConfPane ? 0 : -1);
  }

  createCourseClick = (showCreateCourse) => {
    this.setState({showCreateCourse: showCreateCourse});
  }

  groupSelection = (groupName) => {
    this.child.loadCourses(groupName);
  }

  welcomeAction = (showCreateCourse) => {
    this.createCourseClick(showCreateCourse);
  }

  handleConferencePanelSize = (resize) => {
    //Conference Pane
    //=> resize: -1:close window; 0:minimize(50%); 1:maximize(100%)
    let size = "50%"; //resize === 0
    let keepConfPaneOpen = true;
    if (resize === 1) {
      size = "0%";
    } else if (resize === -1) {
      size = "100%";
      keepConfPaneOpen = false;
    }
    this.setState({
      splitPercentage: size,
      showConfPane: keepConfPaneOpen,
    });
    keepConfPaneOpen
      ? (this.state.cssContainer = "container-conference")
      : (this.state.cssContainer = "container");
  };

  toggleBtmHeight(newSize) {
    this.setState({ btmHeight: newSize + "px" });
  }

  render() {
    return (
      <Wrapper>
        <Header
          isSignedIn={true}
          studentName={
            this.state.userData ? this.state.userData.name : "User"
          }
        />     
        {<FloatingButton performAction={this.floatingButtonAction} 
                         showCreateCourse={this.createCourseClick}
                         />}

          
        <div className={this.state.cssContainer}>
          <div className="row section-nav">
            <div className="col-12">
              <div className="alert alert-primary">
                {/* role="alert"> */}
                <span>
                  {/* Group Name*/}
                  <b>
                    {<GroupName group={this.state.userData.group} groupSelection={this.groupSelection}/>}
                    {/* {<GroupNameDropdown dropdownTitleText="Class" itemList={this.state.userData.group} itemSelection={this.groupSelection}/>} */}
                  </b>
                </span>
                
              </div>
            </div>
          </div>
        </div>
    
        {!this.state.showCreateCourse ? 
          <SplitPane
            className="crazy-scroll"
            split="vertical"
            defaultSize={this.state.splitPercentage}
            onChange={(size) => this.toggleBtmHeight(size)}
          >
            <Scrollbars>
              <Classwork ref={instance => { this.child = instance; }} userData={this.handleUserData} expandArchive={true}/>
              {/* <Student userData={this.handleUserData} /> */}
            </Scrollbars>
            {/* <CustomScroll allowOuterScroll={true} flex="1">
              <Student userData={this.handleUserData} />
            </CustomScroll> */}
            {this.state.showConfPane ? (
              <Conference
                paneMaximize={this.handleConferencePanelSize}
                bottomHeight={this.state.btmHeight}
                userData={this.state.userData}
              />
            ) : (
              ""
            )}
          </SplitPane>
        : 
         <CreateCourse hideCreateCourse={this.createCourseClick}/>
        }
        {this.state.userData.group.length === 0 ? <Welcome welcomeAction={this.welcomeAction}/>:""}
      </Wrapper>
    );
  }
}
export default Home;
