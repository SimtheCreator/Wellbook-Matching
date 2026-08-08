import { C, bg, footer, kicker, panel, label } from "./_theme.mjs";

export async function slide12(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.dark);
  kicker(slide, ctx, "Decisions Needed", 58, 48, C.mint);
  label(slide, ctx, "สิ่งที่ต้องขอ agreement\nในประชุมนี้", 58, 90, 720, 92, {
    size: 38,
    bold: true,
    color: C.paper,
    face: "Leelawadee UI",
  });
  const asks = [
    ["1", "Role split v1", "ยอมรับหรือแก้ role ของ Alice, P'Tao, Sim และ BD"],
    ["2", "One tracker", "เลือก Google Sheet / Notion และตั้ง Sim เป็น DRI"],
    ["3", "Weekly rhythm", "ทุกคนส่ง top 3 priorities และเข้าประชุม review 30 นาที"],
    ["4", "BD pipeline", "ให้ BD pipeline เป็น source of market evidence"],
  ];
  asks.forEach(([n, head, body], i) => {
    const y = 190 + i * 104;
    panel(slide, ctx, 118, y, 1040, 72, "#162822", "#3D5C51");
    ctx.addShape(slide, { x: 142, y: y + 18, w: 36, h: 36, fill: i % 2 === 0 ? C.mint : C.coral, line: ctx.line("#00000000", 0) });
    label(slide, ctx, n, 142, y + 24, 36, 20, { size: 16, bold: true, color: C.dark, align: "center", face: "Aptos Display" });
    label(slide, ctx, head, 210, y + 14, 260, 28, { size: 22, bold: true, color: C.paper });
    label(slide, ctx, body, 508, y + 19, 560, 24, { size: 16, color: "#C9D8D0" });
  });
  label(slide, ctx, "End state: every priority has a DRI, metric, deadline and next action.", 118, 628, 900, 28, { size: 22, bold: true, color: C.mint });
  footer(slide, ctx, 12);
  return slide;
}
