import React from "react";
import Link from "next/link";
import BlockContent from "@sanity/block-content-to-react";

export default function customSerializer({ props, defaultTag }) {
  const { style = "normal", _type = "paragraph" } = props.node;

  if (_type === "link") {
    return renderAnchor({ node: props.node });
  }

  // if user hasn't selected a style, and it should be h1,h2,h3... force it
  if (style === "normal" && defaultTag) {
    return React.createElement(defaultTag, {}, props.children);
  }

  if (style === "small") {
    if (hasLink({ _type, props })) {
      const mark = props.children[0].props.node.mark;
      if ("externalLink" in mark && "openInNewTab" in mark) {
        return (
          <small>
            <a
              href={mark.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="animated-line"
            >
              {props.children[0].props.node.children}
            </a>
          </small>
        );
      }
      if ("externalLink" in mark) {
        return (
          <small>
            <a href={mark.externalLink} className="animated-line">
              {props.children[0].props.node.children}
            </a>
          </small>
        );
      }
      if ("internalLink" in mark) {
        return (
          <small>
            <Link href={`/${mark.internalLink.slug.current}`} scroll={false}>
              <a className="animated-line">
                {props.children[0].props.node.children}
              </a>
            </Link>
          </small>
        );
      }
    }
    return React.createElement("small", {}, props.children);
  }

  if (hasLink({ _type, props })) {
    const mark = props.children[0].props.node.mark;
    if ("externalLink" in mark && "openInNewTab" in mark) {
      return (
        <p>
          <a
            href={mark.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="animated-line"
          >
            {props.children[0].props.node.children}
          </a>
        </p>
      );
    }
    if ("externalLink" in mark) {
      return (
        <p>
          <a href={mark.externalLink} className="animated-line">
            {props.children[0].props.node.children}
          </a>
        </p>
      );
    }
  }

  // default styling
  return BlockContent.defaultSerializers.types.block(props);
}

function hasLink({ _type, props }) {
  if (
    _type === "block" &&
    "children" in props &&
    props.children.length &&
    props.children[0].props &&
    props.children[0].props.node.mark._type === "link"
  ) {
    return true;
  }
  return false;
}

function renderAnchor({ node }) {
  if ("internalLink" in node && "slug" in node.internalLink) {
    return (
      <Link href={`/${node.internalLink.slug.current}`} scroll={false}>
        <a className="animated-line">{node.text}</a>
      </Link>
    );
  }
  if ("externalLink" in node && "openInNewTab" in node) {
    return (
      <a
        className="animated-line"
        href={node.externalLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {node.text}
      </a>
    );
  }
  if ("externalLink" in node && !("openInNewTab" in node)) {
    return (
      <a className="animated-line" href={node.externalLink}>
        {node.text}
      </a>
    );
  }
  return null;
}
