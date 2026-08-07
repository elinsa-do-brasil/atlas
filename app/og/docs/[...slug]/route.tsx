import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { getPageImage, source } from "@/lib/source";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/og/docs/[...slug]">,
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const title = page.data.socialTitle ?? page.data.title;
  const section = formatSection(page.slugs[0]);
  const fontSize = title.length > 80 ? 58 : title.length > 55 ? 68 : 76;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#f7fbfd",
        color: "#102231",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: 520,
          height: 520,
          display: "flex",
          position: "absolute",
          top: -250,
          right: -110,
          border: "70px solid #dff3fb",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          width: 240,
          height: 240,
          display: "flex",
          position: "absolute",
          right: 100,
          bottom: -150,
          background: "#24a3dd",
          borderRadius: "50%",
          opacity: 0.12,
        }}
      />

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "68px 96px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 1024 1024"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M654.787 456.534C655.037 415.332 650.857 377.789 636.61 342.999C615.733 286.441 568.259 252.52 511.693 247.188C468.725 243.137 431.134 253.506 396.378 279.766C340.865 321.709 309.615 388.265 307.927 459.972L416.286 448.565C484.82 444.271 586.665 446.179 654.787 456.534ZM915.782 617.173C738.98 495.566 507.18 484.047 303.681 521.252C311.958 634.57 355.9 735.22 463.892 774.602C542.36 789.112 621.915 771.858 687.25 724.709L726.347 800.063C624.429 874.669 493.512 892.871 377.367 850.38C342.608 835.262 310.738 817.293 286.752 786.676C234.319 719.737 205.224 638.112 198.176 551.033L118.759 581.119C110.931 584.085 103.689 585.652 96.1058 580.759C91.1341 577.552 85.3973 570.926 85.3765 563.482L85.3333 548.388C86.5057 528.788 175.959 505.456 197.156 495.49C202.486 387.856 221.201 302.637 300.106 228.092C361.671 169.929 438.856 145.332 521.498 153.72C577.175 159.371 628.654 177.476 667.511 221.427C703.197 253.449 725.446 296.057 737.168 344.08C748.182 388.774 751.435 433.36 754.545 480.578C815.651 499.786 864.349 518.832 913.695 549.141C913.695 549.141 968.462 582.695 915.782 617.173Z"
              fill="#24a3dd"
            />
          </svg>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 20,
            }}
          >
            <span
              style={{
                fontSize: 36,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Elinsa do Brasil
            </span>
            <span
              style={{
                marginTop: 3,
                color: "#597183",
                fontSize: 21,
                letterSpacing: "0.04em",
              }}
            >
              Documentação
            </span>
          </div>
        </div>

        <div
          style={{
            maxWidth: 960,
            display: "flex",
            flexDirection: "column",
            marginTop: 88,
          }}
        >
          <span
            style={{
              alignSelf: "flex-start",
              marginBottom: 24,
              padding: "11px 20px",
              border: "1px solid #a9dbef",
              borderRadius: 999,
              background: "#e8f7fc",
              color: "#116f99",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
            }}
          >
            {section}
          </span>
          <span
            style={{
              fontSize,
              fontWeight: 750,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
            }}
          >
            {title}
          </span>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}

function formatSection(slug?: string) {
  if (!slug) return "Documentação";

  const normalized = slug.replaceAll("-", " ");
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}
