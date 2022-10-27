import Head from "next/head";
import Image from "next/image";
import { useCardStore } from "../stores/CardStore";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [cards] = useCardStore((state) => [state.cards]);
  return (
    <div>
      {cards.map((card) => (
        <div key={card.id}>
          <h1>{card.title}</h1>
          <p>{card.front}</p>
          <p>{card.back}</p>
          <p>{card.phrase}</p>
        </div>
      ))}
    </div>
  );
}
