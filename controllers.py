from views import LoginFrame, MenuFrame, BalanceFrame, ActionFrame, ChangePwdFrame

class ATMController:
    """
    控制层 (Controller): 处理用户交互，调用模型更新，控制视图切换。
    """
    def __init__(self, model, view):
        self.model = model
        self.view = view
        # 初始显示登录界面
        self.view.switch_frame(LoginFrame, self)

    def login(self, acc, pwd):
        """处理登录逻辑"""
        if self.model.check_login(acc, pwd):
            self.show_menu()
        else:
            self.view.show_message("错误", "账号或密码不正确", is_error=True)

    def logout(self):
        """退出登录"""
        self.view.switch_frame(LoginFrame, self)

    def show_menu(self):
        """返回主菜单"""
        self.view.switch_frame(MenuFrame, self)

    def show_balance(self):
        """显示余额"""
        balance = self.model.get_balance()
        self.view.switch_frame(BalanceFrame, balance, self.show_menu)

    def show_deposit(self):
        """显示存款界面"""
        self.view.switch_frame(ActionFrame, "存款业务", "请输入存款金额:", 
                               self.handle_deposit, self.show_menu)

    def handle_deposit(self, amount_str):
        """处理存款逻辑"""
        try:
            amount = float(amount_str)
            success, msg = self.model.deposit(amount)
            if success:
                self.view.show_message("成功", msg)
                self.show_menu()
            else:
                self.view.show_message("错误", msg, is_error=True)
        except ValueError:
            self.view.show_message("错误", "请输入有效的数字金额", is_error=True)

    def show_withdraw(self):
        """显示取款界面"""
        self.view.switch_frame(ActionFrame, "取款业务", "请输入取款金额 (100的倍数):", 
                               self.handle_withdraw, self.show_menu)

    def handle_withdraw(self, amount_str):
        """处理取款逻辑"""
        try:
            # 规则要求100倍数，通常输入应为整数
            amount = int(float(amount_str))
            success, msg = self.model.withdraw(amount)
            if success:
                self.view.show_message("成功", msg)
                self.show_menu()
            else:
                self.view.show_message("错误", msg, is_error=True)
        except ValueError:
            self.view.show_message("错误", "请输入有效的数字金额", is_error=True)

    def show_change_pwd(self):
        """显示修改密码界面"""
        self.view.switch_frame(ChangePwdFrame, self.handle_change_pwd, self.show_menu)

    def handle_change_pwd(self, old, new, confirm):
        """处理修改密码逻辑"""
        success, msg = self.model.change_password(old, new, confirm)
        if success:
            self.view.show_message("成功", msg)
            self.logout() # 成功后强制重新登录
        else:
            self.view.show_message("错误", msg, is_error=True)
