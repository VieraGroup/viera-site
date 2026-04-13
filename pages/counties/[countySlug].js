import { counties } from "../../data/counties";
import { getAllPosts } from "../../lib/posts";
import RelatedPosts from "../../components/RelatedPosts";

function formatName(slug = "") {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function CountyPage({ countySlug, countyName, allPosts }) {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      <h1>Sell Your House Fast in {countyName}, NJ</h1>

      <p>
        If you are dealing with probate, foreclosure, tax liens, an inherited house,
        or other distressed property issues in {countyName}, understanding your options
        early can make a major difference.
      </p>

      <h2>Common Property Situations in {countyName}</h2>
      <ul>
        <li>Inherited houses going through probate</li>
        <li>Behind on property taxes or tax liens</li>
        <li>Pre-foreclosure or sheriff sale pressure</li>
        <li>Vacant or distressed properties</li>
        <li>Multiple heirs or title complications</li>
      </ul>

      <p>
        Below are helpful resources for homeowners in {countyName} dealing with
        probate, foreclosure, tax liens, inherited property, and other difficult
        situations.
      </p>

      <RelatedPosts
        allPosts={allPosts}
        mode="county"
        countySlug={countySlug}
        title={`Helpful Resources for ${countyName} Homeowners`}
      />

      <section style={{ marginTop: "40px" }}>
        <h2>Need Help With a Property in {countyName}?</h2>
        <p>
          Viera Investment Group LLC helps homeowners and heirs understand their
          options when dealing with probate, foreclosure, tax liens, and inherited
          property. No fees, no commissions, and flexible closing options.
        </p>
      </section>
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
      countyName: formatName(params.countySlug),
      allPosts,
    },
  };
}
