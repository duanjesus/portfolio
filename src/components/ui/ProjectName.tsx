import { Fragment } from "react";

/** Allows a line break after each dot, so names like CLASSCONT.RHFOLHA wrap on narrow screens. */
export function ProjectName({ name }: { name: string }) {
  const parts = name.split(".");
  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <>
              .<wbr />
            </>
          )}
        </Fragment>
      ))}
    </>
  );
}
