import "../Styles/App.css";
import "../Styles/CompiledCss/globalstyles.css";
// import StageHandler from "./StageHandler";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
// import { requestData } from "../Content";
import { getSubChapterNames } from "../Content";
import "../Styles/subchapters.css";
import { subChapter } from "../types";
import React from "react";

interface ChapterHomePageProps {
  chapterNumber: number;
  chapterName: string;
  handleSubChapterSelection: (subChapName: string) => void;
}

const ChapterHomePage: React.FC<ChapterHomePageProps> = ({
  chapterNumber,
  handleSubChapterSelection,
  chapterName,
}) => {
  const [subChapters, setSubChapters] = useState<subChapter[] | undefined>();
  useEffect(() => {
    const fetchSubChapters = async () => {
      const subChapters = await getSubChapterNames(chapterNumber);
      setSubChapters(subChapters);
    };
    fetchSubChapters();
  }, []);

  const renderSubChapters = () => {
    const mapOfSubChapters = subChapters?.map((subchapter) => {
      const subChapName = subchapter.name;
      return (
        <li
          key={uuidv4()}
          className="square"
          onClick={() => handleSubChapterSelection(subChapName)}
        >
          <p> {subChapName}</p>
        </li>
      );
    });
    return <ul className="subchapter-grid">{mapOfSubChapters}</ul>;
  };

  return (
    <div className="Chapter-homepage-wrapper">
      {!subChapters ? null : (
        <div>
          <header className="chapter-header">
            <h1 className="book-title">
              {chapterNumber}: {chapterName}
            </h1>
          </header>
          <section className="subchapters-wrapper">
            {renderSubChapters()}
          </section>
        </div>
      )}
    </div>
  );
};

export default ChapterHomePage;

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
// };
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

// {page === 0 ? (
//   <section className="homepage-wrapper">
//     <header className="chapter-header">
//       Chapter 10: The Global Flow of Visual Culture
//     </header>
//     <div className="top-row">
//       <div
//         className="square"
//         onClick={() => handleArcClick(TenPointOneRef)}
//         ref={TenPointOneRef}
//       >
//         <p> 1. Top down infrastructure</p>
//       </div>
//       <div
//         className="square"
//         onClick={() => handleArcClick(TenPointTwoRef)}
//         ref={TenPointTwoRef}
//       >
//         <p>2. Where is the human? </p>
//       </div>
//     </div>
//     <div className="bottom-row">
//       <p className="square" onClick={handleArcClick}>
//         Arc 3
//       </p>
//       <p className="square" onClick={handleArcClick}>
//         Arc 4
//       </p>
//     </div>
//   </section>
// ) : (
//   <StageHandler
//     page={page}
//     handlePageChange={handlePageChange}
//     subChapter={subChapter}
//   />
// )}
// <img src={requestData()} />
