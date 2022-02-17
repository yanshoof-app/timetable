import { ReactNode } from "react";
import { HourOfDay, ILesson } from "../../interfaces";
import InfoLine from "./InfoLine";

const text = {
  bold: "flex flex-row gap-1 font-body font-bold justify-end flex-wrap",
  semibold: "flex flex-row gap-1 font-body font-body justify-end",
};

export interface LessonInfoProps {
  lesson: ILesson;
  hour: HourOfDay;
}

export default function LessonInfo({
  lesson = { class: "", subject: "", teacher: "" },
}: LessonInfoProps) {
  return <div className={`flex flex-col`}></div>;
}
