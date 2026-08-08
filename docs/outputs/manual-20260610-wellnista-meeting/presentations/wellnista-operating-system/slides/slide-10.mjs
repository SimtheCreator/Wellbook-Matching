import { C, bg, footer, kicker, title, panel, label } from "./_theme.mjs";

export async function slide10(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "Meeting Prototype");
  title(slide, ctx, "ประชุม 2 ชั่วโมงต้องจบด้วย decision ไม่ใช่แค่ discussion", "ใช้ agenda นี้เพื่อ lock ระบบ v1");
  const agenda = [
    ["0-10", "Current situation", "เห็นตรงกันว่าปัญหาคือ ownership + execution system"],
    ["10-35", "Role split", "เติม role canvas และ gap list"],
    ["35-60", "OKR / KPI", "ตกลง 3 company objectives และ owner metrics"],
    ["60-80", "Delegation", "ตกลง delegation card และ decision rights"],
    ["80-105", "Tracker", "เลือก tool, tabs, DRI และ weekly rhythm"],
    ["105-120", "Commit", "first 7-day action list"],
  ];
  agenda.forEach(([time, head, body], i) => {
    const y = 220 + i * 64;
    ctx.addShape(slide, { x: 76, y: y + 16, w: 14, h: 14, fill: i < 3 ? C.green : C.coral, line: ctx.line("#00000000", 0) });
    if (i < agenda.length - 1) ctx.addShape(slide, { x: 82, y: y + 32, w: 2, h: 48, fill: C.line, line: ctx.line("#00000000", 0) });
    label(slide, ctx, time, 112, y + 7, 80, 24, { size: 15, bold: true, color: C.muted, face: "Aptos" });
    label(slide, ctx, head, 210, y + 4, 210, 28, { size: 19, bold: true, color: C.ink });
    panel(slide, ctx, 448, y, 690, 42, C.white, C.line);
    label(slide, ctx, body, 466, y + 10, 650, 22, { size: 14.5, color: C.muted });
  });
  footer(slide, ctx, 10);
  return slide;
}

