export default function CityPage({ params }) {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>City Page ✅</h1>
      <p>{params.countySlug} / {params.citySlug}</p>
    </main>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          countySlug: "passaic-county",
          citySlug: "clifton",
        },
      },
      {
        params: {
          countySlug: "bergen-county",
          citySlug: "hackensack",
        },
      },
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
