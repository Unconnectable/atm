# ATM 柜员机模拟程序

软件工程 · 期末项目 — 湘潭大学 计算机·网络空间安全学院

---

## 目录

1. [项目简介](#1-项目简介)
2. [MVC 架构详解](#2-mvc-架构详解)
3. [技术栈](#3-技术栈)
4. [业务规则](#4-业务规则)
5. [项目文件结构](#5-项目文件结构)
6. [运行方式](#6-运行方式)
7. [Python 版详细技术实现](#7-python-版详细技术实现)
8. [Web 版详细技术实现](#8-web-版详细技术实现)
9. [测试](#9-测试)

---

## 1. 项目简介

本项目实现了一个 ATM 柜员机模拟程序，支持用户登录、余额查询、存款、取款、转账、交易记录查询、注册新账户和修改密码等核心功能。项目采用 **MVC（Model-View-Controller）设计模式** 进行架构设计，同时提供了 **Python Tkinter 桌面版** 和 **Web 前端版** 两套实现。

### 核心设计原则

- **高内聚、低耦合**：三层架构职责分明，Model 层专注业务逻辑，View 层仅负责界面呈现，Controller 层负责调度
- **零第三方依赖**：桌面版完全基于 Python 3 标准库（tkinter + json + os）
- **业务规则全在 Model 层**：View 层不包含任何逻辑判断，保证规则一致性和可测试性

---

## 2. MVC 架构详解

### 2.1 三层职责

```
┌──────────────────────────────────────────────────────────┐
│                    用户界面                                │
│     View 层（views.py / index.html）                      │
│     Tkinter 窗口 / 浏览器页面（仅展示，不含逻辑）          │
├──────────────────────────────────────────────────────────┤
│                    控制层                                  │
│     Controller 层（controllers.py / JS 事件处理）          │
│     接收输入 → 调用 Model → 更新 View（纯调度）            │
├──────────────────────────────────────────────────────────┤
│                    数据层                                  │
│     Model 层（models.py / JS Model 对象）                  │
│     业务逻辑校验 + data.json / localStorage 持久化        │
└──────────────────────────────────────────────────────────┘
```

### 2.2 Model 层（models.py）

**职责**：管理核心数据和业务规则，封装 JSON 文件读写。

核心类 `ATMModel`：

| 方法 | 功能 | 时间复杂度 |
|------|------|-----------|
| `check_login(acc, pwd)` | 验证账号密码，含连续3次错误锁定 | O(n) |
| `get_balance()` | 返回当前余额 | O(1) |
| `deposit(amount)` | 存款：校验 amount > 0，更新余额并持久化 | O(1) |
| `withdraw(amount)` | 取款：校验 4 项规则，通过后扣减余额 | O(1) |
| `transfer(target, amount)` | 转账：校验 5 项规则，更新双方余额并记录日志 | O(n) |
| `register(acc, pwd)` | 注册新账户：校验账号密码合法性，创建用户 | O(n) |
| `get_transactions(limit)` | 获取当前用户的交易记录列表 | O(n) |
| `change_password(old, new, confirm)` | 修改密码：4 项安全校验，通过后更新 | O(n) |

**数据持久化机制**：

```python
def _load_data(self):
    """从 data.json 加载数据，不存在则初始化默认值"""
    if not os.path.exists(self.data_file):
        self._save_to_disk(self.initial_data)
        return self.initial_data
    with open(self.data_file, 'r', encoding='utf-8') as f:
        return json.load(f)

def _save_to_disk(self, data):
    """写回 data.json，每次业务操作后立即持久化"""
    with open(self.data_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
```

**设计要点**：
- 写盘策略采取"每次业务操作后立即持久化"，避免程序异常退出导致数据丢失
- `_load_data` 和 `_save_to_disk` 为私有方法，外部通过公有业务方法间接调用
- JSON 编码使用 `ensure_ascii=False` 和 `indent=4` 保证可读性
- 支持多账户存储，自动检测旧版单用户格式并迁移

### 2.3 View 层（views.py）

**职责**：负责图形界面布局与呈现，不包含任何业务逻辑。

核心类 `ATMView(tk.Tk)`：

```python
class ATMView(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("大学生软件工程项目 - ATM柜员机模拟程序")
        self.geometry("450x400")
        self.resizable(False, False)
```

**界面切换机制**：`switch_frame` 方法使用"销毁旧帧 → 创建新帧"策略，每次只保留一个活跃 Frame。

```python
def switch_frame(self, frame_class, *args, **kwargs):
    new_frame = frame_class(self.main_container, *args, **kwargs)
    if self.current_frame is not None:
        self.current_frame.destroy()
    self.current_frame = new_frame
    self.current_frame.pack(fill="both", expand=True)
```

**界面列表**：

| 类名 | 对应功能 | 关键组件 |
|------|---------|---------|
| `LoginFrame` | 登录 | Entry × 2（账号 + 密码掩码）、Button（登录） |
| `MenuFrame` | 主菜单 | Button × 5（查询/存款/取款/改密/退出） |
| `BalanceFrame` | 余额查询 | Label（大号余额）、Button（返回） |
| `ActionFrame` | 存/取款 | Entry（金额）、Button × 2（提交/返回） |
| `ChangePwdFrame` | 修改密码 | Entry × 3（旧/新/确认密码）、Button × 2 |

### 2.4 Controller 层（controllers.py）

**职责**：作为 Model 和 View 的桥梁，接收 View 事件 → 调用 Model 处理 → 指示 View 更新。

```python
class ATMController:
    def __init__(self, model, view):
        self.model = model
        self.view = view
        self.view.switch_frame(LoginFrame, self)

    def login(self, acc, pwd):
        if self.model.check_login(acc, pwd):
            self.show_menu()
        else:
            self.view.show_message("错误", "账号或密码不正确", is_error=True)

    def handle_withdraw(self, amount_str):
        try:
            amount = int(float(amount_str))
            success, msg = self.model.withdraw(amount)
            if success:
                self.view.show_message("成功", msg)
                self.show_menu()
            else:
                self.view.show_message("错误", msg, is_error=True)
        except ValueError:
            self.view.show_message("错误", "请输入有效的数字金额", is_error=True)
```

**控制流模式**：

```
View 事件 → Controller 方法 → 参数预处理/格式校验
                              → Model 业务方法 → 执行逻辑 + 持久化
                              → 返回 (success, message)
                              → View 显示结果（成功/失败弹窗 + 界面跳转）
```

---

## 3. 技术栈

### Python 桌面版

| 技术 | 版本 | 说明 |
|------|------|------|
| Python | 3.6+ | 核心开发语言 |
| Tkinter | 内置 | 桌面 GUI 框架，基于 Tk |
| json | 内置 | 数据序列化与持久化 |
| os | 内置 | 文件路径与存在性判断 |

### Web 前端版

| 技术 | 说明 |
|------|------|
| HTML5 | 页面结构与语义化标签 |
| CSS3 | 样式、布局（Flexbox）、动画（Keyframes）、毛玻璃效果（backdrop-filter） |
| JavaScript ES6+ | 交互逻辑、DOM 操作、Canvas 渲染、localStorage |
| Google Fonts | Playfair Display（标题）+ DM Sans（正文） |

---

## 4. 业务规则

所有业务规则集中在 Model 层实现，通过 `withdraw()`、`deposit()`、`transfer()`、`change_password()`、`check_login()` 五个方法提供。

### 4.1 ATM 取款（`withdraw()`）

```
条件 1: amount > 0                        ← 金额为正
条件 2: amount % 100 == 0                 ← 100 的倍数
条件 3: amount <= 5000                    ← 单笔上限
条件 4: amount <= self.user_data.balance  ← 不透支
全部通过 → 扣减余额 → 持久化 → 返回成功
任一不通过 → 返回具体错误信息
```

### 4.2 ATM 存款（`deposit()`）

```
条件: amount > 0                          ← 金额为正
通过 → 增加余额 → 持久化 → 返回成功
不通过 → 返回"存款金额必须大于0"
```

### 4.3 修改密码（`change_password()`）

```
条件 1: old_pwd == self.user_data.password    ← 旧密码正确
条件 2: new_pwd == confirm_pwd                ← 两次输入一致
条件 3: len(new_pwd) >= 6                     ← 长度>=6位
条件 4: len(set(new_pwd)) != 1                ← 非全相同字符
全部通过 → 更新密码 → 持久化 → 返回成功
任一不通过 → 返回具体错误信息
```

条件 4 使用了 `len(set(new_pwd)) == 1` 来判断密码是否由完全相同的字符组成。`set()` 会提取字符串中的不重复字符，如果长度为 1，说明所有字符都相同（如 "111111"、"aaaaaa"）。

### 4.4 转账（`transfer()`）

```
条件 1: amount > 0                          ← 金额为正
条件 2: amount % 100 == 0                   ← 100 的倍数
条件 3: amount <= 5000                      ← 单笔上限
条件 4: amount <= self balance              ← 不透支
条件 5: target != self account              ← 不可转给自己
条件 6: target account exists               ← 目标账号存在
全部通过 → 扣减转出方余额 → 增加转入方余额 → 持久化 → 返回成功
任一不通过 → 返回具体错误信息
```

### 4.5 登录锁定（`check_login()`）

```
条件 1: account exists                       ← 账号存在
条件 2: password matches                     ← 密码正确
条件 3: not locked                           ← 未被锁定
条件 4: failed_attempts < 3                  ← 错误次数未达上限
全部通过 → 重置失败计数 → 返回成功
密码错误 → 失败计数 +1 → 达3次则锁定账户 N 分钟
锁定期间 → 返回"请N分钟后重试"
```

---

## 5. 项目文件结构

```
atm/
├── main.py              # 程序入口：实例化 MVC 三层并启动
├── models.py            # 模型层：ATMModel 类，数据 + 业务逻辑
├── views.py             # 视图层：ATMView + 9 个 Frame 子类
├── controllers.py       # 控制层：ATMController 类，逻辑调度
├── lang.py              # 多语言支持：中英文字符串字典
├── data.json            # 数据文件：JSON 格式持久化（多用户）
├── index.html           # Web 前端：HTML + CSS + JS 一体
├── make-ppt.js          # PPT 自动生成脚本（pptxgenjs）
├── ATM项目演示.pptx     # 生成的演示文稿
├── 项目文档.md           # 软件设计实践报告
├── readme.md            # 本文件
├── requirements.txt     # 依赖说明
├── runtime.txt          # Python 版本说明
├── sugget.txt           # 提示词（开发参考）
├── course_need/         # 课程要求材料
└── require.png          # 选题要求截图
```

### 代码规模

| 文件 | 行数 | 职责 |
|------|------|------|
| `main.py` | 11 | 程序入口 |
| `models.py` | ~200 | 数据与业务逻辑（多账户、转账、锁定、交易日志） |
| `views.py` | ~230 | Tkinter GUI（9 个 Frame 子类） |
| `controllers.py` | ~130 | 逻辑调度（含语言切换） |
| `lang.py` | ~130 | 多语言支持（中/英 字符串字典） |
| `index.html` | ~900 | Web 前端 |

---

## 6. 运行方式

### Python 桌面版

```bash
# 确保 Python 3.6+，Linux 需要 python3-tk
sudo apt-get install python3-tk  # Ubuntu/Debian

# 创建并激活虚拟环境（可选但推荐）
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# 零依赖启动
python3 main.py
```

> 注意：Tkinter 需要桌面环境，无法在纯命令行（SSH）环境下运行。

### Web 前端版

```bash
# 方法一：直接双击 index.html
# 方法二：使用 HTTP 服务（如需支持 ES Module 或避免 CORS 问题）
python3 -m http.server 8000
# 浏览器访问 http://localhost:8000
```

> 兼容 Chrome 90+ / Edge 90+ / Firefox 90+ / Safari 14+

---

## 7. Python 版详细技术实现

### 7.1 main.py — 程序入口

采用依赖注入模式，在入口处组装三层：

```python
def main():
    model = ATMModel()      # 数据层
    view = ATMView()        # 界面层
    controller = ATMController(model, view)  # 控制层，注入依赖
    view.mainloop()         # 启动 Tkinter 事件循环
```

等价于 Spring 等框架中常见的 DI（Dependency Injection）模式。

### 7.2 models.py — 模型层

**数据存储格式**（data.json）—— 多用户 JSON 格式：

```json
{
  "users": [
    {
      "account": "123456",
      "password": "123456",
      "balance": 10000.0,
      "failed_attempts": 0,
      "locked_until": null
    }
  ],
  "transactions": [
    {
      "account": "123456",
      "type": "deposit",
      "amount": 2000.0,
      "balance_after": 12000.0,
      "timestamp": "2026-06-01 10:30:00"
    }
  ]
}
```

**交易记录类型**：`deposit`（存款）、`withdraw`（取款）、`transfer_out`（转出）、`transfer_in`（转入）

**loadData/saveData 工作流程**：

```
程序启动
  └─ _load_data()
       ├─ data.json 存在 → json.load() → user_data
       └─ data.json 不存在 → 写入初始数据 → 返回 initial_data

用户操作
  └─ deposit()/withdraw()/change_password()
       ├─ 业务规则校验
       ├─ 修改 user_data（内存）
       └─ _save_to_disk() → json.dump() → 写入文件
```

### 7.3 views.py — 视图层

**Tkinter 布局结构**：

```
ATMView (tk.Tk)
└── main_container (tk.Frame, pack fill=both expand)
    └── current_frame (动态切换)
        ├── LoginFrame:  Label × 3 + Entry × 2 + Button × 1
        ├── MenuFrame:   Label × 1 + Button × 5
        ├── BalanceFrame: Label × 2 + Button × 1
        ├── ActionFrame:  Label × 2 + Entry × 1 + Button × 2
        └── ChangePwdFrame: Label × 4 + Entry × 3 + Button × 2
```

**事件处理流程**（以存款为例）：

```
1. 用户点击 ActionFrame 中的"提交"按钮
2. Button 的 command 绑定 lambda: controller.handle_deposit(entry.get())
3. Controller 收到字符串 "2000"
4. float("2000") → 2000.0 → model.deposit(2000.0)
5. model 校验 amount > 0 → 增加余额 → _save_to_disk → 返回 True
6. controller → view.show_message("成功", ...) → view.switch_frame(MenuFrame)
```

### 7.4 controllers.py — 控制层

**Controller 作为 Mediator 模式**——Model 和 View 之间不直接通信，全部通过 Controller 中转。

```
View (LoginFrame)           Controller               Model (ATMModel)
     │                           │                        │
     │  command=controller.login │                        │
     │──────────────────────────>│                        │
     │                           │  check_login(acc,pwd)  │
     │                           │───────────────────────>│
     │                           │     True (验证通过)     │
     │                           │<───────────────────────│
     │  switch_frame(MenuFrame)  │                        │
     │<──────────────────────────│                        │
```

---

## 8. Web 版详细技术实现

### 8.1 架构对应关系

| Python 版 | Web 版 | 技术实现 |
|-----------|--------|---------|
| models.py | JS Model | 对象 + localStorage API |
| views.py | HTML + CSS | DOM 元素 + CSS 样式 |
| controllers.py | JS 事件处理 | addEventListener + 回调函数 |
| data.json | localStorage | JSON.parse / JSON.stringify |

### 8.2 设计风格

**主题系统**（CSS 自定义属性）：

```css
:root {
  --bg: #0a0a0c;
  --bg-card: rgba(26,26,30,0.82);
  --border: rgba(212,165,116,0.15);
  --gold: #d4a574;
  --text: #f5f0eb;
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'DM Sans', system-ui, sans-serif;
}
```

### 8.3 背景动画（Canvas 2D）

使用 Canvas 2D API 绘制 6 个浮动金色光晕：

```javascript
class Orb {
    constructor() {
        this.r = 80 + Math.random() * 200;  // 半径 80-280px
        this.x = random(W); this.y = random(H);
        this.vx = (Math.random() - 0.5) * 0.25;  // 缓慢漂移
        this.vy = (Math.random() - 0.5) * 0.25;
        this.alpha = 0.015 + Math.random() * 0.025;
    }
    draw() {
        // 径向渐变：内层金色 → 外层透明
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, `rgba(212,165,116,${alpha})`);
        grad.addColorStop(0.4, `rgba(180,140,100,${alpha*0.5})`);
        grad.addColorStop(1, `rgba(212,165,116,0)`);
    }
}
```

### 8.4 页面切换动画

```css
@keyframes screenIn {
    0%   { opacity: 0; transform: scale(0.94) translateY(12px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes screenOut {
    0%   { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0.96) translateY(8px); }
}
```

### 8.5 数据持久化

```javascript
const STORAGE_KEY = 'aether_atm';

function loadData() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
        const d = JSON.parse(raw);
        if (d.account && d.password && typeof d.balance === 'number')
            return d;
    }
    saveData({ account: '123456', password: '123456', balance: 10000.0 });
    return { account: '123456', password: '123456', balance: 10000.0 };
}

function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
```

---

## 9. 测试

### 9.1 测试策略

- **功能测试**：每个业务功能独立测试，覆盖主成功场景和扩展场景
- **边界测试**：覆盖业务规则的边界条件（0、100倍数边界、5000上限等）
- **异常测试**：非法输入（空值、负数、浮点数等）

### 9.2 测试用例

共 29 个测试用例，通过率 100%。

| 编号 | 模块 | 测试用例 | 输入 | 预期结果 | 结果 |
|------|------|---------|------|---------|------|
| TC01 | 登录 | 正确登录 | 账号 123456, 密码 123456 | 进入主菜单 | ✅ |
| TC02 | 登录 | 错误账号 | 000000 / 123456 | 提示错误 | ✅ |
| TC03 | 登录 | 错误密码 | 123456 / 000000 | 提示错误 | ✅ |
| TC04 | 登录 | 空输入 | 空 / 空 | 提示输入 | ✅ |
| TC05 | 取款 | 合法取款 | 1000 | 扣减余额 | ✅ |
| TC06 | 取款 | 非100倍数 | 250 | 提示错误 | ✅ |
| TC07 | 取款 | 超5000 | 6000 | 提示上限 | ✅ |
| TC08 | 取款 | 余额不足 | 余额100取200 | 提示拒绝 | ✅ |
| TC09 | 取款 | 负数取款 | -100 | 提示无效 | ✅ |
| TC10 | 存款 | 合法存款 | 2000 | 增加余额 | ✅ |
| TC11 | 存款 | 负数存款 | -500 | 提示错误 | ✅ |
| TC12 | 存款 | 零元存款 | 0 | 提示错误 | ✅ |
| TC13 | 改密 | 正常修改 | 旧/新/确认正确 | 修改成功 | ✅ |
| TC14 | 改密 | 旧密码错 | 旧密码错误 | 提示错误 | ✅ |
| TC15 | 改密 | 两次不一致 | 新/确认不同 | 提示错误 | ✅ |
| TC16 | 改密 | 新密码太短 | 长度 < 6 | 提示错误 | ✅ |
| TC17 | 改密 | 全相同字符 | 111111 | 提示拒绝 | ✅ |
| TC18 | 转账 | 合法转账 | 1000 到新账户 | 双方余额变动 | ✅ |
| TC19 | 转账 | 非100倍数 | 250 | 提示错误 | ✅ |
| TC20 | 转账 | 超5000 | 6000 | 提示上限 | ✅ |
| TC21 | 转账 | 余额不足 | 超额转账 | 提示拒绝 | ✅ |
| TC22 | 转账 | 转给自己 | 本账户 | 提示错误 | ✅ |
| TC23 | 转账 | 目标不存在 | 000000 | 提示错误 | ✅ |
| TC24 | 注册 | 正常注册 | newacc / 123456 | 注册成功自动登录 | ✅ |
| TC25 | 注册 | 重复账号 | 123456 | 提示已存在 | ✅ |
| TC26 | 注册 | 密码太短 | 12 | 提示至少6位 | ✅ |
| TC27 | 注册 | 账号太短 | ab | 提示至少4位 | ✅ |
| TC28 | 锁定 | 连续错误 | 3次错误密码 | 锁定3分钟 | ✅ |
| TC29 | 锁定 | 锁定后重试 | 锁定中再试 | 提示仍被锁定 | ✅ |

### 9.3 Bug 修复记录

| 编号 | 问题 | 原因 | 修复 |
|------|------|------|------|
| BUG01 | 取款输入浮点数时崩溃 | 未对浮点数取整 | 增加 `int(float())` 转换 |
| BUG02 | 修改密码后输入框未清空 | 缺少重置操作 | 返回登录前清空所有输入框 |
| BUG03 | Web 版首次运行时密码错误 | localStorage 无数据时未初始化 | loadData 增加默认值回退 |
| BUG04 | 旧版 data.json 为单用户格式，新版为多用户 | 数据结构升级 | 自动检测旧格式并迁移 |
