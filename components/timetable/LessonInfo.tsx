import { ReactNode } from "react";
import InfoLine from "./InfoLine";

const text = {
  bold: "flex flex-row gap-1 font-body font-bold justify-end flex-wrap",
  semibold: "flex flex-row gap-1 font-body font-body justify-end",
};

export interface LessonInfoProps {
  lesson: string;
  newLesson?: string;
  teacher: string;
  newTeacher?: string;
  room: string;
  newRoom?: string;
}

export default function LessonInfo({
  lesson = "",
  newLesson = "",
  teacher = "",
  newTeacher = "",
  room = "",
  newRoom = "",
}: LessonInfoProps) {
  return (
    <div className={`flex flex-col`}>
      <InfoLine info={lesson} newInfo={newLesson} bold={true}></InfoLine>
      <InfoLine info={teacher} newInfo={newTeacher}></InfoLine>
      <InfoLine info={room} newInfo={newRoom} bold={true}></InfoLine>
    </div>
  );
}
