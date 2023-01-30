import React, { useEffect, useState } from "react";
import { ColorResult, RGBColor, SketchPicker } from "react-color";
import { defaultSvgConfig } from "../../Constants";
import { hexToRgb, toRgbString } from "../../utils";
import { InputGroup } from "../InputGroup/InputGroup";

type Props = {
  setSource: React.Dispatch<React.SetStateAction<URL | undefined>>;
};

export const Editor: React.FC<Props> = ({ setSource }) => {
  const [text, setText] = useState<string>(defaultSvgConfig.text);
  const [font, setFont] = useState<string>(defaultSvgConfig.font);
  const [duration, setDuration] = useState<number>(defaultSvgConfig.duration);
  const [multiline, setMultiline] = useState<boolean>(
    defaultSvgConfig.multiline
  );
  const [vCenter, setVCenter] = useState<boolean>(defaultSvgConfig.vCenter);
  const [center, setCenter] = useState<boolean>(defaultSvgConfig.center);
  const [fontSize, setFontSize] = useState<number>(defaultSvgConfig.fontSize);
  const [height, setHeight] = useState<number>(defaultSvgConfig.height);
  const [width, setWidth] = useState<number>(defaultSvgConfig.width);

  const [color, setColor] = useState<string>(defaultSvgConfig.color);
  const [background, setBackground] = useState<string>(
    defaultSvgConfig.background
  );

  const [fontColor, setFontColor] = useState<RGBColor>(hexToRgb(color));
  const [bgColor, setBgColor] = useState<RGBColor>(hexToRgb(background));

  const [showFontColorPicker, setShowFontColorPicker] =
    useState<boolean>(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState<boolean>(false);

  const handleFontColorClick = () =>
    setShowFontColorPicker(!showFontColorPicker);
  const handleBgColorClick = () => setShowBgColorPicker(!showBgColorPicker);

  const handleFontColorClose = () => setShowFontColorPicker(false);
  const handleBgColorClose = () => setShowBgColorPicker(false);

  useEffect(() => {
    if (showFontColorPicker) {
      document.addEventListener("click", handleFontColorClose);
      document.addEventListener("touchstart", handleFontColorClose);
      document.addEventListener("keydown", handleFontColorClose);

      document.addEventListener("click", handleBgColorClose);
      document.addEventListener("touchstart", handleBgColorClose);
      document.addEventListener("keydown", handleBgColorClose);
    } else {
      document.removeEventListener("click", handleFontColorClose);
      document.removeEventListener("touchstart", handleFontColorClose);
      document.removeEventListener("keydown", handleFontColorClose);

      document.removeEventListener("click", handleBgColorClose);
      document.removeEventListener("touchstart", handleBgColorClose);
      document.removeEventListener("keydown", handleBgColorClose);
    }
    return () => {
      document.removeEventListener("click", handleFontColorClose);
      document.removeEventListener("touchstart", handleFontColorClose);
      document.removeEventListener("keydown", handleFontColorClose);

      document.removeEventListener("click", handleBgColorClose);
      document.removeEventListener("touchstart", handleBgColorClose);
      document.removeEventListener("keydown", handleBgColorClose);
    };
  }, [showFontColorPicker, showBgColorPicker]);

  const handleFontColorChange = (color: ColorResult) => setFontColor(color.rgb);
  const handleBgColorChange = (color: ColorResult) => setBgColor(color.rgb);

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFont(e.target.value);
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDuration(parseInt(e.target.value));
  const handleMultilineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMultiline(e.target.value === "true" ? true : false);
  };

  const handleVCenterChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setVCenter(e.target.checked);
  const handleCenterChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCenter(e.target.checked);
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFontSize(parseInt(e.target.value));
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setHeight(parseInt(e.target.value));
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setWidth(parseInt(e.target.value));

  useEffect(() => {
    const background = toRgbString(bgColor);
    setBackground(background);
  }, [bgColor]);

  useEffect(() => {
    const colour = toRgbString(fontColor);
    setColor(colour);
  }, [fontColor]);

  useEffect(() => {
    // create url and params
    const baseUrl = window.location.origin;
    const sourceUrl = new URL(`${baseUrl}/api/svg`);

    const params = {
      text,
      font,
      duration,
      multiline,
      vCenter,
      center,
      fontSize,
      height,
      width,
      background,
      color,
    };

    const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] =>
      obj[key];

    Object.keys(params).forEach((key) => {
      const value = getKeyValue(params, key as keyof typeof params);
      if (value) {
        sourceUrl.searchParams.append(key, value.toString());
      }
    });

    setSource ? setSource(sourceUrl) : "";
  }, [
    font,
    text,
    duration,
    multiline,
    vCenter,
    center,
    fontSize,
    height,
    width,
    background,
    color,
    setSource,
  ]);

  return (
    <div className="bg-slate-700 p-5">
      <div className="">
        <h2 className="text-xl pb-1 mb-1 border-b text-white">Add Your Text</h2>
        <textarea
          onChange={handleTextChange}
          defaultValue={"The Fox is brown"}
          className="w-full rounded border-none"
        />
      </div>

      <div>
        <h2 className="text-xl text-white pb-1 mb-1 border-b">Configuration</h2>

        <InputGroup label="Font">
          <select onChange={handleFontChange}>{/* Google fonts name */}</select>
        </InputGroup>

        <InputGroup label="Font Size">
          <input
            onChange={handleFontSizeChange}
            value={fontSize}
            className="w-1/2 border"
            type="number"
          />
        </InputGroup>

        <InputGroup label="Duration">
          <div className="w-1/2 flex">
            <input
              onChange={handleDurationChange}
              value={duration}
              step="100"
              className="w-11/12 border"
              type="number"
            />
            <div className="bg-white">Ms</div>
          </div>
        </InputGroup>

        <InputGroup label="color">
          <div className="p-0.5 border">
            <div
              onClick={handleFontColorClick}
              style={{ background: color }}
              className="w-36 h-5"
            ></div>
          </div>
          {showFontColorPicker ? (
            <SketchPicker
              className="absolute z-10"
              color={fontColor}
              onChange={handleFontColorChange}
            />
          ) : (
            ""
          )}
        </InputGroup>

        <InputGroup label="Background Color">
          <div className="p-0.5 border">
            <div
              onClick={handleBgColorClick}
              style={{ background: background }}
              className="w-36 h-5"
            ></div>
          </div>
          {showBgColorPicker ? (
            <SketchPicker
              className="absolute z-10"
              color={bgColor}
              onChange={handleBgColorChange}
            />
          ) : (
            ""
          )}
        </InputGroup>

        <InputGroup label="Horizontal Centered">
          <input
            onChange={handleCenterChange}
            checked={center}
            className="w-1/2 border"
            type="checkbox"
            name=""
            id=""
          />
        </InputGroup>

        <InputGroup label="Vertically Centered">
          <input
            onChange={handleVCenterChange}
            checked={vCenter}
            className="w-1/2 border"
            type="checkbox"
            name=""
            id=""
          />
        </InputGroup>

        <InputGroup label="Multiline">
          <select
            onChange={handleMultilineChange}
            value={multiline ? "true" : "false"}
            className="w-1/2 border"
            name=""
            id=""
          >
            <option value="true">New line</option>
            <option value="false">same line</option>
          </select>
        </InputGroup>

        <InputGroup label="Dimension(WxH)">
          <div className="flex w-1/2 relative">
            <input
              className="w-[46%] border"
              type="number"
              onChange={handleWidthChange}
              value={width}
            />
            <span> X </span>
            <input
              className="w-[46%] border"
              type="number"
              onChange={handleHeightChange}
              value={height}
            />
          </div>
        </InputGroup>
      </div>
    </div>
  );
};
