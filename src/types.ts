export type subChapter = {
  name: string;
  type: string;
  title: string;
};

export type ArcStageTypedProps = {
  // backToTOC: () => void;
  // handlePageChange: (direction: string) => void;
  slideName: string;
  imageAsset: string;
  imageTitle: string;
  Caption: string;
  videoTitle: string;
  videoUrl: string;
  slideText: string;
  slideNumber: number;
  audioUrl: string;
};

export type MediaComponentTypedProps = {
  imgTitle: string;
  imageAsset: string;
  audioUrl: string;
  movieStatus: boolean;
  videoTitle: string;
  videoUrl: string;
};

export type currentChapterType = {
  chapterNumber: number;
  chapterName: string;
};
