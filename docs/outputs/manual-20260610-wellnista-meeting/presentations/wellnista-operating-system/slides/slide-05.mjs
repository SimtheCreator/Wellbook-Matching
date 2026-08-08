import { C, bg, footer, kicker, title, row, label } from "./_theme.mjs";

export async function slide05(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "RACI Prototype");
  title(slide, ctx, "ทุก workstream ต้องมี Accountable owner คนเดียว", "RACI ใช้ลดงานตกหล่นและลดการตัดสินใจซ้ำ");
  const x = 56;
  const widths = [326, 112, 112, 112, 112, 296];
  row(slide, ctx, 228, ["Workstream", "Alice", "P'Tao", "Sim", "BD", "Decision rule"], widths, x, 42);
  const rows = [
    ["Company priorities", "A", "C", "C", "C", "Alice decides final tradeoff"],
    ["Tech build + WellBook", "C", "A", "I", "C", "P'Tao owns how/when"],
    ["Event revenue", "A", "I", "R", "R", "Alice owns revenue; Sim runs ops"],
    ["Event -> app conversion", "C", "C", "A", "R", "Sim tracks; BD learns from partners"],
    ["Partner pipeline", "C", "I", "C", "A", "BD owns pipeline evidence"],
    ["Tracker + weekly review", "I", "C", "A", "R", "Sim is tracker DRI"],
  ];
  rows.forEach((r, i) => row(slide, ctx, 270 + i * 46, r, widths, x, 46));
  label(slide, ctx, "A = Accountable · R = Responsible · C = Consulted · I = Informed", 60, 586, 900, 24, { size: 15, color: C.muted });
  label(slide, ctx, "Rule: one A per row. If there are two A's, the system is still unclear.", 60, 618, 920, 30, { size: 19, bold: true, color: C.green });
  footer(slide, ctx, 5);
  return slide;
}

