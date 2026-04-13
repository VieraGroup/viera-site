import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export default function BlogPost({ post }) {
  if (!post) return null;

  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>{post.content}</div>
    </main>
  );
}

export async function getStaticPaths() {
  if (!fs.existsSync(POSTS_DIR)) {
    return { paths: [], fallback: false };
  }

  const files = fs.readdirSync(POSTS_DIR).filter((file) => /\.mdx?$/.test(file));

  const paths = files.map((file) => ({
    params: {
      slug: file.replace(/\.mdx?$/, ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(POSTS_DIR, `${params.slug}.md`);

  let resolvedPath = filePath;
  if (!fs.existsSync(resolvedPath)) {
    resolvedPath = path.join(POSTS_DIR, `${params.slug}.mdx`);
  }

  if (!fs.existsSync(resolvedPath)) {
    return { notFound: true };
  }

  const raw = fs.readFileSync(resolvedPath, "utf-8");
  const { data, content } = matter(raw);

  return {
    props: {
      post: {
        title: data.title || params.slug,
        date: data.date || "",
        content,
      },
    },
  };
}
