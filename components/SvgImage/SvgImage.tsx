import { useEffect, useRef, useState } from "react";

export const SvgImage: React.FC<SvgProps> = ({
  lines,
  height,
  width,
  multiline,
  vCenter,
  center,
  background,
  duration,
  font,
  color,
  fontSize,
}) => {
  const lineHeight = fontSize * 1.5;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${width} ${height}`}
      style={{ backgroundColor: background }}
      width={width + "px"}
      height={height + "px"}
    >
      {font && (
        <style>{`@import url('https://fonts.googleapis.com/css2?family=${font.replace(
          " ",
          "+"
        )}&display=swap');`}</style>
      )}

      {lines.map((line, i) => (
        <>
          <path id={"path" + i}>
            {multiline ? (
              <animate
                id={"d" + i}
                attributeName="d"
                dur={duration * (i + 1) + "ms"}
                fill="freeze"
                begin={"0s;" + "d" + (lines.length - 1) + ".end"}
                keyTimes={"0;" + i / (i + 1) + ";1"}
                values={
                  "m0," +
                  (i + 1) * lineHeight +
                  " h0 ; m0," +
                  (i + 1) * lineHeight +
                  " h0 ; m0," +
                  (i + 1) * lineHeight +
                  " h" +
                  width
                }
              />
            ) : (
              <animate
                id={"d" + i}
                attributeName="d"
                begin={
                  (i == 0 ? "0s;" : "") +
                  (i == 0 ? "d" + (lines.length - 1) : "d" + i) +
                  ".end"
                }
                dur={duration + "ms"}
                keyTimes="0;0.8;1"
                values={
                  "m0," +
                  height / 2 +
                  " h0 ; m0," +
                  height / 2 +
                  " h" +
                  width +
                  "; m0," +
                  height / 2 +
                  "h0"
                }
              />
            )}
          </path>

          <text
            fontFamily={[font, "monospace"].join(",")}
            fill={color}
            fontSize={fontSize}
            dominantBaseline={vCenter ? "middle" : "auto"}
            x={center ? "50%" : "0%"}
            textAnchor={center ? "middle" : "start"}
          >
            <textPath xlinkHref={"#path" + i}>{line}</textPath>
          </text>
        </>
      ))}
    </svg>
  );
};
