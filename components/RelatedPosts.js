import { getCountyPosts, getCityPosts } from "../utils/relatedPosts";

export default function RelatedPosts({
  allPosts = [],
  mode,
  countySlug = "",
  citySlug = "",
  parentCountySlug = "",
  title = "Related Posts",
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
    return null;
  }

  return (
    <section>
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
