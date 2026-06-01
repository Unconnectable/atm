from lang import tr, toggle as lang_toggle
from views import (LoginFrame, MenuFrame, BalanceFrame, ActionFrame,
                   TransferFrame, HistoryFrame, ChangePwdFrame, RegisterFrame)

LOCKOUT_MSG = "账户已锁定，请 %d 分钟后重试"

class ATMController:
    def __init__(self, model, view):
        self.model = model
        self.view = view
        view.controller = self  # must be set before switch_frame
        self.view.switch_frame(LoginFrame)

    # ---- Login ----

    def login(self, acc, pwd):
        if not acc or not pwd:
            self.view.show_message("error", tr('err_invalid_input'), is_error=True)
            return
        success, result = self.model.check_login(acc, pwd)
        if success:
            self.show_menu()
        else:
            if isinstance(result, tuple) and result[0] == "locked":
                msg = LOCKOUT_MSG % result[1]
            else:
                msg = result
            self.view.show_message("error", msg, is_error=True)

    def logout(self):
        self.model.logout()
        self.view.switch_frame(LoginFrame)

    def show_menu(self):
        self.view.switch_frame(MenuFrame)

    # ---- Register ----

    def show_register(self):
        self.view.switch_frame(RegisterFrame)

    def handle_register(self, acc, pwd, confirm):
        if pwd != confirm:
            if hasattr(self.view.current_frame, 'show_msg'):
                self.view.current_frame.show_msg("两次输入密码不一致")
            return
        success, result = self.model.register(acc, pwd)
        if success:
            if hasattr(self.view.current_frame, 'show_msg'):
                self.view.current_frame.show_msg("注册成功！账号: %s" % result, is_error=False)
            self.model.current_account = result
            self.view.after(1200, self.show_menu)
        else:
            if hasattr(self.view.current_frame, 'show_msg'):
                self.view.current_frame.show_msg(result)

    # ---- Balance ----

    def show_balance(self):
        balance = self.model.get_balance()
        self.view.switch_frame(BalanceFrame, balance)

    # ---- Deposit ----

    def show_deposit(self):
        self.view.switch_frame(ActionFrame, "deposit_title", "deposit_label",
                               self.handle_deposit, self.show_menu)

    def handle_deposit(self, amount_str):
        try:
            amount = float(amount_str)
            if amount <= 0:
                self._show_error("存款金额必须大于0")
                return
            success, result = self.model.deposit(amount)
            if success:
                bal = self.model.get_balance()
                self.view.show_message("success", tr('deposit_success', bal))
                self.show_menu()
            else:
                self._show_error(result)
        except ValueError:
            self._show_error(tr('err_amount'))

    # ---- Withdraw ----

    def show_withdraw(self):
        self.view.switch_frame(ActionFrame, "withdraw_title", "withdraw_label",
                               self.handle_withdraw, self.show_menu)

    def handle_withdraw(self, amount_str):
        try:
            amount = int(float(amount_str))
            if amount <= 0:
                self._show_error("金额无效")
                return
            success, result = self.model.withdraw(amount)
            if success:
                bal = self.model.get_balance()
                self.view.show_message("success", tr('withdraw_success', bal))
                self.show_menu()
            else:
                self._show_error(result)
        except ValueError:
            self._show_error(tr('err_int_amount'))

    # ---- Transfer ----

    def show_transfer(self):
        self.view.switch_frame(TransferFrame)

    def handle_transfer(self, target, amount_str):
        try:
            amount = int(float(amount_str))
            if amount <= 0:
                self._show_error("金额无效")
                return
            success, result = self.model.transfer(target, amount)
            if success:
                bal = self.model.get_balance()
                self.view.show_message("success", tr('transfer_success', bal))
                self.show_menu()
            else:
                self._show_error(result)
        except ValueError:
            self._show_error(tr('err_int_amount'))

    # ---- History ----

    def show_history(self):
        txns = self.model.get_transactions()
        self.view.switch_frame(HistoryFrame, txns)

    # ---- Change Password ----

    def show_change_pwd(self):
        self.view.switch_frame(ChangePwdFrame)

    def handle_change_pwd(self, old, new, confirm):
        if not old or not new:
            self._show_error("密码不能为空")
            return
        success, result = self.model.change_password(old, new, confirm)
        if success:
            self.view.show_message("success", tr('changepwd_success'))
            self.logout()
        else:
            self._show_error(result)

    # ---- Language ----

    def toggle_language(self):
        lang_toggle()
        self.view.update_title()
        self.view.switch_frame(LoginFrame)

    # ---- Helper ----

    def _show_error(self, msg):
        if hasattr(self.view.current_frame, 'show_msg'):
            self.view.current_frame.show_msg(msg)
