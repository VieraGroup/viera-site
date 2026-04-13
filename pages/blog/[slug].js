import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export default function BlogPost({ post }) {
  if (!post) return null;

  return (
    <main style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6", color: "#111" }}>
      
      {/* HERO */}
      <section style={{ padding: "48px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>{post.title}</h1>

        <p style={{ marginBottom: "20px" }}>
          If you're dealing with probate, foreclosure, liens, or an inherited property,
          understanding your options early can protect your equity.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a href="tel:9739395151" style={btnPrimary}>
            Call (973) 939-5151
          </a>
          <a href="sms:9732408666" style={btnSecondary}>
            Text (973) 240-8666
          </a>
        </div>
      </section>

      {/* BLOG CONTENT */}
      <section style={{ padding: "0 24px", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ whiteSpace: "pre-wrap", fontSize: "18px" }}>
          {post.content}
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ background: "#f8f8f8", padding: "40px 24px", marginTop: "40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2>You Pay Nothing — We Cover Everything</h2>
          <ul>
            <li>Attorney fees</li>
            <li>Closing costs</li>
            <li>Title work</li>
            <li>Lien negotiations</li>
            <li>No commissions</li>
          </ul>

          <div style={{ marginTop: "20px" }}>
            <a href="tel:9739395151" style={btnPrimary}>
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: "#111", color: "#fff", padding: "48px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2>Need Help With Your Property?</h2>
          <p>No pressure. No obligation. Just real solutions.</p>

          <div style={{ marginTop: "20px" }}>
            <a href="tel:9739395151" style={btnWhite}>
              Call (973) 939-5151
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}

const btnPrimary = {
  padding: "14px 22px",
  background: "#111",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "8px",
  fontWeight: "bold",
};

const btnSecondary = {
  padding: "14px 22px",
  background: "#eee",
  color: "#111",
  textDecoration: "none",
  borderRadius: "8px",
  fontWeight: "bold",
};

const btnWhite = {
  padding: "14px 22px",
  background: "#fff",
  color: "#111",
  textDecoration: "none",
  borderRadius: "8px",
  fontWeight: "bold",
};

export async function getStaticPaths() {
  if (!fs.existsSync(POSTS_DIR)) {
    return { paths: [], fallback: false };
  }

  const files = fs.readdirSync(POSTS_DIR);

  return {
    paths: files.map((file) => ({
      params: { slug: file.replace(".md", "") },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(POSTS_DIR, `${params.slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    props: {
      post: {
        title: data.title,
        content,
      },
    },
  };
}
