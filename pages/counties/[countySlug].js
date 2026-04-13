import { counties } from "../../data/counties";
import { getAllPosts } from "../../lib/posts";
import RelatedPosts from "../../components/RelatedPosts";

export default function CountyPage({ countySlug, allPosts }) {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>{countySlug.replace(/-/g, " ")}</h1>

      <p>
        We help homeowners in {countySlug.replace(/-/g, " ")} with probate,
        foreclosure, tax liens, inherited houses, and distressed property
        situations.
      </p>

      <RelatedPosts
        allPosts={allPosts}
        mode="county"
        countySlug={countySlug}
        title="Helpful Resources"
      />
    </main>
  );
}

export async function getStaticPaths() {
  const paths = counties.map((county) => ({
    params: { countySlug: county.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllPosts();

  return {
    props: {
      countySlug: params.countySlug,
      allPosts,
    },
  };
}
