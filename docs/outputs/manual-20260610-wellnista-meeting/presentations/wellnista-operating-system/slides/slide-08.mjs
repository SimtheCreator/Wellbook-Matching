import { C, bg, footer, kicker, title, panel, label } from "./_theme.mjs";

export async function slide08(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "Tracking System");
  title(slide, ctx, "ใช้ tracker เดียวก่อน อย่าเพิ่งเริ่มด้วยระบบใหญ่", "Google Sheet หรือ Notion พอ ถ้าทีมยังไม่ใช้ระบบง่าย ระบบแพงก็ไม่ช่วย");
  const tabs = [
    ["Company OKRs", C.green],
    ["Weekly Priorities", C.gold],
    ["Task Board", C.coral],
    ["BD Pipeline", C.blue],
    ["Event Metrics", C.green],
    ["Decision Log", C.gold],
    ["Risks / Gaps", C.coral],
  ];
  tabs.forEach(([t, color], i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 88 + col * 282;
    const y = 250 + row * 112;
    panel(slide, ctx, x, y, 238, 74, C.white, C.line);
    ctx.addShape(slide, { x, y, w: 8, h: 74, fill: color, line: ctx.line("#00000000", 0) });
    label(slide, ctx, t, x + 24, y + 24, 190, 24, { size: 18, bold: true, color: C.ink });
  });
  panel(slide, ctx, 110, 508, 1060, 80, C.dark, "#00000000");
  label(slide, ctx, "Tracker DRI: Sim. BD owns BD Pipeline input. Everyone updates top 3 priorities before weekly review.", 138, 536, 1000, 28, { size: 20, bold: true, color: C.paper });
  footer(slide, ctx, 8);
  return slide;
}

