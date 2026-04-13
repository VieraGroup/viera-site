import { getCountyPosts, getCityPosts } from "../utils/relatedPosts";

export default function RelatedPosts({
  allPosts = [],
  mode,
  countySlug = "",
  citySlug = "",
  parentCountySlug = "",
  title = "Helpful Resources",
  limit = null,
}) {
  let posts = [];

  if (mode === "county" && countySlug) {
    posts = getCountyPosts(allPosts, countySlug);
  } else if (mode === "city" && citySlug) {
    posts = getCityPosts(allPosts, citySlug, parentCountySlug);
  }

  if (limit) {
    posts = posts.slice(0, limit);
  }

  if (!posts.length) {
    return (
      <section style={{ marginTop: "30px" }}>
        <h2>{title}</h2>
        <p>Related posts will appear here next.</p>
      </section>
    );
  }

  return (
    <section style={{ marginTop: "30px" }}>
      <h2>{title}</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={post.url}>{post.title}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
