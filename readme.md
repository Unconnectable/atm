# ATM 柜员机模拟程序 - 软件工程期末项目

这是一个采用 Python 3 开发的 ATM 模拟系统，严格遵循 **MVC (Model-View-Controller)** 设计模式，旨在实现业务逻辑与界面的深度解耦。

## 一、 系统架构原理 (MVC 模式)

为了符合软件工程的高内聚、低耦合要求，本项目划分为三个层次：

### 1. 模型层 (Model) - `models.py`
*   **职责**：管理核心数据和业务规则。
*   **原理**：它封装了与 `data.json` 的交互逻辑。所有的业务判定（如取款是否为100倍数、密码是否符合强度、余额是否足够）均在此层完成。它完全不关心界面是如何显示的。

### 2. 视图层 (View) - `views.py`
*   **职责**：负责图形界面的布局与呈现。
*   **原理**：基于 `Tkinter` 构建。它只负责将数据展示给用户，并将用户的点击或输入动作传递给控制器。它不包含任何业务逻辑判断。

### 3. 控制层 (Controller) - `controllers.py`
*   **职责**：逻辑调度与中转。
*   **原理**：作为 Model 和 View 的桥梁。当用户在 View 点击“取款”时，Controller 获取输入并交给 Model 处理，处理完后，Controller 指令 View 弹出成功提示或报错信息。

---

## 二、 私有配置信息 (Data Config)

*   **初始账号**：`123456`
*   **初始密码**：`123456`
*   **初始余额**：`10000.00` 元
*   **持久化文件**：`data.json` (程序运行后自动创建并更新)

---

## 三、 业务逻辑规则限制

1.  **取款限制**：金额必须是 100 的整数倍；单次取款不得超过 5000 元；账户不可透支。
2.  **存款限制**：金额不可为负数。
3.  **修改密码**：
    *   旧密码必须验证通过。
    *   新密码长度需 $\ge 6$ 位。
    *   新密码不能是 6 位完全相同的字符（如 `111111`）。
    *   两次输入的新密码必须完全一致。

---

## 四、 如何运行

### 1. 环境准备
*   确保安装了 Python 3.6+。
*   在 Linux 系统上，若缺失 Tkinter，请运行：`sudo apt-get install python3-tk`。

### 2. 运行步骤
1.  **创建并激活虚拟环境**：
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # Linux/Mac
    # Windows: venv\Scripts\activate
    ```
2.  **启动程序**：
    ```bash
    python3 main.py
    ```

> **注意**：由于本项目是 GUI 程序，必须在拥有桌面环境（Windows/macOS/Linux Desktop）的机器上运行。在纯命令行（如 SSH 远程服务器）中运行会报 `TclError: no display name` 错误。

---

## 五、 版本锁定与依赖
*   **Python Runtime**: 见 `runtime.txt`
*   **Dependencies**: 见 `requirements.txt` (零第三方依赖)
