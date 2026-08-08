import { C, bg, kicker, label, pill } from "./_theme.mjs";

export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.dark);
  ctx.addShape(slide, { x: 0, y: 0, w: 1280, h: 720, fill: C.dark, line: ctx.line("#00000000", 0) });
  ctx.addShape(slide, { x: 768, y: 0, w: 512, h: 720, fill: "#18352D", line: ctx.line("#00000000", 0) });
  kicker(slide, ctx, "Business Development Meeting", 58, 56, C.mint);
  label(slide, ctx, "Wellnista\nOperating System", 58, 132, 620, 154, {
    size: 54,
    bold: true,
    color: C.paper,
    face: "Leelawadee UI",
  });
  label(slide, ctx, "เปลี่ยน vision ให้กลายเป็น role, KPI, delegation, tracking และ action ที่ทำจริงทุกสัปดาห์", 62, 318, 610, 66, {
    size: 22,
    color: "#DDE9E1",
  });
  pill(slide, ctx, "Tech", 830, 160, 170, C.mint, C.dark);
  pill(slide, ctx, "Event", 1036, 160, 170, C.coral, C.dark);
  label(slide, ctx, "2 business units", 822, 230, 390, 38, { size: 29, bold: true, color: C.paper, face: "Aptos Display" });
  label(slide, ctx, "3 core people", 822, 296, 390, 38, { size: 29, bold: true, color: C.paper, face: "Aptos Display" });
  label(slide, ctx, "1 operating system", 822, 362, 390, 38, { size: 29, bold: true, color: C.paper, face: "Aptos Display" });
  ctx.addShape(slide, { x: 822, y: 434, w: 336, h: 1, fill: "#5A796E", line: ctx.line("#00000000", 0) });
  label(slide, ctx, "Prototype deck for role clarity, OKR/KPI, CEO delegation and tracking.", 822, 468, 330, 64, {
    size: 16,
    color: "#C5D5CD",
    face: "Aptos",
  });
  return slide;
}

