import { client } from "./Sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { ArcStageTypedProps } from "types";
export function gatherContent(subChapter: string, page: number) {}
// import { ArcStageTypedProps } from "./types";

// In your code to fetch data, you need two pieces of information to connect to your API:

// A Project ID
// A Dataset name

const sanityProjectId = process.env.REACT_APP_SANITY_PROJ_ID;
const datasetName = process.env.REACT_APP_SANITY_DATSETNAME;

export function getChapterNames() {
  return [
    "Images, Power, and Politics",
    "Viewers Make Meaning",
    "Modernity, the Gaze, and Power",
    "Realism and Perspective From Renaissance Painting To Digital Media",
    "Visual Technologies, Reproduction, and the Copy",
    "Media in Everday Life",
    "Brand Culture: The Images and Space of Consumption",
    "Postmodernism: Irony, Parody, and Pastiche",
    "Scientific Looking, Looking at Science",
    "The Global Flow of Visual Culture",
  ];
}

function generateUrl(query: string) {
  return `https://${sanityProjectId}.api.sanity.io/v2021-10-21/data/query/${datasetName}?query=${query}`;
}
export async function getSubChapterNames(chapterNumber: number) {
  const subChapterQuery = encodeURIComponent(
    `*[
      _type=="subChapter" && defined( parentChapter->chapterNumber ) && parentChapter->chapterNumber==${chapterNumber}] {
      name
      }`
  );
  const subChapterNames = await fetch(generateUrl(subChapterQuery))
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
  console.log(
    "🚀 ~ file: Content.ts:48 ~ getSubChapterNames ~ subChapterNames.result;:",
    subChapterNames.result
  );

  return subChapterNames.result;
}

export async function getArcContent(subchapterName: string) {
  const arcContentQuery =
    // encodeURIComponent(`*[_type=="pageContent" && subChapter-> name=="${subchapterName}"]{
    encodeURIComponent(`*[_type=="pageContent" && subChapter-> name=="Test Subchapter A"]{
      slideName,
      visualMediaOptions,
      image,
      imageTitle,
      Caption,
      videoTitle,
      videoUrl,
      slideText,
      slideNumber,
      audio {
        asset->{url}
      }
  }`);
  // get content for subchapter
  const arcContent = await fetch(generateUrl(arcContentQuery)).then((res) =>
    res.json()
  );
  const contentArr = arcContent.result;
  console.log(contentArr);
  const sortedContentArr = sortArcContentBySlideNumber(contentArr);

  const modifiedArcPropNames = sortedContentArr.map(
    (page): ArcStageTypedProps => {
      const imageProperty = page.image ? page.image.asset._ref : null;
      page.imageAsset = imageProperty;
      page.audioUrl = page.audio.asset.url;
      delete page.audio;
      delete page.image;
      return page;
    }
  );

  const unNestAudioPropterty = sortedContentArr.map((page) => {
    if (page.audio) {
      const audioUrl = page.audio.asset.url;
      page.audio = audioUrl;
    }
    return page;
  });
  // ORDER by slide number before returning
  // console.log(modifiedArcPropNames);
  return modifiedArcPropNames;
}

function sortArcContentBySlideNumber(contentArr: any[]) {
  return contentArr.sort(function (firstSlide, nextSlide) {
    return firstSlide.slideNumber - nextSlide.slideNumber;
  });
}

export function srcImage(source: SanityImageSource) {
  const builder = imageUrlBuilder(client);
  // console.log(builder.image(source));
  return builder.image(source).toString();
}
// Caption,
// imageTitle,
// Description,
// videoBoolean,
// image,
// slideNumber,
// slideText,
// videoTitle,
// videoURL,
// audio {
// asset->{url}
// export async function requestData() {
//   const imageData = await fetch(URL).then((res) => res.json());
// .then((data) => console.log(data.result[0].image.asset));
//   const imageSource = imageData.result[0].image;
//   console.log(imageSource);
//   fetchFromSanity(imageData);
// }

// requestData();

// let URL = `https://${sanityProjectId}.api.sanity.io/v2021-10-21/data/query/${datasetName}?query=${QUERY}`;

// const tenPointOnePage1 = {
//   text: "This photograph provides a God’s eye view of Turkey’s largest Syrian refugee camp taken by a drone. Ideology informs the design of shelters for displaced people, by arranging homes as if in a perspectival grid that organizes, manages and contains its inhabitants. The emphasis in the photograph on the planar and linear leaves out texture, straightening and arranging what could be perceived as deviance. Where one can circulate is restricted and prescribed. Their freedom is limited. What's complicated and vulnerable becomes smoothly encased and hidden. The camp as a designed living space is on a flat raised terrain, with no plant structures, no shade, no cultural centers, public transportation, it is remote and isolated.  Brown arid ground indicates a hot and dry climate. Small squares of shade help protect but are they enough to seek refuge from the environmental conditions of heat? The camp land is doubly enclosed, both within the fence, the surrounding road, and the hill. A small parking lot to the bottom of the image shows vehicles but we know they don’t belong to the residents who are isolated spatially and marginalized from society at large.",
//   citation:
//     "Aerial photograph of AFAD temporary sheltering center where Syrian people live in the Suruç district of Şanlıurfa Province, Turkey, as shared in a Twitter feed January 24, 2015",
//   notes: "Take notes here",
//   movieStatus: false,
// };

// const tenPointOnePage2 = {
//   text: "These cube-like building shapes lend themselves to being drawn and photographed for understanding linear perspective because they are simple and made of right angles. In Chapter 4, we learned about perspective in the context of realism, as informing our understanding of space while deploying principles about society. Linear perspective and the rationality of the grid eliminate embodied presence and subjective positions, being procedural and eliminating chaos. From above, bodies are almost unnoticeable in the image, as if the camp is deserted and its residents are tucked neatly away.",
//   citation:
//     "Fig 4.9 Illustration of Brunelleschi with mirror showing building, c. 1410-1415 p. 149",
//   notes: "Take notes here",
//   movieStatus: false,
// };
// const tenPointOnePage3 = {
//   text: "What is it about drawing the body that makes it less amenable to linear perspective? How can this be extended to the first image we saw? What is it about humanity that conflicts with environments that are rigidly industrial and grid-like?",
//   citation:
//     "Figure 4.14 Albrecht Durer, Draftsman Drawing a Nude, illustration from The Painter’s Manual, 1525 (in book p 154)",
//   notes: "Take notes here",
//   movieStatus: false,
// };
// const tenPointOnePage4 = {
//   text: "How do drones, or Unmanned Aerial Vehicles, give us images of people in cities or urban landscapes differently than other social and political forms of visual surveillance? Orbiting as a force with machine agency, these feed our view of human survival. They create them. A wild range of drones exist which do things for and with us humans.  In the above image we see a camera has been installed, for recording videos, taking still photographs, or data collection. More than a toy, these call on our knowledge of armed drone killings in military combat, wildlife harming, or police surveillance.",
//   citation:
//     "Best drones with 4K cameras” https://www.adorama.com/alc/what-are-the-best-drones-with-4k-cameras/",
//   notes: "Take notes here",
//   movieStatus: false,
// };
// const tenPointOnePage5 = {
//   text: "As you will recall from Chapter 1, the distanced effect of the drone’s viewpoint turns targets into small dots. A person killed by drones is referred to as a bug splat in military slang. A counter-attack on drone users and unjust warfare was designed to be visible to satellites and aerial cameras. By blowing up the image of a single child victim killed by aerial warfare, unrolling the poster as an image that now became visible to those looking from above, the child returns the gaze emanating from the God’s eye view in the large-scale installation project #NotABugSplat to call attention to the real lives of child victims and the value of civilian lives dehumanized by machinic vision in a heavily bombed area of Pakistan.",
//   citation:
//     "Saks Afridi, Ali Rez, Akash Goel, Insiya Syed, JR, Assam Khalid, Jamil Akhtar, and Noor Behram, #NotABugSplat (Page 24 in book, Ch 1)",
//   notes: "Take notes here",
//   movieStatus: false,
// };

// const tenPointOnePage6 = {
//   text: "As we can see in this image someone is tracing on top of the photograph that we have just seen. On either side of the image there are two vanishing points, one on the right and one on the left that go beyond the frame of the photograph. Therefore a two-point perspective grid is easy to create for this image because the buildings are already arranged in grid-fashion, lined up along straight lines that intersect at square angles, meeting at the front bottom of the image. Even with no knowledge of drawing, if you follow the outer edges of the buildings or drew a line through them, you will get a grid.",
//   citation:
//     "Video provided by Maia, temporary screenshot for sample] Drawing grid over image",
//   notes: "Take notes here",
//   movieStatus: true,
// };

// const tenPointOne = {
//   1: tenPointOnePage1,
//   2: tenPointOnePage2,
//   3: tenPointOnePage3,
//   4: tenPointOnePage4,
//   5: tenPointOnePage5,
//   6: tenPointOnePage6,
//   7: tenPointOnePage7,
//   8: tenPointOnePage8,
//   9: tenPointOnePage9,
// };

// const tenPointTwo = {
//   // Add ten point two content
// };

// export function gatherContent(subChapter, page) {
//   // return content and number of pages so we know what the last page will be
//   if (subChapter === "10.1") {
//     return [tenPointOne[page], Object.keys(tenPointOne).length];
//   }
//   if (subChapter === "10.2") {
//     return [tenPointTwo[page], Object.keys(tenPointTwo).length];
//   }
// }

// export function updateNotes(chapter, page, notes) {
// if (chapter === "10.1") {
//   tenPointOne[page].notes = notes;
// }
// if (chapter === "10.2") {
//   tenPointTwo[page].notes = notes;
// }
// }
