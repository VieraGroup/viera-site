import { counties } from "../../../data/counties";
import { getAllPosts } from "../../../lib/posts";
import RelatedPosts from "../../../components/RelatedPosts";

function formatName(slug = "") {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function CityPage({ citySlug, cityName, parentCountySlug, countyName, allPosts }) {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      <h1>Sell Your House Fast in {cityName}, NJ</h1>

      <p>
        Homeowners in {cityName} dealing with probate, foreclosure, tax liens,
        inherited property, or other distressed situations often need clarity
        before making a decision.
      </p>

      <h2>Common Situations We Help {cityName} Homeowners With</h2>
      <ul>
        <li>Probate and inherited houses</li>
        <li>Tax liens and back property taxes</li>
        <li>Foreclosure pressure and missed payments</li>
        <li>Vacant or damaged houses</li>
        <li>Title problems or multiple-heir situations</li>
      </ul>

      <p>
        These resources are designed to help homeowners in {cityName} and across
        {countyName} understand probate, foreclosure, tax lien, and inherited
        property options.
      </p>

      <RelatedPosts
        allPosts={allPosts}
        mode="city"
        citySlug={citySlug}
        parentCountySlug={parentCountySlug}
        title={`Helpful Resources for Homeowners in ${cityName}`}
        limit={6}
      />

      <section style={{ marginTop: "40px" }}>
        <h2>Need Help With a Property in {cityName}?</h2>
        <p>
          Viera Investment Group LLC works with homeowners facing probate,
          foreclosure, tax liens, inherited houses, and distressed property
          situations in {cityName} and throughout {countyName}. No fees, no
          commissions, and flexible closing options.
        </p>
      </section>
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
      cityName: formatName(params.citySlug),
      parentCountySlug: params.countySlug,
      countyName: formatName(params.countySlug),
      allPosts,
    },
  };
}
