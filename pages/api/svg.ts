import type { NextApiRequest, NextApiResponse } from 'next'
import * as ReactDOMServer from 'react-dom/server'
import React from 'react'
import { SvgImage } from "../../components"

export default function handler(req: NextApiRequest, res: NextApiResponse<string>) {

    const query = req.query
    const props = {
        lines: query.text ? (query.text as string).split(';') : ['The fox is brown'],
        multiline: Boolean(query.multiline) ?? false,
        width: query.width ? parseInt(query.width as string) : 400,
        height: query.height ? parseInt(query.height as string) : 60,
        background: (query.background as string) ?? '#fff',
        vCenter: Boolean(query.vCenter) ?? false,
        center: Boolean(query.center) ?? false,
        duration: query.duration ? parseInt(query.duration as string) : 3000,
        font: (query.font as string) ?? null,
        fontSize: query.fontSize ? parseInt(query.fontSize as string) : 30,
        color: (query.color as string) ?? '#000',
    }

    console.log(props)

    const markup = ReactDOMServer.renderToStaticMarkup(
        React.createElement(SvgImage, props)
    )

    // send html response
    res.setHeader('Content-Type', 'image/svg+xml')
    res.status(200).send(markup)

}