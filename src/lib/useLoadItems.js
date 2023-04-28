import { useState, useEffect } from "react";
import { getClient } from "../lib/sanity.server";
import { groq } from "next-sanity";

const ARRAY_SIZE = 3;

function loadItems(startCursor = 0) {
  return new Promise(async (resolve, reject) => {
    const query = groq`*[_type == "project" && !(_id in path("drafts.**"))]|order(orderRank)[${startCursor}...${
      startCursor + ARRAY_SIZE}]{
      ...,
      media[]{
        ...,
        _type == 'imageBlock' => {
          ...,
          image {
            ...,
            asset->
          }
        }
      }
    }`;

    const preview = false;

    try {
      const data = await getClient(preview).fetch(query); 
      resolve({ data });
    } catch (error) {
      console.error(error);
      reject();
    }
  });
}

export function useLoadItems({ initialItems, count }) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([...initialItems]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState();

  async function loadMore() {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await loadItems(items.length);
      const newHasNextPage = (data && data.length) || items.length + data.length !== count;
      if (data && data.length) {
        setItems((current) => [...current, ...data]);
      }
      setHasNextPage(newHasNextPage);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return { loading, items, hasNextPage, error, loadMore };
}
