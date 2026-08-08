import { C, bg, footer, kicker, title, panel, label, arrow } from "./_theme.mjs";

export async function slide07(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "CEO Delegation System");
  title(slide, ctx, "งานจาก CEO ต้องออกมาเป็น Delegation Card ไม่ใช่คำสั่งลอย ๆ", "ทุกงานต้องมี outcome, DRI, metric, deadline และ review date");
  const steps = [
    ["CEO Priority", "สิ่งที่สำคัญจริง"],
    ["Outcome", "ผลลัพธ์ที่ต้องมี"],
    ["DRI", "เจ้าของคนเดียว"],
    ["Metric", "วัดจากอะไร"],
    ["Tracker", "เห็นงานที่เดียว"],
  ];
  steps.forEach(([head, body], i) => {
    const x = 68 + i * 234;
    panel(slide, ctx, x, 260, 176, 112, C.white, C.line);
    label(slide, ctx, head, x + 16, 282, 140, 26, { size: 17, bold: true, color: C.green });
    label(slide, ctx, body, x + 16, 322, 135, 34, { size: 13.5, color: C.muted });
    if (i < 4) arrow(slide, ctx, x + 186, 316, x + 228, C.coral);
  });
  panel(slide, ctx, 164, 450, 952, 128, "#FFF9F1", C.gold);
  label(slide, ctx, "Delegation Card", 194, 472, 200, 26, { size: 21, bold: true, color: C.gold });
  label(slide, ctx, "Outcome: 10 qualified partner conversations this month · DRI: BD · Metric: 10 conversations + 3 pilots · Deadline: month-end · Review: weekly", 194, 512, 850, 48, { size: 16, color: C.ink });
  label(slide, ctx, "Principle: ถ้างานไม่มี owner, metric, deadline งานนั้นยังไม่ใช่งานจริง", 182, 612, 900, 26, { size: 20, bold: true, color: C.coral });
  footer(slide, ctx, 7);
  return slide;
}
