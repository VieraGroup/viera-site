import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function toSlug(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getValidIsoDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function getPostFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return getPostFiles(fullPath);
    }

    return /\.mdx?$/.test(entry.name) ? [fullPath] : [];
  });
}

export async function getAllPosts() {
  const files = getPostFiles(POSTS_DIR);

  const posts = files
    .map((filePath) => {
      try {
        const raw = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(raw);

        const relativePath = path.relative(POSTS_DIR, filePath);
        const slug = relativePath.replace(/\.mdx?$/, "").replace(/\\/g, "/");
        const date = getValidIsoDate(data.date);

        const cities = Array.isArray(data.cities)
          ? data.cities.map(toSlug).filter(Boolean)
          : typeof data.cities === "string"
            ? data.cities.split(",").map(toSlug).filter(Boolean)
            : [];

        return {
          slug,
          url: `/blog/${slug}`,
          title: typeof data.title === "string" ? data.title.trim() : "",
          date,
          county: data.county ? toSlug(data.county) : null,
          cities,
          draft: data.draft === true,
        };
      } catch {
        return null;
      }
    })
    .filter((post) => post && post.title && post.date);

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}