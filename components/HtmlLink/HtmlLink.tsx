import * as ReactDOMServer from "react-dom/server";
import { CopyCode } from "../CopyCode";

type Props = {
  source: string;
};

export const HtmlLink: React.FC<Props> = ({ source }) => {
  const code = (
    <a href={source}>
      {" "}
      <img src={source} alt="" />
    </a>
  );

  return (
    <div className="">
      <h2 className="text-lg font-semibold">Html</h2>
      <CopyCode>{ReactDOMServer.renderToStaticMarkup(code)}</CopyCode>
    </div>
  );
};
