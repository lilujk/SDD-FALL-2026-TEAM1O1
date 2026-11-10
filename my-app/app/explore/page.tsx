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



  return <div className="flex flex-row gap-5">

    <div className="flex flex-row mt-10 ml-5">
      <SearchPane></SearchPane>
    </div>

    <div className="flex flex-col gap-5 mt-10">
      <ResourceListing title={title} description={description} tags={tags}></ResourceListing>
      <ResourceListing title={title} description={description} tags={tags}></ResourceListing>
      <ResourceListing title={title} description={description} tags={tags}></ResourceListing>
      <ResourceListing title={title} description={description} tags={tags}></ResourceListing>
      <ResourceListing title={title} description={description} tags={tags}></ResourceListing>
      <ResourceListing title={title} description={description} tags={tags}></ResourceListing>
      <ResourceListing title={title} description={description} tags={tags}></ResourceListing>
      <ResourceListing title={title} description={description} tags={tags}></ResourceListing>
      <ResourceListing title={title} description={description} tags={tags}></ResourceListing>
      <ResourceListing title={title} description={description} tags={tags}></ResourceListing>
    </div>

  </div>;
}