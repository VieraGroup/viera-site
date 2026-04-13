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
  return posts.filter((post) => !post.draft);
}

export function getCountyPosts(allPosts = [], countySlug = "") {
  const normalizedCounty = toSlug(countySlug);
  const published = filterPublished(allPosts);

  const matched = published.filter(
    (post) => toSlug(post.county || "") === normalizedCounty
  );

  return sortNewest(deduplicate(matched));
}

export function getCityPosts(allPosts = [], citySlug = "", countySlug = "") {
  const MAX_POSTS = 6;
  const MIN_DIRECT_MATCHES = 4;

  const normalizedCity = toSlug(citySlug);
  const normalizedCounty = toSlug(countySlug);
  const published = filterPublished(allPosts);

  const directMatches = published.filter((post) => {
    const cities = Array.isArray(post.cities) ? post.cities : [];
    return cities.map(toSlug).includes(normalizedCity);
  });

  const sortedDirect = sortNewest(deduplicate(directMatches));

  if (sortedDirect.length >= MIN_DIRECT_MATCHES) {
    return sortedDirect.slice(0, MAX_POSTS);
  }

  const usedSlugs = new Set(sortedDirect.map((post) => post.slug));

  const countyFallback = published.filter((post) => {
    const sameCounty = toSlug(post.county || "") === normalizedCounty;
    const alreadyUsed = usedSlugs.has(post.slug);
    return sameCounty && !alreadyUsed;
  });

  const sortedFallback = sortNewest(deduplicate(countyFallback));

  return [...sortedDirect, ...sortedFallback].slice(0, MAX_POSTS);
}
