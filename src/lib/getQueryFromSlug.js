import { groq } from "next-sanity";

const calcDocType = ({ docQuery, slugArray }) => {
  const slugStart = slugArray?.[0];

  const fullSlug = slugArray.join("/");

  if (!slugStart || slugStart === "/") {
    return "home";
  }

  // Timetable
  const isTimetable = slugStart === "timetable" || slugStart === "timetables";

  if (isTimetable) {
    return "timetable";
  }

  // Members Zone
  const isMembersZone = slugStart === "members" || slugStart === "members-zone" || slugStart === "login";
  if(isMembersZone){
    return "membersZone";
  }

  // Keep extending this section to match the slug against the docQuery object keys
  if (docQuery.hasOwnProperty(slugStart)) {
    return slugStart;
  }

  return "page";
};

export default function getQueryFromSlug({ slug: slugArray = [] }) {
  const docQuery = {
    timetable: groq`*[_type == "dojo"]{
      ...,
      linkedPage-> {
        title,
        slug
      }
    }`,
    page: groq`*[_type == "page" && slug.current == $slug][0]{
      ...,
      blocks[]{
        ...,
        _type == 'pageEvent' => {
          events[]{
            ...,
            socialMediaIcon {
              image{
                ...,
                asset->
              }
            },
            images[]{
              image {
                ...,
                asset->
              }
            },
            linkedPage->{
              slug
            }
          }
        },
        _type == "pageImageText" => {
          ...,
          image[]{
            image{
              ...,
              asset->
            }
          },
          linkedPage-> {
            title,
            slug
          }
        }
      },
      _type == "pageImage" => {
        ...,
        images[]{
          image{
            ...,
            asset->
          }
        }
      }
    }`,
    membersZone: groq`*[_type == "home"][0]{
      ...
    }`,
    home: groq`*[_type == "home"][0]{
      ...,
      coverImage {
        image {
          ...,
          asset->
        }
      },
      blocks[]{
        _type == 'event' => {
          ...,
          socialMediaIcon {
            image{
              ...,
              asset->
            }
          },
          images[]{
            image {
              ...,
              asset->
            }
          },
          linkedPage->{
            slug
          }
        },
        _type == 'homeDojo' => {
          _type,
          linkedDojo-> {
            address,
            title,
            linkedPage->{
              slug
            },
            images[]{
              image {
                ...,
                asset->
              }
            },
            mapImage {
              image{
                ...,
                asset->
              }
            }
          }
        }
      }
    }`,
  };

  if (slugArray.length === 0) {
    return {
      docType: "home",
      queryParams: {},
      query: docQuery.home,
    };
  }

  const docType = calcDocType({
    docQuery,
    slugArray,
  });

  // We now have to re-combine the slug array to match our slug in Sanity.
  // let queryParams = { slug: `/${slugArray.join("/")}` };
  // let queryParams = { slug: `/${slugArray[slugArray?.length - 1]}` };
  const queryParams = { slug: `/${slugArray.join("/").replace(/\/pdf/g, "")}` };

  return {
    docType,
    queryParams,
    query: docQuery[docType],
  };
}
