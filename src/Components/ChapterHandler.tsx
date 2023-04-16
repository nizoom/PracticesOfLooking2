import React, { useState } from "react";
import ChapterHomePage from "./ChapterHomePage";
import StageHandler from "./ArcPageHandler";

type ChapterSelctionProps = {
  chapterNumber: number;
  chapterName: string;
  backToTOC: () => void;
};

const ChapterHandler: React.FC<ChapterSelctionProps> = (
  props: ChapterSelctionProps
) => {
  const [showParentChapter, setShowParentChapter] = useState<boolean>(true);
  const [currentSubChapName, setcurrentSubChapName] = useState<string>("");

  const handleSubChapterSelection = (subChapName: string) => {
    setShowParentChapter(false);
    setcurrentSubChapName(subChapName);
  };

  return (
    <div>
      {showParentChapter ? (
        <ChapterHomePage
          chapterNumber={props.chapterNumber}
          chapterName={props.chapterName}
          handleSubChapterSelection={handleSubChapterSelection}
        />
      ) : (
        <StageHandler
          chapterName={currentSubChapName}
          backToTOC={props.backToTOC}
        />
      )}
    </div>
  );
};

export default ChapterHandler;
