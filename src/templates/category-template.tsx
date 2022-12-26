import Layout from "@/components/Layout";
import React from "react";
import ListNote from "@/components/ListNote";
import { graphql } from "gatsby";
import { SITE_TITLE } from "../../config";

type Props = {
  data: AllMdx;
  pageContext: PageContext;
};

const CategoryTemplate = ({ data, pageContext }: Props) => {
  const { edges } = data.allMdx;
  const {
    category,
    slug,
    currentPage,
    prevPagePath,
    nextPagePath,
    hasPrevPage,
    hasNextPage,
  } = pageContext;
  const pageTitle =
    currentPage > 0
      ? `${category} - Page ${currentPage} - ${SITE_TITLE}`
      : `${category} - ${SITE_TITLE}`;

  return (
    <Layout title={pageTitle}>
      <div className="my-2 py-4 border-b border-slate-200">
        <h1 className="capitalize inline-block mr-2 text-5xl md:text-7xl font-black">
          {category}
        </h1>
      </div>
      <ListNote edges={edges} />
      {/* {(hasPrevPage || hasNextPage) && (
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      )} */}
    </Layout>
  );
};

export const query = graphql`
  query CategoryPage($category: String) {
    allMdx(
      filter: {
        frontmatter: { publish: { ne: false } }
        fields: { category: { eq: $category } }
      }
      sort: { order: DESC, fields: fields___date }
    ) {
      edges {
        node {
          ...postList
        }
      }
    }
  }
`;

export default CategoryTemplate;
