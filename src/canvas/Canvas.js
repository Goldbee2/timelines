import { findByLabelText } from "@testing-library/react";
import React, { useEffect, useRef, useState } from "react";

function Canvas(props) {
  const canvasRef = useRef(null);
  var currentY = 0;

  const tlEvents = props.tlEvents;

  const LINE_WIDTH = 6;
  const TLEVENT_FILL_STYLE = "#c3d6c8";
  const TLEVENT_TEXT_FILL = "#2f690e";
  const TLEVENT_XPADDING = 16;
  const TLEVENT_YPADDING = 32;

  const TL_PADDING_LENGTH = 72;
  const CANVAS_PADDING_LENGTH = 72;

  const SHADOW_COLOR = "rgba(0, 0, 0, 0.08)";

  const TEXT_LINE_LENGTH = 40;
  const FONT_HEIGHT_IN_PIXELS = 16;
  const FONT_WIDTH_IN_PIXELS = 8;

  const [MIDPOINT, setMidpoint] = useState(400); // midpoint is middle of canvas, handle updates later

  // <--------------------------------->

  function renderTLPadding(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(MIDPOINT, currentY);
    ctx.lineTo(x, y + TL_PADDING_LENGTH);
    ctx.stroke();
  }

  function renderTLEvent(ctx, x, y, tlEvent, direction) {
    const desc = splitText(tlEvent.description);
    renderTLMarker(ctx, x, y, tlEvent);
    const height = renderTLRect(ctx, x, y, tlEvent, direction);
    renderTLText(ctx, x, y, tlEvent, direction);
    // generate padding length from currentY to bottom of padding.
    renderTLPadding(ctx, x, currentY);
    // then, update currentY to bottom of padding.
    // should be only currenty update in a single event's rendering process. should update
    currentY += TL_PADDING_LENGTH;
  }

  function renderTLMarker(ctx, x, y) {
    ctx.fillStyle = TLEVENT_TEXT_FILL;
    ctx.strokeStyle = TLEVENT_TEXT_FILL;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
  }

  function renderTLEndCap(ctx, x, y) {
    ctx.fillStyle = TLEVENT_TEXT_FILL;
    ctx.strokeStyle = TLEVENT_TEXT_FILL;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
  }

  function renderTLRect(ctx, x, y, tlEvent, direction) {
    const desc = splitText(tlEvent.description);
    console.log(desc);
    const height = FONT_HEIGHT_IN_PIXELS * desc.length + 2 * TLEVENT_YPADDING;
    const width =
      FONT_WIDTH_IN_PIXELS * TEXT_LINE_LENGTH + 2 * TLEVENT_XPADDING;
    ctx.fillStyle = TLEVENT_FILL_STYLE;


    

    x -= width * direction;
    x -= (2 * direction - 1) * TLEVENT_XPADDING;
    y -= height / 2;
    ctx.fillRect(x, y, width, height);
    return height;
  }

  function renderTLText(ctx, x, y, tlEvent, direction) {
    // const desc = splitText(tlEvent.description);
    // ctx.fillStyle = TLEVENT_TEXT_FILL;
    // for (let i = 0; i < desc.length; i++) {
    //   ctx.fillText(desc[i], x, y + i * (1.2 * FONT_HEIGHT_IN_PIXELS));
    // }
  }

  function splitText(text, lineLength = TEXT_LINE_LENGTH) {
    const numLines = Math.ceil(text.length / lineLength);
    const lines = new Array(numLines);

    for (let i = 0, o = 0; i < numLines; i++, o += lineLength) {
      lines[i] = text.substr(o, lineLength);
    }
    return lines;
  }

  function canvasContent(ctx) {
    
    ctx.shadowOffsetX = 8;
    ctx.shadowOffsetY = 8;
    ctx.shadowColor = SHADOW_COLOR;
    ctx.shadowBlur = 20;


    console.log("Rerendering canvas content...");
    ctx.strokeStyle = "#fff000";
    ctx.moveTo(MIDPOINT, CANVAS_PADDING_LENGTH);
    currentY = CANVAS_PADDING_LENGTH;
    var left = true;
    renderTLEndCap(ctx, MIDPOINT, currentY);
    renderTLPadding(ctx, MIDPOINT, TL_PADDING_LENGTH);
    currentY += TL_PADDING_LENGTH;
    for (var i = 0; i < tlEvents.length; i++) {
      let tlEvent = tlEvents[i];
      renderTLEvent(ctx, MIDPOINT, currentY, tlEvent, left);
      left = !left;
    }
    renderTLEndCap(ctx, MIDPOINT, currentY);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvasContent(ctx);
  });

  return <canvas width="800px" height="800px" ref={canvasRef} />;
}
export default Canvas;
