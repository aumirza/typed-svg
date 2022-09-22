import Image from 'next/image'
import { MarkdownLink, HtmlLink } from '../../components'

type Props = {
    source: URL | undefined
}

export const Preview: React.FC<Props> = ({ source }) => {
    return (
        <div>
            <img src={source?.toString()} key={source?.toString()} width={400} height={60} alt='svg image' />
            <MarkdownLink source={source?.toString() ?? ''} />
            <HtmlLink source={source?.toString() ?? ''} />
        </div>
    )
}
