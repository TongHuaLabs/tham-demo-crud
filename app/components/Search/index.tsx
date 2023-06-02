import type { FC } from "react";
import { Label, TextInput } from "flowbite-react";
import { HiSearch } from "react-icons/hi";

type SearchType = {
  className?: string;
};

const Search: FC<SearchType> = ({ className }) => {
  return (
    <form className={className}>
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <TextInput
        icon={HiSearch}
        id="search"
        name="search"
        placeholder="Search"
        required
        size={32}
        type="search"
      />
    </form>
  );
};

export default Search;
