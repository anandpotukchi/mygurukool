import React, { Component, Fragment } from "react";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FileUpload from "../FileUpload";
import Interaction from "../communication/Interaction";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Video from "../Video";
import * as _util from "../util/utils";
import * as _classworkUtil from "./ClassworkUtil";
import * as _mgkClassworkUtil from "../mgk/ClassworkUtil";
import EditCourseWork from "../EditCourseWork";

let fontSizeSmall = '1.25em';
let fontSizeBig = '1.75em';
let assignmentToEdit; // = {title:"", description:""};

export default class Assignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: "",
      assignments: "",
      userName: "",
      currentView: "",
      material: { formUrls: [] },
      turnInState: "Unknown",
      submissionId: "",
      showTeacherModal: true,
      isTeacherLogin: false,
      hasTeacherAccepted: true,
      isLoading: false,
      hasAssignments: false,
      user: this.props.user,
      isAssginmentEditHovered: false,
      assignmentFontSize: fontSizeSmall,
      showEditCourseWork: false
    };
     this.extractMaterials = this.extractMaterials.bind(this);
  }

 // componentDidMount() { 
 //   alert("componentDidMount user: " + JSON.stringify(this.state.user));
 //   this.loadAssignment(this.state.user.selectedCourseId, this.state.user.isTeacherLogin);
 // }
  
  onEditClick = (assignment) => {
    // assignmentToEdit.title = title;
    // assignmentToEdit.description = description;
    assignmentToEdit = assignment;
    // alert("Edit Clicked: " + JSON.stringify(assignment))
    this.setState({showEditCourseWork: true, 
      //selectedCourseId: this.state.selectedCourseId,
    });
  }

  toggleHover = () => {
    let fontSize= !this.state.isAssginmentEditHovered? fontSizeBig : fontSizeSmall
    this.setState(prevState => ({
      isAssginmentEditHovered: !prevState.isAssginmentEditHovered, 
      assignmentFontSize: fontSize,
    }));
  }

  editCourseWorkClick = async (showEditCourseWork) => {
    this.setState({showEditCourseWork: showEditCourseWork, 
      //selectedCourseId: this.state.selectedCourseId,
    });
  }

  getSubmissionTurnInState(courseId, assignmentId) {
    // _apiUtils.googleClassroomGetCourseworkSubmissions(courseId, assignmentId).then((response) => {
    //     let state      = response.data.studentSubmissions[0].state
    //     let submission = response.data.studentSubmissions[0].id

    //     if (this.state.turnInState  !== state)      { this.setState({ turnInState:  state}) }
    //     if (this.state.submissionId !== submission) { this.setState({ submissionId: submission}) }
    // })
  }

  handleSubmissionTurnIn(courseId, assignmentId, submissionId) {
    //_apiUtils.googleClassroomSubmissionTurnIn(courseId, assignmentId, submissionId).then((response) => {
    //  this.getSubmissionTurnInState(courseId, assignmentId)
    //})
  }

  extractMaterials(assginmentMaterials) {
    let materialObj = {
      formUrls: [],
      youtubeVideos: [],
      exerciseDetails: [],
    };
    assginmentMaterials &&
      assginmentMaterials.map(function (material, i) {
        //FORMS
        if (material && material.form) {
          let formUrl = material.form.formUrl;
          materialObj.formUrls[i] = formUrl;
        }
        //LINK
        if (material && material.link) {
          let link={};
          link.filelink = material.link.url;
          link.filename= material.link.title;
          link.thumbnailUrl= material.link.thumbnailUrl;
          materialObj.exerciseDetails[i] = link;
        }

        //VIDEO
        if (material && material.youtubeVideo) {
          let youtube = { id: "", title: "", thumbnailUrl: "" };
          youtube.id = material.youtubeVideo.id;
          youtube.name = material.youtubeVideo.title;
          youtube.thumbnailUrl = material.youtubeVideo.thumbnailUrl;
          materialObj.youtubeVideos[i] = youtube;
        }

        //DRIVE
        if (material && material.driveFile) {
          let tempExerciseDetails = {
            filename: "",
            filelink: "",
            fileThumbnailLink: "",
            //****below are, as of now not applicable for google****
            //filetype: "",  // google doesnt have an option of *BLOB* to download
            //objectFilename: "",
          };
          tempExerciseDetails.filename = material.driveFile.driveFile.title;
          tempExerciseDetails.filelink =
            material.driveFile.driveFile.alternateLink;
          tempExerciseDetails.fileThumbnailLink =
            material.driveFile.driveFile.thumbnailUrl;
          materialObj.exerciseDetails[i] = tempExerciseDetails;
        }
      });
    this.state.material = materialObj;
  }

  loadAssignment(courseId, isTeacherLogin) {
    this.setState({isLoading: true});
    //calling google assignments
    _mgkClassworkUtil.loadAssignments(courseId, isTeacherLogin).then((response) =>{
      console.log(response)
      this.setState({assignments: response, hasAssignments: response ? response.length : false, isLoading: false});
    })
  };

  render() {
    let hasDriveFiles = false;
    return (
      // <Fragment>
        <div className="tabcontent col-12">
          {this.state.isLoading ? (
            <img src={_util.loaderRandomGifs()} className="loaderIcon" />
          ) : (
            ""
          )}
          <Accordion
            allowZeroExpanded={true}
            onChange={(e) => this.setState({ openedItems: e })}
            preExpanded={this.state.openedItems}
          >
            {/* <Fragment> */}

              
              {!this.state.showEditCourseWork ? (this.state.hasAssignments ? (
                this.state.assignments.map((assignment, i) => 
                <div>
                  <div class="card mt-5">
                    <div class="card-header text-muted">
                        <div className="row">
                          <div className="col">
                            <span>
                              <strong>Exercise:</strong> {assignment.title
                                  ? assignment.title
                                  : "No Exercise Data"}
                            </span>
                          </div>
      
                          <div className="col text-right">
                            <span className="text-muted">
                              
                              {/* Date */}
                              {assignment.dueDate
                                    ? "Due Date " +
                                      assignment.dueDate.day +
                                      "." +
                                      assignment.dueDate.month +
                                      "." +
                                      assignment.dueDate.year +
                                      ",  Time: " +
                                      assignment.dueTime.hours +
                                      ":" +
                                      assignment.dueTime.minutes
                                    : ""}

                            </span>
                          </div> 
                        </div>
                    </div>  
      
                    <div class="card-body">
                      <h5 class="card-title">Instructions</h5>
                      <span className="m-0 p-0">
                        
                        {/* Assignment Description */}
                        {assignment.description ? (
                                  <ul dangerouslySetInnerHTML=
                                    {{__html: assignment.description,}}>
                                  </ul>
                                ) : (
                                  ""
                        )}

                        {this.extractMaterials(assignment.materials)}
                            { this.state.material.formUrls &&
                                  this.state.material.formUrls.map((formUrl) => (
                                    <ul>
                                      <iframe
                                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                        src={formUrl}
                                        width="100%"
                                        height="1000"
                                        allowtransparency="true"
                                        frameBorder="0"
                                      ></iframe>
                                    </ul>
                              ))}

                      </span>
                      
                      <div className="mt-3 mb-3">
                       
                        {/* Watch Video */}
                        {this.state.material.youtubeVideos &&
                                  this.state.material.youtubeVideos.map(
                                    (youtube) =>
                                      youtube ? (
                                        <Video
                                          id={youtube.id}
                                          name={youtube.title}
                                          thumbnailUrl={youtube.thumbnailUrl}
                                        />
                                      ) : (
                                        ""
                                      )
                                  )}
                      </div>

                      

                      <div className="fileblock row">
                              <div className="col-12">
                                {this.state.material.exerciseDetails &&
                                  this.state.material.exerciseDetails.map(
                                    (exerciseDetail) =>
                                      exerciseDetail
                                        ? ((hasDriveFiles = true),
                                          (
                                            <FileUpload
                                              exerciseDetails={exerciseDetail}
                                              user={this.state.user}
                                              //userName={this.state.user.name}
                                              //courseId={assignment.courseId}
                                              assignmentId={assignment.id}
                                              isActive={this.props.isActive}
                                            />
                                          ))
                                        : ""
                                  )}
                                {!hasDriveFiles ? (
                                  <FileUpload
                                    exerciseDetails={""}
                                    user={this.state.user}
                                    //userName={this.state.user.name}
                                    //courseId={assignment.courseId}
                                    assignmentId={assignment.id}
                                    isActive={this.props.isActive}
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="col-12">
                              </div>
                            </div>

                            <div className="row justify-content-end">
                      
                          { this.getSubmissionTurnInState(
                                    assignment.courseId,
                                    assignment.id
                                  )}

                          <button
                                type="button"
                                className="btn btn-primary mr-2"
                                disabled={!this.props.isActive}
                                onClick={() =>
                                  this.handleSubmissionTurnIn(
                                    assignment.courseId,
                                    assignment.id,
                                    this.state.submissionId
                                  )
                                }
                              >
                                <i className="fas fa-check"></i>{" "}
                                {this.state.turnInState}
                              </button>      
                      </div>
                          
      
                    </div>
                  </div>   

                  {/* <AccordionItem key={assignment.id} uuid={assignment.id}>
                        <AccordionItemHeading>
                          <AccordionItemButton>
                            <div className="row">
                              <div className="float-left col-12 exercisetitle">
                                {assignment.title
                                  ? assignment.title
                                  : "No Exercise Data"}
                                <small className="text-muted float-right">
                                  {assignment.dueDate
                                    ? "Due Date " +
                                      assignment.dueDate.day +
                                      "." +
                                      assignment.dueDate.month +
                                      "." +
                                      assignment.dueDate.year +
                                      ",  Time: " +
                                      assignment.dueTime.hours +
                                      ":" +
                                      assignment.dueTime.minutes
                                    : ""}
                                    <div onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                                      {this.props.user.isTeacherLogin ? 
                                      <a href="#" target="" onClick={(e) => this.onEditClick(assignment)}>
                                        <i className="fas fa-pencil-alt" style={{ fontSize: this.state.assignmentFontSize }}></i>
                                      </a>
                                      : ""}
                                    </div>
                                </small>
                              </div>
                            </div>
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                        
                          <div className="card-body">
                            <div className="row float-right">
                              {this.getSubmissionTurnInState(
                                assignment.courseId,
                                assignment.id
                              )}
                              <button
                                type="button"
                                className="btn btn-primary"
                                disabled={!this.props.isActive}
                                onClick={() =>
                                  this.handleSubmissionTurnIn(
                                    assignment.courseId,
                                    assignment.id,
                                    this.state.submissionId
                                  )
                                }
                              >
                                <i className="fas fa-check"></i>{" "}
                                {this.state.turnInState}
                              </button>
                            </div>
                            
                            <div className="row">
                              <div className="col-12">
                                <b>Exercise Instructions</b>
                                {assignment.description ? (
                                  <ul dangerouslySetInnerHTML=
                                    {{__html: assignment.description,}}>
                                  </ul>
                                ) : (
                                  ""
                                )}
                                
                                {this.extractMaterials(assignment.materials)}
                                {this.state.material.formUrls &&
                                  this.state.material.formUrls.map((formUrl) => (
                                    <ul>
                                      <iframe
                                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                        src={formUrl}
                                        width="100%"
                                        height="700"
                                        allowtransparency="true"
                                        frameBorder="0"
                                      ></iframe>
                                    </ul>
                                  ))}
                              </div>
                              <div className="col-12">
                                {this.state.material.youtubeVideos &&
                                  this.state.material.youtubeVideos.map(
                                    (youtube) =>
                                      youtube ? (
                                        <Video
                                          id={youtube.id}
                                          name={youtube.title}
                                          thumbnailUrl={youtube.thumbnailUrl}
                                        />
                                      ) : (
                                        ""
                                      )
                                  )}
                              </div>
                              <div className="col-12">
                                <Interaction
                                  // userName={this.props.userName}
                                  // isTeacherLogin={this.props.isTeacherLogin}
                                  // courseId={assignment.courseId}
                                  user={this.state.user}
                                  subjectName={assignment.title}
                                  isActive={this.props.isActive}
                                />
                              </div>
                            </div>
                            <div className="card card-body fileblock row">
                              <div className="col-12">
                                {this.state.material.exerciseDetails &&
                                  this.state.material.exerciseDetails.map(
                                    (exerciseDetail) =>
                                      exerciseDetail
                                        ? ((hasDriveFiles = true),
                                          (
                                            <FileUpload
                                              exerciseDetails={exerciseDetail}
                                              user={this.state.user}
                                              //userName={this.state.user.name}
                                              //courseId={assignment.courseId}
                                              assignmentId={assignment.id}
                                              isActive={this.props.isActive}
                                            />
                                          ))
                                        : ""
                                  )}
                                {!hasDriveFiles ? (
                                  <FileUpload
                                    exerciseDetails={""}
                                    user={this.state.user}
                                    //userName={this.state.user.name}
                                    //courseId={assignment.courseId}
                                    assignmentId={assignment.id}
                                    isActive={this.props.isActive}
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="col-12">
                              </div>
                            </div>
                          </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                 */}
                </div>
                ) 
              ) : (this.state.user.selectedCourseId && this.state.user.selectedCourseId !== 'null' ?(
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <b>
                            Congratulations! <br/><br/>
                            You are ready to create your first Coursework, following instructions shall guide you.
                          </b>
                        </div>
                        <div className="row">
                          <img
                            src={_util.loadHelpIconByName("createCourseWork")}
                            width="215"
                            height="317"
                          />
                        </div>
                      </div>
                    </div>
                  ): ""
                )): <EditCourseWork assignmentToEdit={assignmentToEdit} showEditCourseWork={this.editCourseWorkClick}/>
              }
            {/* </Fragment> */}
          </Accordion>
        </div>

      // </Fragment> 

      
    );
  }
}
