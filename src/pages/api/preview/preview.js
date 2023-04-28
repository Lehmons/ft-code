import sanityClient from "@sanity/client";

const sanity = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  // If your dataset is private you need to add a read token.
  // You can mint one at https://manage.sanity.io,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2021-03-25",
  useCdn: false
});

const getPostBySlug = async slug => {
  const query = `*[slug.current == '${slug}']`;
  const data = await sanity.fetch(query);
  if (data) {
    return data;
  }
  return null;
};

export default async (req, res) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS

  if (req.query.secret !== "secret" || !req.query._type) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const { _type, slug } = req.query;

  const staticPages = [
    'about'
  ]

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  const post = await getPostBySlug(slug);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post && !staticPages.includes(slug)) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  if (_type === "about") {
    res.writeHead(307, { Location: `/` });
    res.end();
    return;
  }
  
  if (_type === "project") {
    res.writeHead(307, { Location: post?.slug });
    res.end();
    return;
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  // res.redirect(post.slug);
  res.writeHead(307, { Location: `/` });
  res.end();
};
