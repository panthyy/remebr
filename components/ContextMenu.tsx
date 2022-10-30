import * as ContextMenuRadix from "@radix-ui/react-context-menu";
import classNames from "classnames";
import { createRef, useEffect, useRef } from "react";

export type ContextMenuItem = {
  label: string;
  className?: string;
  onSelect?: (state: Record<string, any>) => void;
};
export type ContextMenuProps = {
  items: ContextMenuItem[];
  children?: React.ReactNode;
  onClickedBackground?: () => void;
};

export const ContextMenuTrigger = ({
  children,
  onSelect = () => {},
}: {
  children: React.ReactNode;
  onSelect?: () => void;
}) => {
  return (
    <div
      onContextMenu={(e) => {
        onSelect();
      }}
    >
      {children}
    </div>
  );
};
export const ContextMenu = ({
  items = [],
  children,
  onClickedBackground,
}: ContextMenuProps) => {
  const ContextMenuRef = createRef<HTMLDivElement>();
  const TriggerAreaRef = createRef<HTMLDivElement>();

  return (
    <ContextMenuRadix.Root>
      <ContextMenuRadix.Trigger
        asChild
        ref={TriggerAreaRef}
        onContextMenu={(e) => {
          const native = e.nativeEvent.target as HTMLElement;
          console.log(native);
          if (TriggerAreaRef.current === native) {
            onClickedBackground && onClickedBackground();
          }
        }}
      >
        {children}
      </ContextMenuRadix.Trigger>
      <ContextMenuRadix.Portal>
        <ContextMenuRadix.Content
          alignOffset={10}
          className="bg-primary rounded-md shadow-lg p-2 flex flex-col gap-2 w-[150px] "
          data-align="end"
        >
          {items
            .filter((item) => item.label !== "")
            .map((item, index) => (
              <ContextMenuRadix.Item
                className={classNames("ContextMenuItem", item.className)}
                key={index}
                onSelect={item.onSelect}
              >
                {item.label}
              </ContextMenuRadix.Item>
            ))}
        </ContextMenuRadix.Content>
      </ContextMenuRadix.Portal>
    </ContextMenuRadix.Root>
  );
};
