const sanityClient = require("@sanity/client");
// Use env variables before pushing to GH
export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJ_ID,
  dataset: process.env.REACT_APP_SANITY_DATSETNAME,
  apiVersion: "2022-10-20", // use current UTC date - see "specifying API version"!
  token: "", // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
});
