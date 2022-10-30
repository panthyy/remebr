import { useState } from "react";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../components";

type state = {
  id: number;
} | null;

export default function test() {
  const [state, setState] = useState<state>(null);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <ContextMenu
        items={[
          {
            label: "Add Folder",
            onSelect: () => console.log("Add Folder"),
          },

          {
            label: "Delete",
            onSelect: () => console.log(`Delete ${state?.id}`),
            className: "bg-red-500 hover:bg-red-600",
          },
        ]}
      >
        <div className=" flex flex-col gap-5">
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <ContextMenuTrigger
                onSelect={() =>
                  setState({
                    id: index,
                  })
                }
              >
                one
              </ContextMenuTrigger>
            ))}
        </div>
      </ContextMenu>
    </div>
  );
}
