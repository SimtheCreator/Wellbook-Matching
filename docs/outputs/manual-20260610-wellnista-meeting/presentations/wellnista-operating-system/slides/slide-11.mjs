import { C, bg, footer, kicker, title, panel, label } from "./_theme.mjs";

export async function slide11(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "First 7 Days");
  title(slide, ctx, "หลังประชุม ต้องมี action 7 วันแรกทันที", "ระบบจะจริงก็ต่อเมื่อใช้ในสัปดาห์แรก");
  const days = [
    ["1", "Role canvas"],
    ["2", "RACI top 10"],
    ["3", "3 OKRs"],
    ["4", "Tracker v1"],
    ["5", "BD 20 leads"],
    ["6", "First tasks"],
    ["7", "Weekly review"],
  ];
  days.forEach(([d, text], i) => {
    const x = 78 + i * 160;
    panel(slide, ctx, x, 282, 118, 170, C.white, C.line);
    ctx.addShape(slide, { x: x + 34, y: 246, w: 50, h: 50, fill: i < 3 ? C.green : i < 5 ? C.gold : C.coral, line: ctx.line("#00000000", 0) });
    label(slide, ctx, d, x + 34, 256, 50, 28, { size: 22, bold: true, color: C.white, align: "center", face: "Aptos Display" });
    label(slide, ctx, text, x + 14, 328, 90, 54, { size: 18, bold: true, color: C.ink, align: "center" });
    label(slide, ctx, i === 0 ? "start here" : "ship output", x + 16, 408, 86, 22, { size: 11, color: C.muted, align: "center", face: "Aptos" });
  });
  label(slide, ctx, "Success definition: next weekly review has real metrics, real blockers, and named owners.", 92, 548, 980, 54, { size: 22, bold: true, color: C.green });
  footer(slide, ctx, 11);
  return slide;
}
