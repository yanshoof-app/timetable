import { ReactNode } from "react";

const text = {
  bold: "flex flex-row gap-1 font-body font-bold justify-end flex-wrap",
  semibold: "flex flex-row gap-1 font-body font-body justify-end",
};

export interface InfoLineProps {
  info: string;
  newInfo?: string;
  bold?: boolean;
}

export default function InfoLine({
  info = "",
  newInfo = "",
  bold = false,
}: InfoLineProps) {
  return (
    <div className={`${text[`${bold ? "bold" : "semibold"}`]}`}>
      {newInfo && <p>{newInfo}</p>}
      <p className={`${newInfo && "line-through"}`}>{info}</p>
    </div>
  );
}
