import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import React, { Component } from "react";
import * as _classworkUtil from "../google/ClassworkUtil";

// let actionList = [`<Action text="Conference" onClick={this.onConferenceClick}>
// <i className="far fa-comments fa-1g" />
// </Action>`, `<Action text="Archive" onClick={() => alert("archive display")}>
// <i className="far fa-file-archive fa-1g" />
// </Action>`];



export default class FloatingButton extends Component {
  onConferenceClick = () => {
    this.props.performAction(true);
  };

  onClickCreateCourse  = () => {
    this.props.showCreateCourse(true);
  }

  onClickCreateCourseWork  = () => {
    this.props.showCreateCourseWork(true);
    //window.location.href = '/home/createcourseWork';
  }

  onClickAddPeople  = () => {
    this.props.showInvitePeople(true);
  }

//   var mydict = new Array();
// mydict['onClickMethod']   = 'this.onConferenceClick';
/* Somewhere: */
// window.settings = {
//   /* [..] Other settings */
//   functionName: 'this.onConferenceClick'
//   /* , [..] More settings */
// };
// let fn = window[settings.functionName];
// let actionList = [{text: 'Conference', fn, imgIcon: 'far fa-comments fa-1g'}, 
// //{text: 'Archive', onClickMethod: '() => alert("archive")', imgIcon: 'far fa-file-archive fa-1g'}
// ];

  render() {
    return (
      <>
        <Fab
          mainButtonStyles={{
            backgroundColor: "#fff",
            color: "#074EE8",
          }}
          position={{
            bottom: 50,
            left: '44%',
          }}
          icon={<i className="fas fa-file-archive fa-2x" />}
          onClick={() => alert("archive")}
         
          
        >

        
         {/* {actionList.map((action) => (
           <Action text={action.text} onClick={action.fn}>
            <i className={action.imgIcon} />
           </Action>
         )
         )}  */}
         {/* {actionList.map((action) => <li>{action}</li>) } */}
        
         {this.props.isTeacherLogin ? 
         <Action text="Create Course" onClick={this.onClickCreateCourse}>
           <i className="fas fa-plus-circle fa-1g" />
         </Action>:""}
         {this.props.isTeacherLogin && (this.props.selectedCourseId !== 'null') ? 
          <Action text="Create Coursework" onClick={this.onClickCreateCourseWork} > 
            <i className="fas fa-tasks fa-1g" />
          </Action>
          : ""}
         {this.props.isTeacherLogin && (this.props.selectedCourseId !== 'null') ? 
          <Action text="People" onClick={this.onClickAddPeople} > 
            <i className="fas fa-user-plus fa-1g" />
          </Action>
          : ""}
        </Fab>

        <Fab
          mainButtonStyles={{
            backgroundColor: "#fff",
            color: "#074EE8",
          }}
          position={{
            bottom: 50,
            left: '50%',
          }}
          icon={<i className="fas fa-video fa-2x" />}
          onClick={this.onConferenceClick}
        >

        
         {/* {actionList.map((action) => (
           <Action text={action.text} onClick={action.fn}>
            <i className={action.imgIcon} />
           </Action>
         )
         )}  */}
         {/* {actionList.map((action) => <li>{action}</li>) } */}
         <Action text="Conference" onClick={this.onConferenceClick}>
           <i className="far fa-comments fa-1g" />
         </Action>
         <Action text="Archive" onClick={() => alert("archive")}>
           <i className="fas fa-file-archive fa-1g" />
         </Action>
         {this.props.isTeacherLogin ? 
         <Action text="Create Course" onClick={this.onClickCreateCourse}>
           <i className="fas fa-plus-circle fa-1g" />
         </Action>:""}
         {this.props.isTeacherLogin && (this.props.selectedCourseId !== 'null') ? 
          <Action text="Create Coursework" onClick={this.onClickCreateCourseWork} > 
            <i className="fas fa-tasks fa-1g" />
          </Action>
          : ""}
         {this.props.isTeacherLogin && (this.props.selectedCourseId !== 'null') ? 
          <Action text="People" onClick={this.onClickAddPeople} > 
            <i className="fas fa-user-plus fa-1g" />
          </Action>
          : ""}
        </Fab>
      </>
    );
  }
}
