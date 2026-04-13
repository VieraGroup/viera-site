export default function CountyPage({ params }) {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>County Page ✅</h1>
      <p>{params.countySlug}</p>
    </main>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { countySlug: "passaic-county" } },
      { params: { countySlug: "bergen-county" } },
      { params: { countySlug: "essex-county" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      params,
    },
  };
}
