import { C, bg, footer, kicker, title, panel, label, arrow } from "./_theme.mjs";

export async function slide03(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "Problem Map");
  title(slide, ctx, "ปัญหาไม่ใช่ไอเดียน้อย แต่คือไอเดียยังไม่ผ่านเครื่องแปลงเป็น action", "ต้องมีระบบกลางที่ถามให้คิด, ปิดจุดอ่อน, และทำให้ทุกงานมี owner");
  const y = 262;
  const boxes = [
    ["Vision", "ภาพใหญ่ชัด แต่ยังไม่ถูกแตกเป็นตัวเลขและงานรายสัปดาห์", C.green],
    ["Ideas", "มีหลายไอเดีย แต่ยังไม่มี feasibility machine คัดก่อนลงมือ", C.gold],
    ["Owners", "หลายงานช่วยกันทำ แต่ accountable owner ยังไม่คม", C.coral],
    ["Tracker", "งาน/decision/metric ยังไม่เป็น source of truth เดียว", C.blue],
  ];
  boxes.forEach(([head, body, color], i) => {
    const x = 64 + i * 300;
    panel(slide, ctx, x, y, 240, 178, C.white, C.line);
    ctx.addShape(slide, { x, y, w: 240, h: 8, fill: color, line: ctx.line("#00000000", 0) });
    label(slide, ctx, head, x + 20, y + 30, 190, 34, { size: 24, bold: true, color });
    label(slide, ctx, body, x + 20, y + 76, 198, 78, { size: 15, color: C.muted });
    if (i < 3) arrow(slide, ctx, x + 248, y + 88, x + 294, C.line);
  });
  label(slide, ctx, "Prototype answer", 78, 514, 220, 24, { size: 18, bold: true, color: C.green });
  label(slide, ctx, "Role/RACI + OKR/KPI + Delegation Card + Task Tracker + BD Feasibility Machine", 78, 546, 940, 64, { size: 24, bold: true, color: C.ink });
  footer(slide, ctx, 3);
  return slide;
}
