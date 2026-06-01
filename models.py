import json
import os
import time
from datetime import datetime

LOCKOUT_MINUTES = 3
LOCKOUT_ATTEMPTS = 3


class ATMModel:
    """
    模型层 (Model): 多账户 ATM 核心业务逻辑。
    支持多用户、转账、交易记录、登录锁定。
    所有返回消息为中文，由 Controller/View 负责展示。
    """
    def __init__(self, data_file="data.json"):
        self.data_file = data_file
        self.initial_data = {
            "users": [
                {
                    "account": "123456",
                    "password": "123456",
                    "balance": 10000.0,
                    "failed_attempts": 0,
                    "locked_until": None
                }
            ],
            "transactions": [],
            "next_account": 123457
        }
        self.data = self._load_data()
        self.current_account = None

    # ---- Persistence ----

    def _load_data(self):
        if not os.path.exists(self.data_file):
            self._save_to_disk(self.initial_data)
            return dict(self.initial_data)
        try:
            with open(self.data_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            # Migrate old single-user format
            if "account" in data:
                new_data = {
                    "users": [{
                        "account": data["account"],
                        "password": data["password"],
                        "balance": data["balance"],
                        "failed_attempts": 0,
                        "locked_until": None
                    }],
                    "transactions": [],
                    "next_account": 123457
                }
                self._save_to_disk(new_data)
                return new_data
            if "users" not in data:
                data["users"] = []
            if "transactions" not in data:
                data["transactions"] = []
            if "next_account" not in data:
                data["next_account"] = 123457
            return data
        except (json.JSONDecodeError, IOError):
            return dict(self.initial_data)

    def _save_to_disk(self, data=None):
        if data is None:
            data = self.data
        with open(self.data_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)

    # ---- Helpers ----

    def _find_user(self, account):
        for u in self.data["users"]:
            if u["account"] == account:
                return u
        return None

    def _get_current_user(self):
        if not self.current_account:
            return None
        return self._find_user(self.current_account)

    # ---- Login / Lockout ----

    def check_login(self, account, password):
        user = self._find_user(account)
        if not user:
            return False, "账号或密码不正确"

        # Check lockout
        if user.get("locked_until"):
            remaining = user["locked_until"] - time.time()
            if remaining > 0:
                mins = int(remaining // 60) + 1
                return False, ("locked", mins)
            else:
                user["locked_until"] = None
                user["failed_attempts"] = 0
                self._save_to_disk()

        if password == user["password"]:
            user["failed_attempts"] = 0
            self.current_account = account
            self._save_to_disk()
            return True, ""
        else:
            user["failed_attempts"] = user.get("failed_attempts", 0) + 1
            if user["failed_attempts"] >= LOCKOUT_ATTEMPTS:
                user["locked_until"] = time.time() + LOCKOUT_MINUTES * 60
                self._save_to_disk()
                return False, ("locked", LOCKOUT_MINUTES)
            self._save_to_disk()
            return False, "账号或密码不正确"

    def logout(self):
        self.current_account = None

    # ---- Registration ----

    def register(self, account, password):
        if not account or len(account) < 4:
            return False, "账号至少需要4位"
        if not account.isalnum():
            return False, "账号只能包含数字和字母"
        if self._find_user(account):
            return False, "账号已存在"
        if len(password) < 6:
            return False, "密码至少需要6位"

        new_user = {
            "account": account,
            "password": password,
            "balance": 0.0,
            "failed_attempts": 0,
            "locked_until": None
        }
        self.data["users"].append(new_user)
        self._save_to_disk()
        return True, account

    # ---- Balance ----

    def get_balance(self):
        user = self._get_current_user()
        return user["balance"] if user else 0.0

    # ---- Deposit ----

    def deposit(self, amount):
        if amount <= 0:
            return False, "存款金额必须大于0"
        user = self._get_current_user()
        if not user:
            return False, "未登录"
        user["balance"] += amount
        self._log_transaction("deposit", amount, user["balance"])
        self._save_to_disk()
        return True, amount

    # ---- Withdraw ----

    def withdraw(self, amount):
        user = self._get_current_user()
        if not user:
            return False, "未登录"
        if amount <= 0:
            return False, "金额无效"
        if amount % 100 != 0:
            return False, "取款金额必须是100的倍数"
        if amount > 5000:
            return False, "单次取款不能超过5000元"
        if amount > user["balance"]:
            return False, "余额不足，不可透支"
        user["balance"] -= amount
        self._log_transaction("withdraw", amount, user["balance"])
        self._save_to_disk()
        return True, amount

    # ---- Transfer ----

    def transfer(self, target_account, amount):
        user = self._get_current_user()
        if not user:
            return False, "未登录"
        if target_account == user["account"]:
            return False, "不能转账给自己"
        if amount <= 0:
            return False, "金额无效"
        if amount % 100 != 0:
            return False, "转账金额必须是100的倍数"
        if amount > 5000:
            return False, "单笔转账不能超过5000元"
        if amount > user["balance"]:
            return False, "余额不足"

        target = self._find_user(target_account)
        if not target:
            return False, "目标账号不存在"

        user["balance"] -= amount
        target["balance"] += amount
        self._log_transaction("transfer_out", amount, user["balance"], target_account)
        self._log_transaction_for(target_account, "transfer_in", amount,
                                  target["balance"], user["account"])
        self._save_to_disk()
        return True, amount

    # ---- Change Password ----

    def change_password(self, old_pwd, new_pwd, confirm_pwd):
        user = self._get_current_user()
        if not user:
            return False, "未登录"
        if old_pwd != user["password"]:
            return False, "旧密码输入错误"
        if new_pwd != confirm_pwd:
            return False, "两次输入的新密码不一致"
        if len(new_pwd) < 6:
            return False, "新密码长度至少需要6位"
        if len(set(new_pwd)) == 1:
            return False, "新密码不能是完全相同的字符"
        user["password"] = new_pwd
        self._save_to_disk()
        return True, ""

    # ---- Transaction History ----

    def _log_transaction(self, tx_type, amount, balance_after, target=None):
        self.data["transactions"].append({
            "account": self.current_account,
            "type": tx_type,
            "amount": amount,
            "target": target,
            "balance_after": balance_after,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })

    def _log_transaction_for(self, account, tx_type, amount, balance_after, source=None):
        self.data["transactions"].append({
            "account": account,
            "type": tx_type,
            "amount": amount,
            "target": source,
            "balance_after": balance_after,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })

    def get_transactions(self, limit=50):
        if not self.current_account:
            return []
        txns = [t for t in self.data["transactions"]
                if t["account"] == self.current_account]
        return sorted(txns, key=lambda t: t["timestamp"], reverse=True)[:limit]
