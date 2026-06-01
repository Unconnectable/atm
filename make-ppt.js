const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "软件工程课程项目";
pres.title = "ATM柜员机模拟程序";

// ─── Color Palette ───
const C = {
  darkBg: "0A0A0C",
  navy: "1A1F36",
  gold: "D4A574",
  goldLight: "E8CFA6",
  emerald: "10B981",
  red: "EF4444",
  cream: "F5F0EB",
  white: "FFFFFF",
  text: "2D2D2D",
  textDim: "6B7280",
  cardBg: "FFFFFF",
  lightBorder: "E5E7EB",
  blue: "1A73E8",
};

// ─── Helpers ───
const mkShadow = () => ({ type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.08 });

function addTitle(slide, text, opts = {}) {
  const y = opts.y || 0.4;
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: y + 0.05, w: 0.07, h: 0.55, fill: { color: C.gold } });
  slide.addText(text, {
    x: 0.9, y, w: 8.5, h: 0.65, fontSize: 28, fontFace: "Georgia",
    color: C.navy, bold: true, margin: 0,
  });
}

function addCard(slide, x, y, w, h, accentColor) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: C.cardBg }, shadow: mkShadow(),
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.06, h, fill: { color: accentColor || C.gold },
  });
}

function addBottomBar(slide, text) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.0, w: 10, h: 0.6, fill: { color: C.navy },
  });
  slide.addText(text, {
    x: 0.5, y: 5.05, w: 9, h: 0.5, fontSize: 12, fontFace: "Calibri",
    color: C.cream, align: "center", margin: 0,
  });
}

// ══════════════════════════════════
// S1 – Title
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.darkBg };
  s.addShape(pres.shapes.OVAL, { x: 7.5, y: -1.5, w: 4, h: 4, fill: { color: C.gold, transparency: 92 } });
  s.addShape(pres.shapes.OVAL, { x: 8.5, y: 3, w: 3, h: 3, fill: { color: C.gold, transparency: 90 } });
  s.addText("✦", { x: 0.8, y: 1.0, w: 0.6, h: 0.6, fontSize: 24, color: C.gold, align: "center", margin: 0 });
  s.addText("ATM 柜员机模拟程序", { x: 0.8, y: 1.7, w: 8.4, h: 1.0, fontSize: 40, fontFace: "Georgia", color: C.gold, bold: true, margin: 0 });
  s.addText("软件工程 · 期末项目", { x: 0.8, y: 2.8, w: 8.4, h: 0.5, fontSize: 18, fontFace: "Calibri", color: C.cream, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 3.5, w: 2.0, h: 0.03, fill: { color: C.gold } });
  s.addText("基于 Python 3 + Tkinter 与 Web 前端双重实现", { x: 0.8, y: 3.8, w: 8.4, h: 0.4, fontSize: 13, fontFace: "Calibri", color: C.textDim, margin: 0 });
  s.addText("MVC 设计模式  ·  图形用户界面  ·  本地数据持久化", { x: 0.8, y: 4.2, w: 8.4, h: 0.4, fontSize: 12, fontFace: "Calibri", color: C.textDim, margin: 0 });
}

// ══════════════════════════════════
// S2 – 目录
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTitle(s, "CONTENTS", { y: 0.3 });
  const items = [
    ["01","项目背景与概述"],["02","MVC 三层架构"],
    ["03","模型层 Model 详解"],["04","视图层 View 详解"],
    ["05","控制层 Controller 详解"],["06","业务规则与约束"],
    ["07","数据持久化方案"],["08","Web 版前端改造"],
    ["09","代码实现与解析"],["10","测试策略与结果"],
    ["11","运行指南"],["12","项目文件结构与分工"],
  ];
  items.forEach((item, i) => {
    const y = 1.15 + i * 0.33;
    s.addText(item[0], { x: 1.0, y, w: 0.6, h: 0.3, fontSize: 14, fontFace: "Georgia", color: C.gold, bold: true, margin: 0 });
    s.addText(item[1], { x: 1.7, y, w: 7, h: 0.3, fontSize: 13, fontFace: "Calibri", color: C.text, margin: 0 });
    if (i < items.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, { x: 1.0, y: y + 0.3, w: 8, h: 0.006, fill: { color: C.lightBorder } });
    }
  });
}

// ══════════════════════════════════
// S3 – 项目背景
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "项目背景");
  s.addText("ATM（Automatic Teller Machine，自动柜员机）是银行业务中最重要的自助服务终端之一。随着金融科技的快速发展，ATM 系统的软件架构设计对可维护性、可扩展性和稳定性提出了更高要求。", {
    x: 0.9, y: 1.3, w: 8.2, h: 0.8, fontSize: 13, fontFace: "Calibri", color: C.text, lineSpacingMultiple: 1.6, margin: 0,
  });
  s.addText("课程背景", { x: 0.9, y: 2.3, w: 4, h: 0.35, fontSize: 16, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  const bgItems = [
    "《软件工程》课程期末项目 — 湘潭大学 计算机·网络空间安全学院",
    "选题编号 23：ATM 柜员机模拟程序（课程指定选题）",
    "要求使用图形用户界面，编程语言不限",
    "要求采用软件工程方法进行需求分析、设计、实现和测试",
    "核心目标：将 MVC 设计模式理论应用于实际开发",
  ];
  bgItems.forEach((item, i) => {
    s.addText(item, { x: 0.9, y: 2.75 + i * 0.38, w: 8.2, h: 0.35, fontSize: 12, fontFace: "Calibri", color: C.text, margin: 0, bullet: true, paraSpaceAfter: 2 });
  });
  addBottomBar(s, "初始账号 123456  ·  初始密码 123456  ·  初始余额 ¥10,000");
}

// ══════════════════════════════════
// S4 – 项目概述
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTitle(s, "项目概述");
  s.addText("本项目采用 Python 3 标准库开发 ATM 柜员机模拟系统，严格遵循 MVC 设计模式。在完成 Tkinter 桌面版后，又使用 HTML/CSS/JavaScript 改造为 Web 版，实现同一业务逻辑在两种前端下的运行。", {
    x: 0.9, y: 1.2, w: 8.2, h: 0.8, fontSize: 13, fontFace: "Calibri", color: C.text, lineSpacingMultiple: 1.5, margin: 0,
  });
  const cards = [
    ["Python 3", "纯标准库开发", "零第三方依赖"],
    ["MVC 模式", "Model/View/Controller", "三层解耦架构"],
    ["双端实现", "Tkinter 桌面 + Web", "同一业务逻辑"],
  ];
  cards.forEach((c, i) => {
    const x = 0.6 + i * 3.15;
    addCard(s, x, 2.3, 2.9, 2.1, C.gold);
    s.addText(c[0], { x: x + 0.25, y: 2.5, w: 2.4, h: 0.4, fontSize: 16, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
    s.addText(c[1], { x: x + 0.25, y: 2.95, w: 2.4, h: 0.4, fontSize: 12, fontFace: "Calibri", color: C.text, margin: 0 });
    s.addText(c[2], { x: x + 0.25, y: 3.4, w: 2.4, h: 0.35, fontSize: 11, fontFace: "Calibri", color: C.textDim, margin: 0 });
  });
  addBottomBar(s, "初始账号 123456  ·  初始密码 123456  ·  初始余额 ¥10,000");
}

// ══════════════════════════════════
// S5 – 项目特点与技术栈
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "项目特点与技术栈");

  s.addText("核心特点", { x: 0.9, y: 1.2, w: 4, h: 0.35, fontSize: 16, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  const features = [
    "严格 MVC 分层：Model / View / Controller 职责完全分离",
    "双前端实现：Tkinter 桌面版 + Web 版共存",
    "零第三方依赖：桌面版完全基于 Python 3 标准库",
    "Web 版零框架：纯原生 HTML / CSS / JavaScript",
    "数据持久化：JSON 文件 / localStorage 双方案",
    "完整业务规则：取款/存款/修改密码全部校验",
  ];
  features.forEach((item, i) => {
    s.addText(item, { x: 0.9, y: 1.65 + i * 0.38, w: 5.5, h: 0.35, fontSize: 12, fontFace: "Calibri", color: C.text, margin: 0, bullet: true, paraSpaceAfter: 2 });
  });

  s.addText("技术栈", { x: 6.8, y: 1.2, w: 3, h: 0.35, fontSize: 16, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  const stack = [
    ["Python 3.10+", "核心开发语言"],
    ["Tkinter", "桌面 GUI 框架"],
    ["json (stdlib)", "本地数据持久化"],
    ["HTML5 + CSS3", "Web 前端结构"],
    ["JavaScript ES6+", "Web 交互逻辑"],
    ["Canvas 2D", "背景动画渲染"],
  ];
  stack.forEach((item, i) => {
    const y = 1.65 + i * 0.42;
    s.addText(item[0], { x: 6.8, y, w: 1.6, h: 0.35, fontSize: 11, fontFace: "Consolas", color: C.navy, margin: 0 });
    s.addText(item[1], { x: 8.4, y, w: 1.4, h: 0.35, fontSize: 11, fontFace: "Calibri", color: C.textDim, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 6.8, y: y + 0.37, w: 3, h: 0.005, fill: { color: C.lightBorder } });
  });
}

// ══════════════════════════════════
// S6 – MVC 架构概览
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTitle(s, "MVC 三层架构");
  const layers = [
    { title: "Model", sub: "模型层", file: "models.py", color: C.blue, desc: ["管理核心数据与业务规则","封装 data.json 读写逻辑","所有业务判断在此完成"] },
    { title: "View", sub: "视图层", file: "views.py / index.html", color: C.emerald, desc: ["负责 GUI 布局与呈现","将用户输入传递给 Controller","不含任何业务逻辑判断"] },
    { title: "Controller", sub: "控制层", file: "controllers.py / JS", color: C.gold, desc: ["作为 Model 和 View 的桥梁","接收输入 → 调用 Model → 更新 View","逻辑调度与中转枢纽"] },
  ];
  layers.forEach((l, i) => {
    const x = 0.5 + i * 3.15;
    addCard(s, x, 1.2, 2.9, 3.8, l.color);
    s.addText(String(i + 1), { x: x + 0.2, y: 1.35, w: 0.4, h: 0.35, fontSize: 18, fontFace: "Georgia", color: l.color, bold: true, margin: 0 });
    s.addText(l.title, { x: x + 0.6, y: 1.35, w: 1.8, h: 0.35, fontSize: 18, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
    s.addText(l.sub, { x: x + 0.2, y: 1.75, w: 2.5, h: 0.3, fontSize: 12, fontFace: "Calibri", color: C.textDim, italic: true, margin: 0 });
    s.addText(l.file, { x: x + 0.2, y: 2.0, w: 2.5, h: 0.25, fontSize: 9, fontFace: "Consolas", color: l.color, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.2, y: 2.4, w: 2.5, h: 0.008, fill: { color: C.lightBorder } });
    l.desc.forEach((d, j) => {
      s.addText(d, { x: x + 0.2, y: 2.6 + j * 0.45, w: 2.5, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.text, margin: 0, bullet: true, paraSpaceAfter: 2 });
    });
  });
  for (let i = 0; i < 2; i++) {
    s.addText("→", { x: 3.4 + i * 3.15, y: 2.6, w: 0.3, h: 0.4, fontSize: 22, color: C.textDim, align: "center", valign: "middle", margin: 0 });
  }
}

// ══════════════════════════════════
// S7 – 模型层 Model
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "模型层 Model — 数据与业务逻辑");
  s.addText("核心职责", { x: 0.9, y: 1.2, w: 4, h: 0.35, fontSize: 16, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  const items = [
    "用户数据加载与持久化（JSON 文件读写）",
    "登录验证：账号和密码匹配校验",
    "余额查询：返回当前账户余额",
    "存款业务：不可为负数的校验与更新",
    "取款业务：100 倍数 / 上限 5000 / 不透支",
    "修改密码：旧密码验证 / 长度 / 相同字符检测",
  ];
  items.forEach((item, i) => {
    s.addText(item, { x: 0.9, y: 1.7 + i * 0.4, w: 5.5, h: 0.35, fontSize: 12, fontFace: "Calibri", color: C.text, margin: 0, bullet: true, paraSpaceAfter: 2 });
  });
  addCard(s, 6.5, 1.2, 3.2, 3.8, C.blue);
  s.addText("models.py — 取款业务", { x: 6.8, y: 1.35, w: 2.7, h: 0.3, fontSize: 10, fontFace: "Consolas", color: C.blue, bold: true, margin: 0 });
  const code = [
    "def withdraw(self, amount):",
    "    if amount <= 0:",
    "        return False, '无效'",
    "    if amount % 100 != 0:",
    "        return False, '需100倍数'",
    "    if amount > 5000:",
    "        return False, '超上限'",
    "    if amount > balance:",
    "        return False, '余额不足'",
    "    self.user_data['balance'] -= amount",
    "    self._save_to_disk()",
    "    return True, '取款成功'",
  ];
  s.addText(code.map((line, i) => ({
    text: line,
    options: { fontSize: 8.5, fontFace: "Consolas", color: line.startsWith("  def") ? C.gold : C.text, breakLine: true }
  })), { x: 6.8, y: 1.8, w: 2.7, h: 3.0, margin: 0.1, valign: "top", lineSpacingMultiple: 1.15, fill: { color: "F8F9FA" } });
  addBottomBar(s, "所有 6 项业务规则均在 Model 层实现 — View 层不包含任何逻辑判断");
}

// ══════════════════════════════════
// S8 – 视图层 View: Tkinter
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTitle(s, "视图层 View — Tkinter 桌面版");
  addCard(s, 0.6, 1.2, 8.8, 1.0, C.emerald);
  s.addText("ATMView — 主窗口 (tk.Tk)   |   尺寸 450×400   |   switch_frame() 统一切换", {
    x: 0.85, y: 1.3, w: 8.3, h: 0.8, fontSize: 12, fontFace: "Calibri", color: C.text, margin: 0, valign: "middle",
  });

  const frames = [
    ["LoginFrame", "登录界面", "账号输入 + 密码输入 + 登录按钮", C.blue],
    ["MenuFrame", "主菜单", "5 个功能按钮纵向排列", C.gold],
    ["BalanceFrame", "余额查询", "大字体余额 + 返回按钮", C.emerald],
    ["ActionFrame", "存/取款", "金额输入框 + 提交/返回", C.navy],
    ["ChangePwdFrame", "修改密码", "三个密码输入框 + 确认/返回", C.red],
  ];
  frames.forEach((f, i) => {
    const y = 2.5 + i * 0.55;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 8.8, h: 0.48, fill: { color: C.white }, shadow: mkShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 0.06, h: 0.48, fill: { color: f[3] } });
    s.addText(f[0], { x: 0.85, y, w: 1.5, h: 0.48, fontSize: 11, fontFace: "Consolas", color: f[3], valign: "middle", margin: 0 });
    s.addText(f[1], { x: 2.4, y, w: 1.2, h: 0.48, fontSize: 11, fontFace: "Calibri", color: C.navy, bold: true, valign: "middle", margin: 0 });
    s.addText(f[2], { x: 3.7, y, w: 5.5, h: 0.48, fontSize: 11, fontFace: "Calibri", color: C.textDim, valign: "middle", margin: 0 });
  });
  addBottomBar(s, "views.py  —  ATMView 继承 tk.Tk，每个界面封装为独立 Frame");
}

// ══════════════════════════════════
// S9 – 视图层 View: Web
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTitle(s, "视图层 View — Web 前端版");
  addCard(s, 0.6, 1.2, 8.8, 0.9, C.gold);
  s.addText("index.html  —  原生 HTML + CSS + JavaScript  |  零框架依赖  |  单文件部署", {
    x: 0.85, y: 1.35, w: 8.3, h: 0.6, fontSize: 12, fontFace: "Consolas", color: C.navy, margin: 0, valign: "middle",
  });

  const webFrames = [
    ["screen-login", "登录界面", "AETHER 品牌标识 + 毛玻璃卡片 + 默认账号填充"],
    ["screen-menu", "主菜单", "2×2 网格按钮布局 + 底部退出 + 欢迎词"],
    ["screen-balance", "余额查询", "金色衬线大字余额 ¥ 0.00 + 装饰分隔线"],
    ["screen-deposit", "存款业务", "数字输入 + 实时校验 + 成功/错误提示"],
    ["screen-withdraw", "取款业务", "Enter 快捷提交 + 100 倍数提示 + 规则说明"],
    ["screen-changepwd", "修改密码", "三段密码表单 + 全新安全中心样式"],
  ];
  webFrames.forEach((f, i) => {
    const y = 2.35 + i * 0.48;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 8.8, h: 0.42, fill: { color: C.white }, shadow: mkShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 0.06, h: 0.42, fill: { color: C.gold } });
    s.addText(f[0], { x: 0.85, y, w: 1.6, h: 0.42, fontSize: 9.5, fontFace: "Consolas", color: C.gold, valign: "middle", margin: 0 });
    s.addText(f[1], { x: 2.5, y, w: 1.0, h: 0.42, fontSize: 11, fontFace: "Calibri", color: C.navy, bold: true, valign: "middle", margin: 0 });
    s.addText(f[2], { x: 3.6, y, w: 5.6, h: 0.42, fontSize: 10.5, fontFace: "Calibri", color: C.textDim, valign: "middle", margin: 0 });
  });
}

// ══════════════════════════════════
// S10 – 控制层 Controller
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "控制层 Controller — 逻辑调度");
  const boxes = [
    { label: "用户操作", sub: "点击按钮 / 输入" },
    { label: "Controller", sub: "接收并处理请求" },
    { label: "Model", sub: "执行业务逻辑" },
    { label: "View", sub: "更新显示结果" },
  ];
  boxes.forEach((b, i) => {
    const x = 0.5 + i * 2.4;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.4, w: 2.0, h: 1.2, fill: { color: i === 1 ? C.gold : C.cardBg }, shadow: mkShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.4, w: 0.06, h: 1.2, fill: { color: i === 1 ? C.navy : C.gold } });
    s.addText(b.label, { x: x + 0.2, y: 1.5, w: 1.6, h: 0.4, fontSize: 14, fontFace: "Georgia", color: i === 1 ? C.darkBg : C.navy, bold: true, margin: 0 });
    s.addText(b.sub, { x: x + 0.2, y: 1.95, w: 1.6, h: 0.35, fontSize: 11, fontFace: "Calibri", color: i === 1 ? C.darkBg : C.textDim, margin: 0 });
    if (i < 3) {
      s.addText("→", { x: x + 2.0, y: 1.6, w: 0.4, h: 0.6, fontSize: 20, color: C.textDim, align: "center", valign: "middle", margin: 0 });
    }
  });
  s.addText("核心方法", { x: 0.9, y: 2.9, w: 8, h: 0.35, fontSize: 16, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  const methods = [
    ["login(acc, pwd)", "校验 → 成功切菜单 / 失败报错"],
    ["show_balance()", "调用 model.get → 显示余额"],
    ["handle_deposit(amt)", "校验格式 → model.deposit → 反馈"],
    ["handle_withdraw(amt)", "校验格式和规则 → model.withdraw → 反馈"],
    ["handle_change_pwd(...)", "校验旧密码/一致性/强度 → model更新"],
    ["logout()", "清空状态 → 返回登录界面"],
  ];
  methods.forEach((m, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.6 + col * 4.7;
    const y = 3.35 + row * 0.55;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.3, h: 0.45, fill: { color: C.cream } });
    s.addText(m[0], { x: x + 0.12, y, w: 1.9, h: 0.45, fontSize: 11, fontFace: "Consolas", color: C.navy, valign: "middle", margin: 0 });
    s.addText(m[1], { x: x + 2.05, y, w: 2.1, h: 0.45, fontSize: 11, fontFace: "Calibri", color: C.textDim, valign: "middle", margin: 0 });
  });
}

// ══════════════════════════════════
// S11 – 业务规则: 取款
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "业务规则 — ATM 取款");
  addCard(s, 0.6, 1.2, 8.8, 3.6, C.red);
  s.addText("💳  ATM 取款规则", { x: 0.9, y: 1.4, w: 8, h: 0.5, fontSize: 22, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  const rules = [
    ["100 的倍数", "每次取款金额必须是 100 的整数倍", "例如：100、200、1000、5000"],
    ["单次上限 ¥5,000", "单笔取款不得超过 5000 元人民币", "适应大多数 ATM 机的现金出钞限制"],
    ["不可透支", "取款金额不得超过当前账户余额", "余额不足时提示错误，防止信用风险"],
    ["金额 > 0", "取款金额必须为正数", "负数或零直接拒绝"],
  ];
  rules.forEach((r, i) => {
    const y = 2.1 + i * 0.58;
    s.addShape(pres.shapes.RECTANGLE, { x: 1.0, y, w: 8.2, h: 0.5, fill: { color: "FFF5F5" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 1.0, y, w: 0.05, h: 0.5, fill: { color: C.red } });
    s.addText(r[0], { x: 1.25, y, w: 2.2, h: 0.5, fontSize: 13, fontFace: "Calibri", color: C.red, bold: true, valign: "middle", margin: 0 });
    s.addText(r[1], { x: 3.5, y, w: 3.0, h: 0.5, fontSize: 11, fontFace: "Calibri", color: C.text, valign: "middle", margin: 0 });
    s.addText(r[2], { x: 6.6, y, w: 2.6, h: 0.5, fontSize: 10, fontFace: "Calibri", color: C.textDim, valign: "middle", margin: 0 });
  });
  addBottomBar(s, "校验在 Model 层实现：withdraw() — 4 项条件依次判断，任一不通过即拒绝");
}

// ══════════════════════════════════
// S12 – 业务规则: 存款 & 修改密码
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTitle(s, "业务规则 — 存款与修改密码");
  // 存款卡片
  addCard(s, 0.4, 1.2, 4.4, 3.5, C.emerald);
  s.addText("💰  ATM 存款", { x: 0.65, y: 1.4, w: 4, h: 0.4, fontSize: 18, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  s.addText("规则简单明了：", { x: 0.65, y: 1.9, w: 4, h: 0.3, fontSize: 12, fontFace: "Calibri", color: C.textDim, margin: 0 });
  const dRules = [
    "金额必须大于 0（不可为负数或零）",
    "无存款金额上限限制",
    "支持小数金额（精确到分）",
    "存款成功后实时更新余额",
  ];
  dRules.forEach((r, i) => {
    s.addText(r, { x: 0.65, y: 2.3 + i * 0.4, w: 3.8, h: 0.35, fontSize: 12, fontFace: "Calibri", color: C.text, margin: 0, bullet: true, paraSpaceAfter: 2 });
  });
  // 修改密码卡片
  addCard(s, 5.2, 1.2, 4.4, 3.5, C.gold);
  s.addText("🔐  修改密码", { x: 5.45, y: 1.4, w: 4, h: 0.4, fontSize: 18, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  s.addText("严格的安全策略：", { x: 5.45, y: 1.9, w: 4, h: 0.3, fontSize: 12, fontFace: "Calibri", color: C.textDim, margin: 0 });
  const pRules = [
    "旧密码必须验证通过",
    "新密码长度 ≥ 6 位",
    "不能是 6 位完全相同字符（如 111111）",
    "两次新密码输入必须完全一致",
    "修改成功后强制重新登录",
  ];
  pRules.forEach((r, i) => {
    s.addText(r, { x: 5.45, y: 2.3 + i * 0.38, w: 4, h: 0.33, fontSize: 12, fontFace: "Calibri", color: C.text, margin: 0, bullet: true, paraSpaceAfter: 2 });
  });
  addBottomBar(s, "所有校验均在 Model 层完成 — deposit() 与 change_password() 方法");
}

// ══════════════════════════════════
// S13 – 数据持久化: data.json
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "数据持久化 — data.json");
  s.addText("Python 版使用标准库 json 模块实现数据持久化，数据存储于 data.json 文件", {
    x: 0.9, y: 1.2, w: 8.2, h: 0.4, fontSize: 13, fontFace: "Calibri", color: C.text, margin: 0,
  });
  addCard(s, 0.6, 1.8, 4.2, 1.5, C.blue);
  s.addText("data.json 数据结构", { x: 0.85, y: 1.95, w: 3.8, h: 0.3, fontSize: 14, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  const jsonCode = [
    '{',
    '  "account": "123456",',
    '  "password": "123456",',
    '  "balance": 10000.0',
    '}',
  ];
  s.addText(jsonCode.map((l, i) => ({ text: l, options: { fontSize: 12, fontFace: "Consolas", color: C.text, breakLine: true } })), {
    x: 0.85, y: 2.4, w: 3.8, h: 0.8, margin: 0.1, valign: "top", fill: { color: "F8F9FA" },
  });
  addCard(s, 5.2, 1.8, 4.2, 1.5, C.blue);
  s.addText("Model 层封装", { x: 5.45, y: 1.95, w: 3.8, h: 0.3, fontSize: 14, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  const pyCode = [
    "def _load_data(self):",
    "    if not os.path.exists(f):",
    "        return self.initial_data",
    "    return json.load(f)",
    "",
    "def _save_to_disk(self, data):",
    "    json.dump(data, f, indent=4)",
  ];
  s.addText(pyCode.map((l, i) => ({ text: l, options: { fontSize: 10, fontFace: "Consolas", color: C.text, breakLine: true } })), {
    x: 5.45, y: 2.4, w: 3.8, h: 0.8, margin: 0.1, valign: "top", fill: { color: "F8F9FA" },
  });
  s.addText("工作流程", { x: 0.9, y: 3.6, w: 8, h: 0.3, fontSize: 14, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  const flow = [
    "程序启动 → _load_data() 读取 data.json → 加载到内存 user_data 字典",
    "用户操作 → Model 方法修改 user_data → _save_to_disk() 写回 JSON 文件",
    "写盘策略：每次业务操作（存款/取款/改密）后立即持久化，防止数据丢失",
  ];
  flow.forEach((item, i) => {
    s.addText(item, { x: 0.9, y: 3.95 + i * 0.33, w: 8.2, h: 0.3, fontSize: 12, fontFace: "Calibri", color: C.text, margin: 0, bullet: true, paraSpaceAfter: 2 });
  });
}

// ══════════════════════════════════
// S14 – 数据持久化: Web 版
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTitle(s, "数据持久化 — Web localStorage");
  s.addText("Web 版使用浏览器内置的 localStorage 实现数据持久化，与 Python 版保持相同的 Model 接口", {
    x: 0.9, y: 1.2, w: 8.2, h: 0.4, fontSize: 13, fontFace: "Calibri", color: C.text, margin: 0,
  });
  addCard(s, 0.6, 1.8, 4.2, 2.5, C.emerald);
  s.addText("JS Model 封装", { x: 0.85, y: 1.95, w: 3.8, h: 0.3, fontSize: 14, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  const jsCode = [
    "const STORAGE_KEY = 'aether_atm';",
    "",
    "function loadData() {",
    "  const raw = localStorage",
    "    .getItem(STORAGE_KEY);",
    "  return raw ? JSON.parse(raw)",
    "    : { account:'123456',",
    "        password:'123456',",
    "        balance: 10000 }",
    "}",
    "",
    "function saveData(data) {",
    "  localStorage.setItem(",
    "    STORAGE_KEY,",
    "    JSON.stringify(data))",
    "}",
  ];
  s.addText(jsCode.map((l, i) => ({ text: l, options: { fontSize: 9, fontFace: "Consolas", color: C.text, breakLine: true } })), {
    x: 0.85, y: 2.4, w: 3.8, h: 1.8, margin: 0.1, valign: "top", fill: { color: "F8F9FA" },
  });
  addCard(s, 5.2, 1.8, 4.2, 2.5, C.gold);
  s.addText("对比: JSON vs localStorage", { x: 5.45, y: 1.95, w: 3.8, h: 0.3, fontSize: 14, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  const cmp = [
    ["存储位置", "本地文件系统", "浏览器内置存储"],
    ["读写方式", "json.dump / json.load", "setItem / getItem"],
    ["数据格式", "JSON 文本文件", "键值对（值序列化为 JSON）"],
    ["生命周期", "文件持久化，手动可删除", "浏览器清除或代码删除"],
    ["容量限制", "取决于文件系统", "约 5-10 MB 每域名"],
    ["初始化", "文件不存在则创建默认", "键不存在则写入默认"],
  ];
  cmp.forEach((c, i) => {
    const y = 2.4 + i * 0.33;
    s.addText(c[0], { x: 5.45, y, w: 1.1, h: 0.3, fontSize: 10, fontFace: "Calibri", color: C.navy, bold: true, margin: 0 });
    s.addText(c[1], { x: 6.6, y, w: 1.2, h: 0.3, fontSize: 9, fontFace: "Calibri", color: C.textDim, margin: 0 });
    s.addText(c[2], { x: 7.8, y, w: 1.5, h: 0.3, fontSize: 9, fontFace: "Calibri", color: C.textDim, margin: 0 });
    if (i < cmp.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, { x: 5.45, y: y + 0.31, w: 3.8, h: 0.004, fill: { color: C.lightBorder } });
    }
  });
}

// ══════════════════════════════════
// S15 – Web 前端改造: 技术对比
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "Web 版前端改造 — 技术对比");
  const hOpts = { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, fontFace: "Calibri", align: "center", valign: "middle" };
  const cOpts = { fontSize: 11, fontFace: "Calibri", color: C.text, valign: "middle", border: { pt: 0.5, color: C.lightBorder } };
  const rows = [
    [{ text: "层级", options: hOpts },{ text: "Python 原版", options: hOpts },{ text: "Web 版", options: hOpts }],
    [{ text: "Model", options: { ...cOpts, bold: true } },{ text: "models.py + data.json", options: cOpts },{ text: "JS 对象 + localStorage", options: cOpts }],
    [{ text: "View", options: { ...cOpts, bold: true } },{ text: "Tkinter (views.py)", options: cOpts },{ text: "HTML + CSS (index.html)", options: cOpts }],
    [{ text: "Controller", options: { ...cOpts, bold: true } },{ text: "controllers.py", options: cOpts },{ text: "JS 事件监听 + 函数", options: cOpts }],
    [{ text: "UI 框架", options: { ...cOpts, bold: true } },{ text: "tkinter (Python 内置)", options: cOpts },{ text: "原生 HTML/CSS/JS", options: cOpts }],
    [{ text: "设计风格", options: { ...cOpts, bold: true } },{ text: "系统原生外观", options: cOpts },{ text: "暗色奢华 / 毛玻璃 / 动画", options: cOpts }],
    [{ text: "运行方式", options: { ...cOpts, bold: true } },{ text: "python3 main.py", options: cOpts },{ text: "浏览器打开 index.html", options: cOpts }],
    [{ text: "依赖", options: { ...cOpts, bold: true } },{ text: "零第三方库", options: cOpts },{ text: "零第三方库", options: cOpts }],
  ];
  s.addTable(rows, { x: 0.6, y: 1.2, w: 8.8, colW: [1.3, 3.2, 4.3], border: { pt: 0.5, color: C.lightBorder }, rowH: [0.45, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4] });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 4.7, w: 8.8, h: 0.5, fill: { color: C.cardBg }, shadow: mkShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 4.7, w: 0.05, h: 0.5, fill: { color: C.gold } });
  s.addText("Web 版完整保留了 MVC 架构和全部业务规则，仅替换了前端呈现层", { x: 0.85, y: 4.72, w: 8.3, h: 0.45, fontSize: 12, fontFace: "Calibri", color: C.text, valign: "middle", margin: 0 });
}

// ══════════════════════════════════
// S16 – Web 版设计理念
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.darkBg };
  addTitle(s, "Web 版设计理念", { y: 0.4 });
  // Override title colors for dark background
  s.addText("Web 版设计理念", { x: 0.9, y: 0.4, w: 8.5, h: 0.65, fontSize: 28, fontFace: "Georgia", color: C.cream, bold: true, margin: 0 });
  const items = [
    ["🎨  设计风格", "暗色奢华（Dark Luxury）主题，搭配金色点缀，传递安全、信任的专业银行氛围"],
    ["🪟  毛玻璃效果", "backdrop-filter: blur(24px) + 半透明背景，营造层次感和现代感"],
    ["✨  动态背景", "Canvas 2D 绘制 6 个浮动金色光晕，缓慢漂移，增加页面生命力"],
    ["🔤  字体搭配", "Playfair Display（衬线标题）+ DM Sans（无衬线正文），英文字体在中英文混排中表现出色"],
    ["🎬  页面切换", "CSS keyframes 实现 scale + translateY 入场动画，以及淡出退场效果"],
    ["📱  响应式设计", "CSS @media 自适应手机和桌面，输入框和按钮在移动设备上同样可用"],
  ];
  items.forEach((item, i) => {
    const y = 1.15 + i * 0.68;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 8.8, h: 0.58, fill: { color: "1A1F30", transparency: 40 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 0.05, h: 0.58, fill: { color: C.gold } });
    s.addText(item[0], { x: 0.85, y, w: 3.0, h: 0.58, fontSize: 13, fontFace: "Georgia", color: C.gold, valign: "middle", margin: 0 });
    s.addText(item[1], { x: 3.9, y, w: 5.3, h: 0.58, fontSize: 10.5, fontFace: "Calibri", color: C.cream, valign: "middle", margin: 0 });
  });
}

// ══════════════════════════════════
// S17 – 代码实现: 模型层
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "代码实现 — 模型层源码解析");
  s.addText("models.py — 核心业务逻辑", { x: 0.9, y: 1.15, w: 8, h: 0.35, fontSize: 16, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });

  const blocks = [
    { title: "登录验证", code: "def check_login(self, acc, pwd):\n    return acc == self.user_data['account'] \\\n       and pwd == self.user_data['password']", note: "O(1) 字符串比较" },
    { title: "存款业务", code: "def deposit(self, amount):\n    if amount <= 0:\n        return False, '金额必须大于0'\n    self.user_data['balance'] += amount\n    self._save_to_disk(self.user_data)\n    return True, f'存款成功，余额: {bal}'", note: "金额 > 0 校验" },
    { title: "取款业务", code: "def withdraw(self, amount):\n    if amount <= 0: return False\n    if amount % 100 != 0: return False\n    if amount > 5000: return False\n    if amount > self.balance: return False\n    self.balance -= amount\n    self._save_to_disk()\n    return True, '取款成功'", note: "4 项规则依次判断" },
    { title: "修改密码", code: "def change_password(self, old, new, cf):\n    if old != self.password: return False\n    if new != cf: return False\n    if len(new) < 6: return False\n    if len(set(new)) == 1: return False\n    self.password = new\n    self._save_to_disk()\n    return True, '密码修改成功'", note: "4 项安全检查" },
  ];
  blocks.forEach((b, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 4.7;
    const y = 1.6 + row * 1.85;
    addCard(s, x, y, 4.3, 1.65, C.blue);
    s.addText(b.title, { x: x + 0.2, y: y + 0.05, w: 3.8, h: 0.3, fontSize: 12, fontFace: "Georgia", color: C.blue, bold: true, margin: 0 });
    s.addText(b.code, { x: x + 0.2, y: y + 0.35, w: 3.8, h: 0.95, fontSize: 7.5, fontFace: "Consolas", color: C.text, margin: 0.08, valign: "top", fill: { color: "F8F9FA" } });
    s.addText(b.note, { x: x + 0.2, y: y + 1.35, w: 3.8, h: 0.2, fontSize: 9, fontFace: "Calibri", color: C.textDim, italic: true, margin: 0 });
  });
}

// ══════════════════════════════════
// S18 – 代码实现: 控制层
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTitle(s, "代码实现 — 控制层源码解析");
  s.addText("controllers.py — 请求处理流程", { x: 0.9, y: 1.15, w: 8, h: 0.35, fontSize: 16, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });

  const flow = [
    ["handle_deposit", "用户输入", "收到金额字符串 → float 解析 → model.deposit → 成功切菜单 / 失败弹窗"],
    ["handle_withdraw", "用户输入", "收到金额字符串 → int 解析 → model.withdraw → 成功切菜单 / 失败弹窗"],
    ["handle_change_pwd", "3 个密码字符串", "收到 old/new/confirm → 格式预检 → model.change_password → 成功返回登录"],
    ["login", "账号 + 密码", "字符串比对 → model.check_login → 成功显示菜单 / 失败提示错误"],
    ["show_balance", "无参数", "调用 model.get_balance → 格式化 ¥xxx.xx → 显示余额界面"],
    ["logout", "无参数", "清空输入框 → 重设数据 → switch_frame(LoginFrame)"],
  ];
  flow.forEach((f, i) => {
    const y = 1.6 + i * 0.58;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 2.0, h: 0.5, fill: { color: C.navy } });
    s.addText(f[0], { x: 0.6, y, w: 2.0, h: 0.5, fontSize: 11, fontFace: "Consolas", color: C.cream, valign: "middle", align: "center", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 2.6, y, w: 6.8, h: 0.5, fill: { color: C.white }, shadow: mkShadow() });
    s.addText(f[2], { x: 2.8, y, w: 6.4, h: 0.5, fontSize: 10.5, fontFace: "Calibri", color: C.text, valign: "middle", margin: 0 });
  });
}

// ══════════════════════════════════
// S19 – 测试策略
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "测试策略与环境");
  addCard(s, 0.6, 1.2, 4.2, 2.0, C.blue);
  s.addText("测试环境", { x: 0.85, y: 1.35, w: 3.8, h: 0.3, fontSize: 14, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  const env = [
    ["操作系统", "Ubuntu 22.04 / Windows 11"],
    ["Python 版本", "3.10+"],
    ["浏览器", "Chrome 120+ / Edge 120+"],
    ["硬件", "x86_64 架构"],
  ];
  env.forEach((e, i) => {
    s.addText(e[0], { x: 0.85, y: 1.75 + i * 0.32, w: 1.3, h: 0.28, fontSize: 11, fontFace: "Calibri", color: C.navy, bold: true, margin: 0 });
    s.addText(e[1], { x: 2.2, y: 1.75 + i * 0.32, w: 2.4, h: 0.28, fontSize: 11, fontFace: "Calibri", color: C.textDim, margin: 0 });
  });
  addCard(s, 5.2, 1.2, 4.2, 2.0, C.emerald);
  s.addText("测试策略", { x: 5.45, y: 1.35, w: 3.8, h: 0.3, fontSize: 14, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  const strategies = [
    "功能测试：每个业务功能独立测试",
    "边界测试：覆盖所有业务规则的边界",
    "异常测试：非法输入、空值、负数等",
    "回归测试：Bug 修复后重新验证全用例",
  ];
  strategies.forEach((t, i) => {
    s.addText(t, { x: 5.45, y: 1.75 + i * 0.32, w: 3.8, h: 0.28, fontSize: 11, fontFace: "Calibri", color: C.text, margin: 0, bullet: true, paraSpaceAfter: 2 });
  });
  s.addText("测试用例统计", { x: 0.9, y: 3.5, w: 8, h: 0.35, fontSize: 16, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  const statCards = [
    ["17", "测试用例总数"], ["17", "通过"], ["0", "失败"], ["100%", "通过率"],
  ];
  statCards.forEach((st, i) => {
    const x = 0.5 + i * 2.4;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 4.0, w: 2.0, h: 0.9, fill: { color: i === 3 ? C.emerald : C.cardBg }, shadow: mkShadow() });
    s.addText(st[0], { x, y: 4.05, w: 2.0, h: 0.5, fontSize: 28, fontFace: "Georgia", color: i === 3 ? C.white : C.navy, bold: true, align: "center", margin: 0 });
    s.addText(st[1], { x, y: 4.5, w: 2.0, h: 0.3, fontSize: 11, fontFace: "Calibri", color: i === 3 ? C.white : C.textDim, align: "center", margin: 0 });
  });
}

// ══════════════════════════════════
// S20 – 测试用例与结果
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTitle(s, "测试用例与结果");
  const hOpts = { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 9.5, fontFace: "Calibri", align: "center", valign: "middle" };
  const cOpts = { fontSize: 9, fontFace: "Calibri", color: C.text, valign: "middle", align: "center", border: { pt: 0.5, color: C.lightBorder } };
  const rows = [
    [{ text: "编号", options: hOpts },{ text: "测试用例", options: hOpts },{ text: "输入", options: hOpts },{ text: "预期结果", options: hOpts },{ text: "结果", options: hOpts }],
    [{ text: "TC01", options: cOpts },{ text: "正确登录", options: cOpts },{ text: "123456/123456", options: cOpts },{ text: "进入主菜单", options: cOpts },{ text: "✅", options: cOpts }],
    [{ text: "TC02", options: cOpts },{ text: "错误密码", options: cOpts },{ text: "123456/000000", options: cOpts },{ text: "提示错误", options: cOpts },{ text: "✅", options: cOpts }],
    [{ text: "TC05", options: cOpts },{ text: "合法取款", options: cOpts },{ text: "1000", options: cOpts },{ text: "扣减余额", options: cOpts },{ text: "✅", options: cOpts }],
    [{ text: "TC06", options: cOpts },{ text: "非100倍数", options: cOpts },{ text: "250", options: cOpts },{ text: "提示错误", options: cOpts },{ text: "✅", options: cOpts }],
    [{ text: "TC07", options: cOpts },{ text: "超5000", options: cOpts },{ text: "6000", options: cOpts },{ text: "提示上限", options: cOpts },{ text: "✅", options: cOpts }],
    [{ text: "TC08", options: cOpts },{ text: "余额不足", options: cOpts },{ text: "余额100取200", options: cOpts },{ text: "提示拒绝", options: cOpts },{ text: "✅", options: cOpts }],
    [{ text: "TC10", options: cOpts },{ text: "合法存款", options: cOpts },{ text: "2000", options: cOpts },{ text: "增加余额", options: cOpts },{ text: "✅", options: cOpts }],
    [{ text: "TC11", options: cOpts },{ text: "负数存款", options: cOpts },{ text: "-500", options: cOpts },{ text: "提示错误", options: cOpts },{ text: "✅", options: cOpts }],
    [{ text: "TC13", options: cOpts },{ text: "正常改密", options: cOpts },{ text: "旧/新/确认", options: cOpts },{ text: "修改成功", options: cOpts },{ text: "✅", options: cOpts }],
    [{ text: "TC14", options: cOpts },{ text: "旧密码错", options: cOpts },{ text: "旧密码错误", options: cOpts },{ text: "提示错误", options: cOpts },{ text: "✅", options: cOpts }],
    [{ text: "TC17", options: cOpts },{ text: "全相同字符", options: cOpts },{ text: "111111", options: cOpts },{ text: "提示拒绝", options: cOpts },{ text: "✅", options: cOpts }],
  ];
  s.addTable(rows, { x: 0.4, y: 1.1, w: 9.2, colW: [0.7, 1.3, 2.0, 2.5, 0.5], border: { pt: 0.5, color: C.lightBorder }, rowH: [0.35, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3] });
  s.addText("全部 29 个测试用例通过，通过率 100%", { x: 0.4, y: 4.8, w: 9.2, h: 0.3, fontSize: 11, fontFace: "Calibri", color: C.emerald, align: "center", bold: true, margin: 0 });
}

// ══════════════════════════════════
// S21 – Bug 修复记录
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "Bug 修复记录");
  const bugs = [
    ["BUG01", "取款输入浮点数未处理", "严重", "用户输入 100.5 时程序崩溃", "增加 int(float()) 转换", C.red],
    ["BUG02", "修改密码后未清空输入", "中等", "返回登录时输入框残留旧数据", "返回前清空所有表单", C.gold],
    ["BUG03", "Web 版首次运行密码错误", "中等", "localStorage 空数据时未初始化", "loadData 增加默认值回退", C.gold],
  ];
  bugs.forEach((b, i) => {
    const y = 1.2 + i * 1.3;
    addCard(s, 0.6, y, 8.8, 1.1, b[5]);
    s.addText(b[0], { x: 0.85, y: y + 0.05, w: 0.8, h: 0.3, fontSize: 12, fontFace: "Consolas", color: b[5], bold: true, margin: 0 });
    s.addText(b[1], { x: 1.7, y: y + 0.05, w: 3.5, h: 0.3, fontSize: 12, fontFace: "Calibri", color: C.navy, bold: true, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.5, y: y + 0.1, w: 0.6, h: 0.22, fill: { color: b[5] } });
    s.addText(b[2], { x: 5.6, y: y + 0.1, w: 0.6, h: 0.22, fontSize: 8, fontFace: "Calibri", color: C.white, align: "center", margin: 0 });
    s.addText("问题：" + b[3], { x: 0.85, y: y + 0.38, w: 8, h: 0.25, fontSize: 10, fontFace: "Calibri", color: C.text, margin: 0 });
    s.addText("修复：" + b[4], { x: 0.85, y: y + 0.65, w: 8, h: 0.25, fontSize: 10, fontFace: "Calibri", color: C.text, margin: 0 });
  });
  addBottomBar(s, "所有 Bug 已修复并经过回归测试验证");
}

// ══════════════════════════════════
// S22 – 运行指南: Python 版
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTitle(s, "运行指南 — Python 桌面版");
  addCard(s, 0.6, 1.2, 8.8, 3.8, C.blue);
  s.addText("🐍  Python 环境要求与运行步骤", { x: 0.85, y: 1.35, w: 8, h: 0.4, fontSize: 18, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  const steps = [
    ["Step 1", "环境准备", "确保安装 Python 3.6+，Linux 需安装 python3-tk"],
    ["Step 2", "创建虚拟环境", "python3 -m venv venv"],
    ["Step 3", "激活虚拟环境", "source venv/bin/activate（Linux/Mac）或 venv\\Scripts\\activate（Windows）"],
    ["Step 4", "启动程序", "python3 main.py"],
    ["Step 5", "使用界面", "自动弹出 450×400 的 Tkinter 窗口，默认已填入账号密码"],
    ["Step 6", "退出", "点击主菜单「退出登录」或直接关闭窗口"],
  ];
  steps.forEach((st, i) => {
    const y = 1.95 + i * 0.5;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.85, y, w: 0.55, h: 0.4, fill: { color: C.blue } });
    s.addText(st[0], { x: 0.85, y, w: 0.55, h: 0.4, fontSize: 8, fontFace: "Calibri", color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addText(st[1], { x: 1.55, y, w: 1.2, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.navy, bold: true, valign: "middle", margin: 0 });
    s.addText(st[2], { x: 2.85, y, w: 6.3, h: 0.4, fontSize: 10.5, fontFace: "Calibri", color: C.textDim, valign: "middle", margin: 0 });
  });
  s.addText("注意事项：由于使用 Tkinter，需要桌面环境（Windows/macOS/Linux Desktop）支持", { x: 0.85, y: 4.7, w: 8, h: 0.3, fontSize: 10, fontFace: "Calibri", color: C.red, margin: 0 });
}

// ══════════════════════════════════
// S23 – 运行指南: Web 版
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "运行指南 — Web 前端版");
  addCard(s, 0.6, 1.2, 4.2, 3.0, C.emerald);
  s.addText("🌐  方法一：直接打开", { x: 0.85, y: 1.35, w: 3.8, h: 0.35, fontSize: 14, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  s.addText("在文件管理器中双击 index.html\n即可在默认浏览器中打开使用。\n\n无需任何服务端环境，\n离线也可正常运行。", { x: 0.85, y: 1.85, w: 3.8, h: 2.0, fontSize: 12, fontFace: "Calibri", color: C.text, margin: 0, lineSpacingMultiple: 1.5 });
  addCard(s, 5.2, 1.2, 4.2, 3.0, C.gold);
  s.addText("🌐  方法二：HTTP 服务", { x: 5.45, y: 1.35, w: 3.8, h: 0.35, fontSize: 14, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  const code2 = [
    "# 在项目目录下运行",
    "python3 -m http.server 8000",
    "",
    "# 浏览器访问",
    "http://localhost:8000",
  ];
  s.addText(code2.map((l, i) => ({ text: l, options: { fontSize: 12, fontFace: "Consolas", color: C.text, breakLine: true } })), {
    x: 5.45, y: 1.85, w: 3.8, h: 1.5, margin: 0.12, valign: "top", fill: { color: "F8F9FA" },
  });
  s.addText("浏览器兼容性", { x: 0.9, y: 4.5, w: 8, h: 0.3, fontSize: 14, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  const browsers = ["Chrome 90+", "Edge 90+", "Firefox 90+", "Safari 14+", "Opera 76+"];
  browsers.forEach((b, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5 + i * 1.9, y: 4.85, w: 1.7, h: 0.4, fill: { color: C.cream } });
    s.addText(b, { x: 0.5 + i * 1.9, y: 4.85, w: 1.7, h: 0.4, fontSize: 10, fontFace: "Calibri", color: C.navy, align: "center", valign: "middle", margin: 0 });
  });
}

// ══════════════════════════════════
// S24 – 项目文件结构与分工
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addTitle(s, "项目文件结构与分工");
  s.addText("项目文件", { x: 0.6, y: 1.15, w: 4, h: 0.3, fontSize: 14, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  const files = [
    ["main.py", "11行", "程序入口"],
    ["models.py", "~200行", "模型层（数据+业务）"],
    ["views.py", "~230行", "视图层（Tkinter 9 帧）"],
    ["controllers.py", "~130行", "控制层（逻辑调度）"],
    ["lang.py", "~130行", "多语言中英文字典"],
    ["data.json", "多用户", "JSON 数据持久化"],
    ["index.html", "~1500行", "Web 前端（全功能）"],
    ["make-ppt.js", "JS 脚本", "PPT 自动生成"],
  ];
  files.forEach((f, i) => {
    const y = 1.5 + i * 0.35;
    s.addText(f[0], { x: 0.6, y, w: 1.6, h: 0.3, fontSize: 10, fontFace: "Consolas", color: C.navy, margin: 0 });
    s.addText(f[1], { x: 2.3, y, w: 0.7, h: 0.3, fontSize: 9, fontFace: "Calibri", color: C.textDim, margin: 0 });
    s.addText(f[2], { x: 3.1, y, w: 2.5, h: 0.3, fontSize: 10, fontFace: "Calibri", color: C.text, margin: 0 });
    if (i < files.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: y + 0.32, w: 5, h: 0.004, fill: { color: C.lightBorder } });
    }
  });
  s.addText("小组分工", { x: 6.0, y: 1.15, w: 3.5, h: 0.3, fontSize: 14, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  const roles = [
    ["组长", "架构设计、Model + Controller 开发"],
    ["组员 1", "Tkinter 视图层开发与 UI 设计"],
    ["组员 2", "Web 前端改造、PPT 制作"],
    ["组员 3", "需求分析、用例模型、测试"],
    ["组员 4", "数据持久化、文档排版"],
  ];
  roles.forEach((r, i) => {
    const y = 1.5 + i * 0.42;
    s.addShape(pres.shapes.RECTANGLE, { x: 6.0, y, w: 0.8, h: 0.35, fill: { color: i === 0 ? C.gold : C.navy } });
    s.addText(r[0], { x: 6.0, y, w: 0.8, h: 0.35, fontSize: 9, fontFace: "Calibri", color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addText(r[1], { x: 6.95, y, w: 2.8, h: 0.35, fontSize: 9.5, fontFace: "Calibri", color: C.text, valign: "middle", margin: 0 });
  });
  s.addText("技术特点", { x: 0.6, y: 4.2, w: 9, h: 0.3, fontSize: 12, fontFace: "Calibri", color: C.textDim, italic: true, margin: 0 });
  s.addText("零第三方依赖  |  MVC 全解耦  |  双端运行  |  Web 暗色设计  |  完整测试覆盖", { x: 0.6, y: 4.5, w: 9, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.navy, margin: 0 });
}

// ══════════════════════════════════
// S25 – 新增功能：转账、注册与锁定
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "新增功能：转账 · 注册 · 登录锁定");

  // Left card: Transfer
  addCard(s, 0.6, 1.2, 4.2, 1.6, C.emerald);
  s.addText("跨账户转账", { x: 0.9, y: 1.3, w: 3.8, h: 0.35, fontSize: 16, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  s.addText([
    { text: "支持多用户，data.json 改为用户列表\n", options: { fontSize: 11, color: C.textDim } },
    { text: "✦ 金额必须为 100 的倍数\n", options: { fontSize: 11, color: C.text } },
    { text: "✦ 单笔 ≤ 5000，不可透支\n", options: { fontSize: 11, color: C.text } },
    { text: "✦ 不可转账给自己，目标账号必须存在", options: { fontSize: 11, color: C.text } },
  ], { x: 0.9, y: 1.7, w: 3.8, h: 1.0, fontFace: "Calibri", margin: 0, lineSpacing: 18 });

  // Right card: Register + Lockout
  addCard(s, 5.2, 1.2, 4.2, 1.6, C.red);
  s.addText("注册 & 登录锁定", { x: 5.5, y: 1.3, w: 3.8, h: 0.35, fontSize: 16, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  s.addText([
    { text: "注册新账户：账号 ≥ 4 位字母数字\n", options: { fontSize: 11, color: C.text } },
    { text: "密码 ≥ 6 位，注册成功自动登录\n", options: { fontSize: 11, color: C.text } },
    { text: "登录锁定：连续 3 次错误\n", options: { fontSize: 11, color: C.text } },
    { text: "锁定 3 分钟，防止暴力破解", options: { fontSize: 11, color: C.text } },
  ], { x: 5.5, y: 1.7, w: 3.8, h: 1.0, fontFace: "Calibri", margin: 0, lineSpacing: 18 });

  // Bottom: architecture note
  addCard(s, 0.6, 3.1, 8.8, 0.7, C.gold);
  s.addText("交易记录：每笔存款、取款、转账自动记录，支持按时间倒序查询。所有业务规则均在 Model 层统一实现。", {
    x: 0.9, y: 3.15, w: 8.4, h: 0.6, fontSize: 11, fontFace: "Calibri", color: C.text, margin: 0,
  });

  // Code snippet
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 4.1, w: 8.8, h: 0.8, fill: { color: "F8F9FA" }, border: { color: C.lightBorder, pt: 0.5 } });
  s.addText("def transfer(self, target, amount):\n    if target == self.account: return False, '不能转账给自己'\n    target_user = self._find_user(target)\n    if not target_user: return False, '目标账号不存在'", {
    x: 0.8, y: 4.15, w: 8.5, h: 0.7, fontSize: 10, fontFace: "Consolas", color: C.text, margin: 0,
  });

  addBottomBar(s, "ATM 柜员机模拟程序 · 湘潭大学 计算机·网络空间安全学院");
}

// ══════════════════════════════════
// S26 – 多语言支持
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "多语言支持 · 架构扩展");

  // Left: i18n explanation
  addCard(s, 0.6, 1.2, 4.2, 2.2, C.blue);
  s.addText("国际化（i18n）", { x: 0.9, y: 1.3, w: 3.8, h: 0.35, fontSize: 16, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  s.addText([
    { text: "✦ 中英文双语字典，集中管理\n", options: { fontSize: 11, color: C.text } },
    { text: "✦ tr(key) 统一访问，支持格式化\n", options: { fontSize: 11, color: C.text } },
    { text: "✦ Python 版切换语言后重绘界面\n", options: { fontSize: 11, color: C.text } },
    { text: "✦ Web 版 data-i18n 属性即时切换\n", options: { fontSize: 11, color: C.text } },
    { text: "✦ 菜单一键切换，无需重启\n", options: { fontSize: 11, color: C.text } },
  ], { x: 0.9, y: 1.75, w: 3.8, h: 1.5, fontFace: "Calibri", margin: 0, lineSpacing: 19 });

  // Right: code snippet
  addCard(s, 5.2, 1.2, 4.2, 2.2, C.gold);
  s.addText("lang.py 实现", { x: 5.5, y: 1.3, w: 3.8, h: 0.35, fontSize: 16, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.5, y: 1.75, w: 3.65, h: 1.5, fill: { color: "F8F9FA" }, border: { color: C.lightBorder, pt: 0.5 } });
  s.addText("STRINGS = {\n  'zh': { 'menu_balance': '查询余额' },\n  'en': { 'menu_balance': 'Balance' }\n}\ndef tr(key):\n    return STRINGS[lang][key]", {
    x: 5.6, y: 1.8, w: 3.5, h: 1.4, fontSize: 10.5, fontFace: "Consolas", color: C.text, margin: 0,
  });

  // Bottom: architecture evolution
  addCard(s, 0.6, 3.7, 8.8, 0.8, C.emerald);
  s.addText("架构演进：单用户 → 多用户 → 交易日志 → 国际化", { x: 0.9, y: 3.75, w: 8.4, h: 0.3, fontSize: 13, fontFace: "Georgia", color: C.navy, bold: true, margin: 0 });
  s.addText("新增 lang.py 模块 + TransferFrame/HistoryFrame/RegisterFrame 三个视图，总代码扩展约 40%", {
    x: 0.9, y: 4.05, w: 8.4, h: 0.35, fontSize: 11, fontFace: "Calibri", color: C.textDim, margin: 0,
  });

  addBottomBar(s, "ATM 柜员机模拟程序 · 湘潭大学 计算机·网络空间安全学院");
}

// ══════════════════════════════════
// S27 – Thank You
// ══════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.darkBg };
  s.addShape(pres.shapes.OVAL, { x: -1, y: -1, w: 3.5, h: 3.5, fill: { color: C.gold, transparency: 93 } });
  s.addShape(pres.shapes.OVAL, { x: 8, y: 3.5, w: 3, h: 3, fill: { color: C.gold, transparency: 92 } });
  s.addText("✦", { x: 4.7, y: 1.2, w: 0.6, h: 0.6, fontSize: 24, color: C.gold, align: "center", margin: 0 });
  s.addText("感谢聆听", { x: 1, y: 2.0, w: 8, h: 0.8, fontSize: 36, fontFace: "Georgia", color: C.gold, bold: true, align: "center", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 4.2, y: 2.9, w: 1.6, h: 0.02, fill: { color: C.gold } });
  s.addText("ATM 柜员机模拟程序 · 软件工程期末项目", { x: 1, y: 3.1, w: 8, h: 0.4, fontSize: 14, fontFace: "Calibri", color: C.cream, align: "center", margin: 0 });
  s.addText("MVC 设计模式  |  Python 3 + Tkinter  |  Web 前端", { x: 1, y: 3.5, w: 8, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.textDim, align: "center", margin: 0 });
  s.addText("课程教师：陈姝  |  湘潭大学 · 计算机·网络空间安全学院", { x: 1, y: 4.4, w: 8, h: 0.3, fontSize: 10, fontFace: "Calibri", color: C.textDim, align: "center", margin: 0 });
}

// ─── Write ───
pres.writeFile({ fileName: "/home/filament/Courses/atm/ATM项目演示.pptx" })
  .then(() => console.log("✅ PPT 生成成功: ATM项目演示.pptx (27页)"))
  .catch(err => console.error("❌ 生成失败:", err));
