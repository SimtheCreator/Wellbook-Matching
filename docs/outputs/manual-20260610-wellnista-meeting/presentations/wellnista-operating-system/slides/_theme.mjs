export const C = {
  paper: "#F7F1E8",
  ink: "#12211D",
  muted: "#5F6B64",
  green: "#2E6F5B",
  mint: "#8ED6BF",
  coral: "#E87961",
  gold: "#C69A45",
  blue: "#5177A8",
  line: "#D8CCC0",
  white: "#FFFFFF",
  dark: "#0E1A17",
};

export function bg(slide, ctx, fill = C.paper) {
  ctx.addShape(slide, { x: 0, y: 0, w: ctx.W, h: ctx.H, fill, line: ctx.line("#00000000", 0) });
}

export function footer(slide, ctx, num) {
  ctx.addText(slide, {
    text: `Wellnista Operating System · ${String(num).padStart(2, "0")}`,
    x: 54,
    y: 676,
    w: 360,
    h: 18,
    fontSize: 10,
    color: C.muted,
    face: "Aptos",
  });
  ctx.addShape(slide, { x: 1116, y: 683, w: 110, h: 2, fill: C.line, line: ctx.line("#00000000", 0) });
}

export function kicker(slide, ctx, text, x = 58, y = 48, color = C.green) {
  ctx.addShape(slide, { x, y: y + 7, w: 28, h: 3, fill: color, line: ctx.line("#00000000", 0) });
  ctx.addText(slide, {
    text: text.toUpperCase(),
    x: x + 42,
    y,
    w: 520,
    h: 24,
    fontSize: 12,
    bold: true,
    color,
    face: "Aptos",
    valign: "middle",
  });
}

export function title(slide, ctx, text, sub = "") {
  ctx.addText(slide, {
    text,
    x: 56,
    y: 82,
    w: 840,
    h: 86,
    fontSize: 36,
    bold: true,
    color: C.ink,
    face: "Leelawadee UI",
  });
  if (sub) {
    ctx.addText(slide, {
      text: sub,
      x: 58,
      y: 178,
      w: 760,
      h: 44,
      fontSize: 17,
      color: C.muted,
      face: "Leelawadee UI",
    });
  }
}

export function label(slide, ctx, text, x, y, w, h, opts = {}) {
  return ctx.addText(slide, {
    text,
    x,
    y,
    w,
    h,
    fontSize: opts.size ?? 17,
    bold: opts.bold ?? false,
    color: opts.color ?? C.ink,
    face: opts.face ?? "Leelawadee UI",
    align: opts.align ?? "left",
    valign: opts.valign ?? "top",
    fill: opts.fill ?? "#00000000",
    line: ctx.line(opts.line ?? "#00000000", opts.lineWidth ?? 0),
    insets: opts.insets ?? { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

export function panel(slide, ctx, x, y, w, h, fill = C.white, line = C.line) {
  return ctx.addShape(slide, {
    x,
    y,
    w,
    h,
    fill,
    line: ctx.line(line, 1),
  });
}

export function stat(slide, ctx, value, labelText, x, y, w, accent = C.green) {
  ctx.addShape(slide, { x, y, w, h: 114, fill: C.white, line: ctx.line(C.line, 1) });
  ctx.addShape(slide, { x, y, w: 8, h: 114, fill: accent, line: ctx.line("#00000000", 0) });
  label(slide, ctx, value, x + 22, y + 14, w - 34, 42, { size: 34, bold: true, color: C.ink, face: "Aptos Display" });
  label(slide, ctx, labelText, x + 24, y + 62, w - 36, 30, { size: 13, color: C.muted });
}

export function pill(slide, ctx, text, x, y, w, fill, color = C.ink) {
  ctx.addShape(slide, { x, y, w, h: 34, fill, line: ctx.line("#00000000", 0) });
  label(slide, ctx, text, x + 14, y + 7, w - 28, 20, { size: 13, bold: true, color, align: "center" });
}

export function arrow(slide, ctx, x1, y1, x2, color = C.line) {
  ctx.addShape(slide, { x: x1, y: y1, w: x2 - x1 - 12, h: 2, fill: color, line: ctx.line("#00000000", 0) });
  ctx.addShape(slide, { x: x2 - 14, y: y1 - 5, w: 12, h: 12, fill: color, line: ctx.line("#00000000", 0), rotation: 45 });
}

export function row(slide, ctx, y, cells, widths, x = 58, h = 40) {
  let left = x;
  cells.forEach((cell, i) => {
    const fill = i === 0 ? "#EFE7DB" : C.white;
    ctx.addShape(slide, { x: left, y, w: widths[i], h, fill, line: ctx.line(C.line, 1) });
    label(slide, ctx, cell, left + 10, y + 10, widths[i] - 20, h - 12, { size: 12.5, color: i === 0 ? C.ink : C.muted, bold: i === 0 });
    left += widths[i];
  });
}
