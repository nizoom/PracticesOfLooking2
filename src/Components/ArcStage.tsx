import React, { useState, useEffect } from "react";
import MediaComponent from "./MediaComponent";
import "../Styles/CompiledCss/arcstage.css";
// import { updateNotes } from "../Content";
// import Sketcher from "./Sketcher/sketch";
import { ArcStageTypedProps } from "../types";

type ArcStagePropsAndFuncs = {
  ArcStageTypedProps: ArcStageTypedProps;
  handlePageChange: (direction: string) => void;
  backToTOC: () => void;
  maxPage: number;
  currentPage: number;
};

const ArcStage: React.FC<ArcStagePropsAndFuncs> = ({
  ArcStageTypedProps,
  handlePageChange,
  backToTOC,
  maxPage,
  currentPage,
}) => {
  // const [textAreaState, setTextAreaState] = useState(props.notes);
  // const handleTextChange = (event) => {
  //   setTextAreaState(event.target.value);
  // };
  // useEffect(() => {
  //   setTextAreaState(notes);
  // }, [props.page]);
  const changePage = (direction: string) => {
    // updateNotes(props.subChapter, props.page, textAreaState);
    handlePageChange(direction);
  };
  // console.log(ArcStageTypedProps);

  return (
    <div className="arc-stage-page-wrapper">
      {/* <Sketcher /> */}
      <section className="stage-grid">
        <div className="top-stage-row">
          <MediaComponent
            imgTitle={ArcStageTypedProps.imageTitle}
            imageAsset={ArcStageTypedProps.imageAsset}
            audioUrl={ArcStageTypedProps.audioUrl}
            movieStatus={ArcStageTypedProps.videoUrl ? true : false}
            videoTitle={ArcStageTypedProps.videoTitle}
            videoUrl={ArcStageTypedProps.videoUrl}
          />
        </div>

        <div className="bottom-stage-row">
          <p className="citation"> {ArcStageTypedProps.Caption} </p>
          <div className="description-and-notes-wrapper">
            <p className="image-description"> {ArcStageTypedProps.slideText}</p>
            {/* <textarea
              className="note-pad"
              value={textAreaState}
              onChange={handleTextChange}
            ></textarea> */}
          </div>
        </div>
      </section>
      <div className="buttons-section">
        <div className="back-btns-div">
          {currentPage === 0 ? null : (
            <button onClick={() => changePage("back")}>Back</button>
          )}

          <button onClick={backToTOC}>Home</button>
        </div>
        {currentPage + 1 === maxPage ? null : (
          <button className="next-btn" onClick={() => changePage("next")}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ArcStage;

// Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
// eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
// ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
// aliquip ex ea commodo consequat. Duis aute irure dolor in
// reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
// pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
// culpa qui officia deserunt mollit anim id est laborum.
