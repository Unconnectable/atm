import json
import os

class ATMModel:
    """
    模型层 (Model): 负责处理 ATM 的核心业务逻辑与数据持久化。
    使用 JSON 文件存储用户信息。
    """
    def __init__(self, data_file="data.json"):
        self.data_file = data_file
        # 初始业务规则：账号 123456，密码 123456，余额 10000
        self.initial_data = {
            "account": "123456",
            "password": "123456",
            "balance": 10000.0
        }
        self.user_data = self._load_data()

    def _load_data(self):
        """从本地存储加载数据，若文件不存在则初始化默认值"""
        if not os.path.exists(self.data_file):
            self._save_to_disk(self.initial_data)
            return self.initial_data
        try:
            with open(self.data_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            return self.initial_data

    def _save_to_disk(self, data):
        """将数据写入本地 JSON 文件"""
        with open(self.data_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)

    def check_login(self, account, password):
        """登录验证"""
        return account == self.user_data["account"] and password == self.user_data["password"]

    def get_balance(self):
        """获取余额"""
        return self.user_data["balance"]

    def deposit(self, amount):
        """
        存款业务：不可为负数
        """
        if amount <= 0:
            return False, "存款金额必须大于0"
        
        self.user_data["balance"] += amount
        self._save_to_disk(self.user_data)
        return True, f"存款成功，当前余额: {self.user_data['balance']:.2f}元"

    def withdraw(self, amount):
        """
        取款业务：
        1. 必须是100的倍数
        2. 单次 <= 5000
        3. 不可透支
        """
        if amount <= 0:
            return False, "金额无效"
        if amount % 100 != 0:
            return False, "取款金额必须是100的倍数"
        if amount > 5000:
            return False, "单次取款不能超过5000元"
        if amount > self.user_data["balance"]:
            return False, "余额不足，不可透支"

        self.user_data["balance"] -= amount
        self._save_to_disk(self.user_data)
        return True, f"取款成功，当前余额: {self.user_data['balance']:.2f}元"

    def change_password(self, old_pwd, new_pwd, confirm_pwd):
        """
        修改密码业务：
        1. 旧密码必须正确
        2. 新密码长度 >= 6
        3. 不能是6位完全相同的字符 (如111111)
        4. 两次输入必须一致
        """
        if old_pwd != self.user_data["password"]:
            return False, "旧密码输入错误"
        if new_pwd != confirm_pwd:
            return False, "两次输入的新密码不一致"
        if len(new_pwd) < 6:
            return False, "新密码长度至少需要6位"
        # 检查是否为完全相同字符
        if len(set(new_pwd)) == 1:
            return False, "新密码不能是完全相同的字符"

        self.user_data["password"] = new_pwd
        self._save_to_disk(self.user_data)
        return True, "密码修改成功，请重新登录"
