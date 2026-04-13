import { counties } from "../../../data/counties";
import { getAllPosts } from "../../../lib/posts";
import RelatedPosts from "../../../components/RelatedPosts";

export default function CityPage({ citySlug, parentCountySlug, allPosts }) {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>{citySlug.replace(/-/g, " ")}</h1>
      <p>
        We help homeowners in {citySlug.replace(/-/g, " ")} with probate,
        foreclosure, tax liens, inherited houses, and distressed property situations.
      </p>

      <RelatedPosts
        allPosts={allPosts}
        mode="city"
        citySlug={citySlug}
        parentCountySlug={parentCountySlug}
        title="Helpful Resources"
        limit={6}
      />
    </main>
  );
}

export async function getStaticPaths() {
  const paths = counties.flatMap((county) =>
    county.cities.map((city) => ({
      params: {
        countySlug: county.slug,
        citySlug: city,
      },
    }))
  );

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllPosts();

  return {
    props: {
      citySlug: params.citySlug,
      parentCountySlug: params.countySlug,
      allPosts,
    },
  };
}
