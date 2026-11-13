import SearchPane from "@/components/SearchPane";
import ResourceListing from "@/components/ResourceListing";
import FormRowTextInput from "@/components/FormRowTextInput";

const tags = [
  { name: "Color", type: "topical" },
  { name: "Palettes", type: "topical" },
  { name: "Hues", type: "topical" },
  { name: "Web Tool", type: "medium" },
  { name: "Free", type: "price" },
] as const;
const description =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London.";
const title = "Poline — Esoteric Color Palette Generation Library";

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

    <div className="flex flex-row gap-5">
      <div className="flex flex-row items-start ml-5 mt-2">
        <SearchPane></SearchPane>
      </div>

      <div className="flex flex-col gap-2">
        <ResourceListing title={title} description={description} tags={tags} link={"/individual-resource"}></ResourceListing>
        <ResourceListing title={title} description={description} tags={tags} link={"/individual-resource"}></ResourceListing>
        <ResourceListing title={title} description={description} tags={tags} link={"/individual-resource"}></ResourceListing>
        <ResourceListing title={title} description={description} tags={tags} link={"/individual-resource"}></ResourceListing>
        <ResourceListing title={title} description={description} tags={tags} link={"/individual-resource"}></ResourceListing>
        <ResourceListing title={title} description={description} tags={tags} link={"/individual-resource"}></ResourceListing>
        <ResourceListing title={title} description={description} tags={tags} link={"/individual-resource"}></ResourceListing>
        <ResourceListing title={title} description={description} tags={tags} link={"/individual-resource"}></ResourceListing>
        <ResourceListing title={title} description={description} tags={tags} link={"/individual-resource"}></ResourceListing>
        <ResourceListing title={title} description={description} tags={tags} link={"/individual-resource"}></ResourceListing>
      </div>
    </div>

  </div>;
}