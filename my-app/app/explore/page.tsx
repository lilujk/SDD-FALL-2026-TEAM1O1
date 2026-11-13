import SearchPane from "@/components/SearchPane";
import ResourceListing from "@/components/ResourceListing";

const title = "Poline — Esoteric Color Palette Generation Library";
const description =
  "Poline is an interactive color palette generator that helps you explore and create distinctive color combinations. Adjust colors and their positions to shape a palette that fits your project.";
const tags = [
  { name: "Color", type: "topical" },
  { name: "Palettes", type: "topical" },
  { name: "Hues", type: "topical" },
  { name: "Web Tool", type: "medium" },
  { name: "Free", type: "price" },
] as const;

const title2 = "Google Fonts";
const description2 =
  "Google Fonts is a library where you can browse, preview, and download open-source fonts for your projects. It makes it easy to explore different type styles and find one that fits your design.";
const tags2 = [
  { name: "Fonts", type: "topical" },
  { name: "Typography", type: "topical" },
  { name: "Web Tool", type: "medium" },
  { name: "Free", type: "price" },
] as const;

const title3 = "Line of Action";
const description3 =
  "Line of Action provides timed photo references to help artists practice figure drawing, gesture, proportions, and movement.";
const tags3 = [
  { name: "Figure Drawing", type: "topical" },
  { name: "Anatomy", type: "topical" },
  { name: "Sketching", type: "topical" },
  { name: "Web Tool", type: "medium" },
  { name: "Free", type: "price" },
  { name: "Nudity", type: "warning" },
] as const;

const title4 = "Krita";
const description4 =
  "Krita is a free, open-source digital painting program for creating illustrations, concept art, comics, and animations.";
const tags4 = [
  { name: "Digital Art", type: "topical" },
  { name: "Sketching", type: "topical" },
  { name: "Drawing", type: "topical" },
  { name: "Application", type: "medium" },
  { name: "Free", type: "price" },
] as const;


export default function Explore({}) {



  return <div className="flex flex-col items-end">
    <div className="flex flex-col m-2 mt-5">
      <div className="relative">
        <input
          name="Search"
          type="search"
          placeholder="Explore Resources"
          className="border border-black text-black placeholder:text-black rounded-sm px-2 py-0.5 pr-9 min-w-175"
        />
        <img
          src="/search.png"
          alt=""
          aria-hidden="true"
          className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 object-contain"
        />
      </div>
    </div>

    <div className="flex w-full flex-row items-start gap-5">
      <div className="ml-5 mt-2 shrink-0">
        <SearchPane />
      </div>

      <div className="mb-10 flex min-w-0 flex-1 flex-col gap-2">
        <div className="mb-10 flex min-w-0 flex-1 flex-col gap-2">
          <ResourceListing
            title={title}
            description={description}
            tags={tags}
            link={`/individual-resource/${1}`}
          />
        </div>
      </div>
    </div>

  </div>;
}