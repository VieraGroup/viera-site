function toSlug(str = "") {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function deduplicate(posts = []) {
  const seen = new Set();
  return posts.filter((post) => {
    if (seen.has(post.slug)) return false;
    seen.add(post.slug);
    return true;
  });
}

function sortNewest(posts = []) {
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function filterPublished(posts = []) {
  return posts.filter((p) => !p.draft);
}

export function getCountyPosts(allPosts = [], countySlug = "") {
  const normalized = toSlug(countySlug);
  const published = filterPublished(allPosts);

  const matched = published.filter(
    (post) => toSlug(post.county ?? "") === normalized
  );

  return sortNewest(deduplicate(matched));
}

export function getCityPosts(
  allPosts = [],
  citySlug = "",
  countySlug = ""
) {
  const MAX = 6;
  const FALLBACK_THRESHOLD = 4;

  const normalizedCity = toSlug(citySlug);
  const normalizedCounty = toSlug(countySlug);
  const published = filterPublished(allPosts);

  const directMatches = published.filter((post) => {
    const cities = Array.isArray(post.cities) ? post.cities : [];
    return cities.map(toSlug).includes(normalizedCity);
  });

  const sortedDirect = sortNewest(deduplicate(directMatches));

  if (sortedDirect.length >= FALLBACK_THRESHOLD) {
    return sortedDirect.slice(0, MAX);
  }

  const directSlugs = new Set(sortedDirect.map((p) => p.slug));

  const countyFallback = published.filter((post) => {
    if (directSlugs.has(post.slug)) return false;
    return toSlug(post.county ?? "") === normalizedCounty;
  });

  const sortedFallback = sortNewest(deduplicate(countyFallback));

  return [...sortedDirect, ...sortedFallback].slice(0, MAX);
}
