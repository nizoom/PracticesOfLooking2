import React, { useEffect, useState } from "react";
import ArcStage from "./ArcStage";
import { getArcContent } from "../Content";
import { ArcStageTypedProps } from "../types";
import Loader from "./Loader";

type StageHandlerProps = {
  chapterName: string;
  backToTOC: () => void;
};
const StageHandler: React.FC<StageHandlerProps> = ({
  chapterName,
  backToTOC,
}) => {
  // add field for movie url link in Sanity pageContent document
  const [currentPage, setCurrentPage] = useState<number>(0);
  const handlePageChange = (direction: string) => {
    if (direction === "next") {
      setCurrentPage(currentPage + 1);
      return;
    }
    if (direction === "back") {
      setCurrentPage(currentPage - 1);
      return;
    }
  };

  const defaultArcStageProps: ArcStageTypedProps = {
    // backToTOC: backToTOC,
    // handlePageChange: handlePageChange,
    Caption: "loading caption",
    slideText: "loading description",
    imageAsset: "loading img source data",
    audioUrl: "loading audio url",
    videoTitle: "loading video title",
    videoUrl: "loading video url",
    imageTitle: "",
    slideName: "",
    slideNumber: 0,
  };

  const [arcContentArr, setArcContentArr] = useState<ArcStageTypedProps[]>([
    defaultArcStageProps,
  ]);
  const [loaderState, setLoaderState] = useState<boolean>(true);
  useEffect(() => {
    const fetchArcContent = async () => {
      const arcContent: ArcStageTypedProps[] = await getArcContent(chapterName);
      // console.log(arcContent);
      setArcContentArr(arcContent);
      setLoaderState(false);
    };

    fetchArcContent();
  }, []);

  return (
    <div>
      {arcContentArr[0].audioUrl !== "loading audio url" ? (
        <ArcStage
          ArcStageTypedProps={arcContentArr[currentPage]}
          backToTOC={backToTOC}
          handlePageChange={handlePageChange}
          maxPage={arcContentArr.length}
          currentPage={currentPage}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default StageHandler;
