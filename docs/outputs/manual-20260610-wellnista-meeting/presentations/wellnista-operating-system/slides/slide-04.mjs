import { C, bg, footer, kicker, title, panel, label } from "./_theme.mjs";

export async function slide04(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "Role Architecture");
  title(slide, ctx, "แบ่ง role แบบกว้างก่อน แล้วค่อยลงลึกเป็น decision rights", "ไม่ใช่ตำแหน่งเพื่อ ego แต่คือ ownership เพื่อให้บริษัทเดิน");
  const lanes = [
    ["Alice", "CEO + GM Events", "Vision, brand, key relationships, event revenue, final tie-breaks", C.green],
    ["P'Tao", "CTO, Tech", "Tech build, WellBook, AI/product reliability, PDPA/security", C.blue],
    ["Sim", "COO, Backbone", "Operations, tracker, growth distribution, event logistics, analytics", C.gold],
    ["BD", "Market Evidence", "Lead pipeline, discovery, outreach, pilot design, partner commitments", C.coral],
  ];
  lanes.forEach(([name, role, body, color], i) => {
    const x = 62 + i * 300;
    panel(slide, ctx, x, 248, 250, 260, C.white, C.line);
    ctx.addShape(slide, { x: x + 22, y: 228, w: 58, h: 58, fill: color, line: ctx.line("#00000000", 0) });
    label(slide, ctx, name, x + 96, 236, 120, 30, { size: 24, bold: true, color: C.ink });
    label(slide, ctx, role, x + 96, 268, 128, 24, { size: 13, bold: true, color });
    label(slide, ctx, "Owns", x + 22, 326, 70, 22, { size: 13, bold: true, color: C.muted });
    label(slide, ctx, body, x + 22, 358, 204, 82, { size: 15, color: C.ink });
    label(slide, ctx, "Weekly proof: 2-4 metrics only", x + 22, 456, 198, 24, { size: 12.5, color: C.muted });
  });
  label(slide, ctx, "Meeting decision: accept this as v1, edit it, or name the gaps.", 74, 562, 900, 34, { size: 21, bold: true, color: C.coral });
  footer(slide, ctx, 4);
  return slide;
}

