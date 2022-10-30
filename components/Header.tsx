import { folderorcard } from "../stores";
import { Logo } from "./Logo";
export const Header = ({
  selectedItem,
}: {
  selectedItem: folderorcard | null;
}) => {
  return (
    <header className=" p-9  flex items-center">
      <div className=" flex items-center justify-center gap-20">
        <Logo headingSize="4xl" gap={1} sloganSize="sm" />
        <div className="flex items-center justify-center gap-10">
          <span className=" text-primary font-inter font-semibold">
            Study all
          </span>
          <div className="text-primary font-inter">{selectedItem?.name}</div>
        </div>
      </div>
    </header>
  );
};
