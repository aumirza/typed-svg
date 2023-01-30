import { CopyCode } from "../CopyCode";

type Props = {
  source: string;
};

export const MarkdownLink: React.FC<Props> = ({ source }) => {
  return (
    <div className="mb-2 overflow-x-auto max-w-full overflow-hidden">
      <h2 className="text-lg font-semibold">Markdown</h2>
      <CopyCode>{`[![title](${source})](${source})`}</CopyCode>
    </div>
  );
};
