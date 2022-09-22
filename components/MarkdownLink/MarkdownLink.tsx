import { CopyBlock, monokai } from 'react-code-blocks'

type Props = {
    source: string
}

export const MarkdownLink: React.FC<Props> = ({ source }) => {

    const code = `[![title](${source})(${source})]`

    return (
        <div className="mb-2 overflow-x-auto">
            <h2 className='text-lg font-semibold'>Markdown</h2>
            <CopyBlock theme={monokai} language={'markdown'} wraplines
                text={code} />
        </div>
    )
}
