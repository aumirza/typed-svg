import React, { useEffect, useState } from "react"
import { ColorResult, RGBColor, SketchPicker } from 'react-color'
import { InputGroup } from "../InputGroup/InputGroup"

type Props = {
    setSource: React.Dispatch<React.SetStateAction<URL>> | undefined
}

export const Editor: React.FC<Props> = ({ setSource }) => {

    const [text, setText] = useState<string>('')
    const [size, setSize] = useState('')
    const [duration, setDuration] = useState('')
    const [fontColor, setFontColor] = useState<RGBColor>({ r: 0, g: 0, b: 0, a: 1, })
    const [bgColor, setBgColor] = useState<RGBColor>({ r: 255, g: 255, b: 255, a: 1, })

    const [showFontColor, setShowFontColor] = useState(false)
    const [showBgColor, setShowBgColor] = useState(false)

    const handleFontColorChange = (color: ColorResult) => setFontColor(color.rgb)
    const handleBgColorChange = (color: ColorResult) => setBgColor(color.rgb)

    const toRgbString = (rgb: RGBColor) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b},${rgb.a})`



    useEffect(() => {
        // create url and params
        const baseUrl = window.location.origin
        const sourceUrl = new URL(`${baseUrl}/api/svg`)

        const params = {
            size: size,
            text: text,
            duration: duration,
            fontColor: toRgbString(fontColor),
            bgColor: toRgbString(bgColor),
        };

        (Object.keys(params) as (keyof typeof params)[])
            .forEach(key => {
                const val = params[key]
                if (val) sourceUrl.searchParams.append(key, val)
            })

        setSource ? setSource(sourceUrl) : ''
    }, [text, size, duration, fontColor, bgColor])


    return (
        <div className="bg-slate-700 p-5">
            <div className="">
                <h2 className="text-xl pb-1 mb-1 border-b text-white"  >Add Your Text</h2>
                <textarea onChange={(e) => setText(e.target.value)} defaultValue={'The Fox is brown'} className="w-full rounded border-none" />
            </div>

            <div>

                <h2 className="text-xl text-white pb-1 mb-1 border-b">Configuration</h2>

                <InputGroup label='Font'>
                    <select onChange={e => console.log(e)}>
                        <option value="Poppins">Poppins</option>
                        {/* Google fonts name */}
                    </select>
                </InputGroup>

                <InputGroup label='Size'>
                    <input onChange={(e) => setSize(e.target.value)} defaultValue='30' className="w-1/2 border" type="number" />
                </InputGroup>

                <InputGroup label='Duration'>
                    <div className="w-1/2 flex">
                        <input onChange={(e) => setDuration(e.target.value)} defaultValue='1000' step='100' className="w-11/12 border" type="number" />
                        <div className="bg-white">Ms</div>
                    </div>
                </InputGroup>

                <InputGroup label="color">
                    <div className="p-0.5 border">
                        <div onClick={() => setShowFontColor(!showFontColor)} style={{ background: toRgbString(fontColor) }} className="w-36 h-5"></div>
                    </div>
                    {showFontColor ?
                        <SketchPicker className="absolute z-10" color={fontColor} onChange={handleFontColorChange} />
                        : ''}
                </InputGroup>

                <InputGroup label="Background Color">
                    <div className="p-0.5 border">
                        <div onClick={() => setShowBgColor(!showBgColor)} style={{ background: toRgbString(bgColor) }} className="w-36 h-5"></div>
                    </div>
                    {showBgColor ?
                        <SketchPicker className="absolute z-10" color={bgColor} onChange={handleBgColorChange} />
                        : ''}
                </InputGroup>

                <InputGroup label='Horizontal Centered'>
                    <input className="w-1/2 border" type="checkbox" name="" id="" />
                </InputGroup>

                <InputGroup label='Vertically Centered'>
                    <input className="w-1/2 border" type="checkbox" name="" id="" />
                </InputGroup>


                <InputGroup label='Multiline'>
                    <select className="w-1/2 border" name="" id="">
                        <option value="">New line</option>
                        <option value="">same line</option>
                    </select>
                </InputGroup>

                <InputGroup label='Dimension(WxH)'>
                    <div className="flex w-1/2 relative">
                        <input className="w-[46%] border" type="number" />
                        <span> X </span>
                        <input className="w-[46%] border" type="number" />
                    </div>
                </InputGroup>

            </div>

        </div>
    )
}
