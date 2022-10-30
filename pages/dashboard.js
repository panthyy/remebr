import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Header, Button, DarkModeToggle } from "../components";
import { useTreeStore } from "../stores";
import { folderorcard } from "../stores";
export default function DashboardPage() {
  const [folders, getItem, addItem] = useTreeStore((state) => [
    state.folders,
    state.getItem,
    state.addItem,
  ]);
  const [selected, setSelected] = useState(null);
  const [newCard, setNewCard] = useState({});

  const DynamicMenu = dynamic(() => import("../components/Menu"), {
    ssr: false,
  });

  const Menu = useMemo(() => <DynamicMenu setSelected={setSelected} />, []);

  return (
    <div className="relative w-full h-full flex flex-col dark:bg-DarkPrimary">
      <div className=" absolute top-10 right-10">
        <DarkModeToggle />
      </div>
      <Header selectedItem={selected} />
      <div className=" flex w-full h-full pb-8 px-8 ">
        <div className=" w-[250px] h-full border-r-2 border-primaryLightest pr-4  pt-20 ">
          {Menu}
        </div>
        <div className=" w-full h-full flex flex-col gap-5 ">
          <input
            className=" w-[200px] ml-5 px-2 py-2  h-10  border-primaryLightest border-b-2 dark:border-primaryDark"
            placeholder="Name"
            value={newCard.name}
            onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
          />
          <div className=" flex items-center w-full px-[20%] h-full flex-col justify-center gap-5">
            <h3 className=" text-primary font-bold font-inter text-xl">
              Question
            </h3>
            <textarea
              value={newCard.front}
              onChange={(e) =>
                setNewCard({ ...newCard, front: e.target.value })
              }
              className=" w-full h-full  border-2  p-2 border-none"
            />
          </div>
          <div className=" w-full h-2 bg-primaryLightest rounded-lg"></div>
          <div className=" flex items-center  px-[20%] flex-col  w-full h-full justify-center gap-5">
            <h3 className=" text-primary font-bold font-inter text-xl">
              Answer
            </h3>
            <textarea
              value={newCard.back}
              onChange={(e) => setNewCard({ ...newCard, back: e.target.value })}
              className=" w-full h-full  border-2 border-none p-2"
            />
          </div>
        </div>
        <div className="w-[350px] flex gap-5 flex-col h-full justify-between  border-l-2 border-primaryLightest">
          <div className=" w-full h-full flex flex-col items-center ">
            <div className=" flex flex-col items-center justify-center">
              <h4 className=" text-primary font-bold font-inter text-xl ">
                Remebr Phrase
              </h4>
            </div>
            <textarea
              value={newCard.remember}
              onChange={(e) =>
                setNewCard({ ...newCard, remember: e.target.value })
              }
              className=" w-full h-full  border-2 border-none  p-2"
            />
          </div>
          <div className=" w-full flex items-center justify-center">
            <Button
              onClick={() => {
                addItem(newCard, selected.id);
                setNewCard({
                  name: "",
                  front: "",
                  back: "",
                  remember: "",
                });
              }}
            >
              <h4 className="  font-bold font-inter text-md ">Save</h4>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
