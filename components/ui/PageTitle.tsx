import Icon from "../icons";

export interface PageTitleProps {
  title: string;
  startIcon?: Icon;
  onStartIconClick?(): unknown;
  endIcon?: Icon;
  onEndIconClick?(): unknown;
  orientation?: "justify-start" | "justify-between";
}

export default function PageTitle({
  title,
  startIcon: StartIcon,
  onStartIconClick,
  endIcon: EndIcon,
  onEndIconClick,
  orientation = "justify-between",
}: PageTitleProps) {
  return (
    <div className={`flex flex-row ${orientation}`}>
      {StartIcon && onStartIconClick && (
        <button onClick={onStartIconClick}>
          <StartIcon width={24} height={24} />
        </button>
      )}

      <h1 className="font-bold text-lg">{title}</h1>

      {EndIcon && onEndIconClick && (
        <button onClick={onEndIconClick}>
          <EndIcon width={24} height={24} />
        </button>
      )}
    </div>
  );
}
