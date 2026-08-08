import { C, bg, footer, kicker, title, stat, label } from "./_theme.mjs";

export async function slide02(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "Current Situation");
  title(slide, ctx, "Wellnista ไม่ได้ขาด vision; ขาด operating system ที่ทำให้ vision เดิน", "สถานการณ์ตอนนี้คือ scope ใหญ่กว่าทีม และ ownership ยังไม่ชัดพอ");
  stat(slide, ctx, "2", "business units: Tech + Event", 70, 254, 260, C.green);
  stat(slide, ctx, "3", "core people carrying many workstreams", 370, 254, 260, C.coral);
  stat(slide, ctx, "1", "main bottleneck risk: Alice overload", 670, 254, 260, C.gold);
  stat(slide, ctx, "0", "single source of truth fully agreed yet", 970, 254, 230, C.blue);
  label(slide, ctx, "What this means", 76, 426, 260, 28, { size: 20, bold: true, color: C.green });
  label(slide, ctx, "ถ้าไม่มีระบบ งานจะกระจายในแชต, decision จะวนซ้ำ, Alice จะกลายเป็นคอขวด, และ BD จะไม่รู้ว่าควร pursue lead แบบไหนก่อน", 76, 466, 1040, 70, { size: 22, color: C.ink });
  label(slide, ctx, "Meeting goal: agree role ownership, scorecard, delegation rules and one tracker.", 76, 572, 1040, 34, { size: 18, bold: true, color: C.coral });
  footer(slide, ctx, 2);
  return slide;
}

