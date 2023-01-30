import type { NextApiRequest, NextApiResponse } from "next";
import * as ReactDOMServer from "react-dom/server";
import React from "react";
import { SvgImage } from "../../components";
import { defaultSvgConfig } from "../../Constants";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const query = req.query;
  const props = {
    lines: query.text
      ? (query.text as string).split(";")
      : defaultSvgConfig.text.split(";"),
    multiline: Boolean(query.multiline) ?? defaultSvgConfig.multiline,
    width: query.width
      ? parseInt(query.width as string)
      : defaultSvgConfig.width,
    height: query.height
      ? parseInt(query.height as string)
      : defaultSvgConfig.height,
    background: (query.background as string) ?? defaultSvgConfig.background,
    vCenter: Boolean(query.vCenter) ?? defaultSvgConfig.vCenter,
    center: Boolean(query.center) ?? defaultSvgConfig.center,
    duration: query.duration
      ? parseInt(query.duration as string)
      : defaultSvgConfig.duration,
    font: (query.font as string) ?? defaultSvgConfig.font,
    fontSize: query.fontSize
      ? parseInt(query.fontSize as string)
      : defaultSvgConfig.fontSize,
    color: (query.color as string) ?? defaultSvgConfig.color,
  };

  const markup = ReactDOMServer.renderToStaticMarkup(
    React.createElement(SvgImage, props)
  );

  // send html response
  res.setHeader("Content-Type", "image/svg+xml");
  res.status(200).send(markup);
}
