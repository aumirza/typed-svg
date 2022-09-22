import { CopyBlock, monokai, solarizedDark } from 'react-code-blocks'
import * as ReactDOMServer from 'react-dom/server'

type Props = {
    source: string
}

export const HtmlLink: React.FC<Props> = ({ source }) => {

    const code = <a href={source} > <img src={source} alt="" /></a>

    return (
        <div className='overflow-x-auto '>
            <h2 className='text-lg font-semibold'>Html</h2>
            <CopyBlock theme={monokai} language={'html'} wrapLines={true}
                text={ReactDOMServer.renderToStaticMarkup(code)} />
        </div>
    )
}
