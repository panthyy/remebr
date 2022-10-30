import {
  createRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Tree, { useTreeState } from "react-hyper-tree";
import { BsChevronRight } from "react-icons/bs";
import { useClickedOutside } from "../hooks/useClickedOutside";
import { Card, Folder, folderorcard, useTreeStore } from "../stores";
import { ContextMenu, ContextMenuTrigger } from "./ContextMenu";
import { useAutoAnimate } from "../hooks/useAutoAnimation";
import { recursiveDelete } from "../utils";
const MenuItem = ({
  data,
  setState,
  setSelected,
}: {
  data: Folder | Card;
  setState: (state: Folder | Card | null) => void;
  setSelected: (arg0: folderorcard) => void;
}) => {
  const { name } = data;
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <ContextMenuTrigger onSelect={() => setState(data)}>
        <div
          onClick={() => {
            data.id && setSelected(data);
          }}
          className=" flex flex-col font-inter font-semibold text-primary"
        >
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className=" flex  items-center gap-2 py-1 hover:cursor-pointer hover:bg-primaryDark hover:text-white rounded-md px-4"
          >
            {
              // @ts-ignore
              data.children && <BsChevronRight />
            }
            <span>{name}</span>
          </div>
        </div>
      </ContextMenuTrigger>
      <div className=" pl-8">
        {
          // @ts-ignore
          data.children &&
            isExpanded &&
            // @ts-ignore
            data.children.map((child, index) => (
              <MenuItem
                key={index}
                data={child}
                setSelected={setSelected}
                setState={setState}
              />
            ))
        }
      </div>
    </>
  );
};

export type MenuProps = {
  setSelected: (arg0: folderorcard) => void;
};
const Menu = (props: MenuProps) => {
  const [state, setState] = useState<Folder | Card | null>(null);
  const [items, setItems] = useState<folderorcard[]>([]);
  const treeState = useTreeStore();

  const [parentRef, enable] = useAutoAnimate<HTMLDivElement>();

  const deleteItem = (id: string) => {
    treeState.deleteItem(id);
  };
  const addItem = (
    item: folderorcard,
    parentId?: string | null | undefined
  ) => {
    treeState.addItem(item, parentId);
  };

  useEffect(() => {
    setItems(treeState.folders);
  }, [treeState]);

  return (
    <ContextMenu
      onClickedBackground={() => {
        setState(null);
      }}
      items={[
        {
          label: "Add Folder",
          onSelect: () => {
            // ask browser for name
            console.log(state);

            const answer = prompt("Enter Folder Name");
            if (answer) {
              addItem(
                {
                  name: answer,
                  parentId: state?.id,
                  children: [],
                },
                state?.id
              );
            }
          },
        },

        {
          label: state ? "Delete" : "",
          onSelect: () => {
            console.log(state);

            if (state) {
              // @ts-ignore
              state.children
                ? state.id && deleteItem(state.id)
                : console.log("delete card");
            }
          },
          className: "bg-red-500 hover:bg-red-600",
        },
      ]}
    >
      <div ref={parentRef} className=" flex flex-col gap-1 h-full w-full ">
        {items.map((item, index) => (
          <MenuItem
            setState={setState}
            setSelected={props.setSelected}
            key={index}
            data={item}
          />
        ))}
      </div>
    </ContextMenu>
  );
};

export default Menu;
