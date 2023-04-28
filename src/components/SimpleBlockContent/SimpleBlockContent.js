import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import serializers from "./serializers";
const projectId = process?.env?.SANITY_PROJECT_ID;
const dataset = process?.env?.SANITY_DATASET;

function SimpleBlockContent({ blocks, defaultTag }) {
  if (!blocks) {
    console.error("Missing blocks");
    return null;
  }

  return (
    <BlockContent
      blocks={blocks}
      serializers={serializers(defaultTag)}
      projectId={projectId}
      dataset={dataset}
    />
  );
}

export default SimpleBlockContent;
