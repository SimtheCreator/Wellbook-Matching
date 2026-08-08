import { C, bg, footer, kicker, title, panel, label, arrow } from "./_theme.mjs";

export async function slide09(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "BD Feasibility Machine");
  title(slide, ctx, "BD ไม่ใช่แค่ sales; BD คือเครื่องผลิต market evidence", "ทุก lead ต้องถูก verify, score, pitch, discover, pilot และส่ง insight กลับเข้าบริษัท");
  const steps = ["Lead", "Verify", "Score", "Pitch", "Discover", "Pilot", "Learn"];
  steps.forEach((s, i) => {
    const x = 72 + i * 160;
    panel(slide, ctx, x, 292, 118, 82, i === 0 ? C.dark : C.white, i === 0 ? "#00000000" : C.line);
    label(slide, ctx, s, x + 14, 318, 90, 24, { size: 18, bold: true, color: i === 0 ? C.paper : C.ink, align: "center" });
    if (i < steps.length - 1) arrow(slide, ctx, x + 126, 332, x + 154, C.coral);
  });
  const metrics = [
    ["Verified leads", "10 / week"],
    ["Outreach sent", "10 / week"],
    ["Discovery calls", "2 / week"],
    ["Pilot proposals", "1 / week"],
  ];
  metrics.forEach(([m, v], i) => {
    const x = 142 + i * 250;
    panel(slide, ctx, x, 470, 198, 94, "#FFF9F1", C.gold);
    label(slide, ctx, v, x + 18, 486, 150, 30, { size: 25, bold: true, color: C.gold, face: "Aptos Display" });
    label(slide, ctx, m, x + 18, 526, 150, 22, { size: 13.5, color: C.muted });
  });
  label(slide, ctx, "Output to team: real pain, objections, commitment signals, and which product/event bet deserves attention.", 92, 610, 1020, 28, { size: 19, bold: true, color: C.green });
  footer(slide, ctx, 9);
  return slide;
}
