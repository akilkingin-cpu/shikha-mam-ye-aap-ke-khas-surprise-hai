import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard2")({
  head: () => ({
    meta: [
      { title: "Shikha Mam — Rakhi Surprise Dashboard" },
      {
        name: "description",
        content: "Shikha Mam ke liye khaas Rakhi surprise dashboard.",
      },
      {
        property: "og:title",
        content: "Shikha Mam — Rakhi Surprise Dashboard",
      },
      {
        property: "og:description",
        content: "Shikha Mam ke liye khaas Rakhi surprise dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard2,
});

function Dashboard2() {
  return (
    <div className="min-h-screen bg-festive px-6 py-12">
      <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 shadow-xl md:p-10">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-primary md:text-4xl">
            Rakhi Surprise Dashboard
          </h1>
          <p className="mt-3 text-lg font-semibold text-foreground">
            Shikha Mam, aapka dil se shukriya! 💐
          </p>
        </div>

        <div className="mt-8 space-y-4 text-center text-base leading-relaxed text-foreground md:text-lg">
          <p>
            Aapki muskaan hi sabse bada tohfa hai.
            <br />
            Umeed hai yeh chhoti si koshish aapko pasand aayi hogi.
          </p>
          <p className="text-2xl">🌸 ❤️ ✨ 🎁 ❤️ 🌸</p>
          <p className="text-muted-foreground">
            Happy Raksha Bandhan!
            <br />
            Bhai ki taraf se bahut saara pyaar.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Surprise wapas dekhein
          </Link>
        </div>
      </div>
    </div>
  );
}
