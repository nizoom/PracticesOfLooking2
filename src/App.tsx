import "./Styles/App.css";
import "./Styles/CompiledCss/globalstyles.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getChapterNames } from "./Content";
import ChapterHandler from "./Components/ChapterHandler";
import { currentChapterType } from "types";
import React from "react";

const App = () => {
  const [currentChapter, setCurrentChapter] = useState<currentChapterType>({
    chapterNumber: 0,
    chapterName: "",
  });
  const handleChapterSelection = (
    chapterNumber: number,
    chapterName: string
  ) => {
    setCurrentChapter({
      chapterNumber: chapterNumber,
      chapterName: chapterName,
    });
  };

  const backToTOC = () => {
    setCurrentChapter({ chapterNumber: 0, chapterName: "" });
  };

  const renderChapterBoxes = () => {
    const chapterBoxes = getChapterNames().map((name, index) => {
      const chapterNumber = index + 1;
      return (
        <div
          key={uuidv4()}
          className="parent-chapter-box"
          onClick={() => handleChapterSelection(chapterNumber, name)}
        >
          <p className="number">{chapterNumber}</p>
          <p className="chapter-title" style={{ marginTop: "10px" }}>
            {name}
          </p>
        </div>
      );
    });
    return chapterBoxes;
  };
  return (
    <div className="homepage">
      {currentChapter.chapterNumber < 1 ? (
        <div>
          <header className="homepage-header">
            <div className="project-titles">
              <h1 className="book-title">
                Practices of Looking: An Introduction to Visual Culture
              </h1>
              <h2 className="book-subtitle">Table of Contents</h2>
            </div>
          </header>
          <section className="table-of-contents-section">
            <nav className="toc-nav">
              <div key={uuidv4()} className="parent-chapter-box">
                <p className="chapter-title"> Title Page</p>
              </div>
              <div key={uuidv4()} className="parent-chapter-box">
                <p className="chapter-title"> Intro</p>
              </div>
              {renderChapterBoxes()}
            </nav>
          </section>
        </div>
      ) : (
        // SET UP PARENT COMPONENT FOR CHAPTERHOMEPAGE AND ARC AS CHILD COMPONENTS
        <ChapterHandler
          chapterNumber={currentChapter.chapterNumber}
          chapterName={currentChapter.chapterName}
          backToTOC={backToTOC}
        />
      )}
    </div>
  );
};

export default App;

// const TenPointOneRef = useRef();
// const TenPointTwoRef = useRef();
// const [page, setPage] = useState(0);
// const [subChapter, setSubChapter] = useState("");

// const handleArcClick = (ref) => {
//   if (ref === TenPointOneRef) {
//     setSubChapter("10.1");
//     setPage(page + 1);
//   }
//   if (ref === TenPointTwoRef) {
//     setSubChapter("10.2");
//     setPage(page + 1);
//   }
//};
// const handlePageChange = (direction) => {
//   if (direction === "next") {
//     setPage(page + 1);
//     return;
//   }
//   if (direction === "back") {
//     setPage(page - 1);
//     return;
//   }
//   if (direction === "home") {
//     setPage(0);
//   }
// };

// return (
//   <div className="App">
//     {page === 0 ? (
//       <section className="homepage-wrapper">
//         <header className="chapter-header">
//           Chapter 10: The Global Flow of Visual Culture
//         </header>
//         <div className="top-row">
//           <div
//             className="square"
//             onClick={() => handleArcClick(TenPointOneRef)}
//             ref={TenPointOneRef}
//           >
//             <p> 1. Top down infrastructure</p>
//           </div>
//           <div
//             className="square"
//             onClick={() => handleArcClick(TenPointTwoRef)}
//             ref={TenPointTwoRef}
//           >
//             <p>2. Where is the human? </p>
//           </div>
//         </div>
//         <div className="bottom-row">
//           <p className="square" onClick={handleArcClick}>
//             Arc 3
//           </p>
//           <p className="square" onClick={handleArcClick}>
//             Arc 4
//           </p>
//         </div>
//       </section>
//     ) : (
//       <StageHandler
//         page={page}
//         handlePageChange={handlePageChange}
//         subChapter={subChapter}
//       />
//     )}
//   </div>
