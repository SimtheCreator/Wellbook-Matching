import { C, bg, footer, kicker, title, label, panel } from "./_theme.mjs";

export async function slide06(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "OKR / KPI System");
  title(slide, ctx, "KPI ต้องตอบ vision ไม่ใช่แค่วัด activity", "ใช้ระบบ 3 ชั้น: Company OKR -> Owner KPI -> Weekly priorities");
  const levels = [
    [166, 270, 948, 72, C.dark, "Vision", "Every woman can pursue ambition without sacrificing health, peace, or people she loves."],
    [226, 366, 828, 72, C.green, "3 Company Objectives", "Tech usage · Event/partnership revenue · Operating foundation"],
    [286, 462, 708, 72, C.gold, "Owner KPIs", "P'Tao ships · Alice grows revenue/brand · Sim runs ops · BD creates market evidence"],
    [346, 558, 588, 76, C.coral, "Weekly Top 3", "Each person commits only three priorities per week"],
  ];
  levels.forEach(([x, y, w, h, color, head, body]) => {
    panel(slide, ctx, x, y, w, h, color, "#00000000");
    label(slide, ctx, head, x + 26, y + 12, 230, 28, { size: 21, bold: true, color: C.white });
    label(slide, ctx, body, x + 284, y + 16, w - 310, 38, { size: 15, color: "#F6F1EA" });
  });
  label(slide, ctx, "Bad KPI: ทำ marketing เยอะขึ้น  |  Good KPI: 10 verified leads, 2 discovery calls, 1 pilot proposal", 80, 232, 1040, 26, { size: 16, color: C.muted });
  footer(slide, ctx, 6);
  return slide;
}
