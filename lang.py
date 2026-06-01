_current_lang = 'zh'

STRINGS = {
    'zh': {
        'app_title': '大学生软件工程项目 - ATM柜员机模拟程序',
        'login_title': '欢迎使用ATM模拟系统',
        'account': '账号:',
        'password': '密码:',
        'login_btn': '登录',
        'register_link': '注册新账户',
        'err_login_failed': '账号或密码不正确',
        'err_account_locked': '账户已锁定，请 %d 分钟后重试',
        'err_invalid_input': '请输入账号和密码',

        'register_title': '注册新账户',
        'reg_account': '设置账号:',
        'reg_password': '设置密码:',
        'reg_confirm': '确认密码:',
        'reg_btn': '立即注册',
        'reg_back': '返回登录',
        'reg_success': '注册成功！账号: %s',
        'reg_exists': '账号已存在',
        'reg_pwd_mismatch': '两次密码不一致',
        'reg_pwd_short': '密码至少需要6位',
        'reg_acc_invalid': '账号只能包含数字和字母',
        'reg_acc_short': '账号至少需要4位',

        'menu_title': '请选择服务内容',
        'menu_balance': '查询余额',
        'menu_deposit': '存款业务',
        'menu_withdraw': '取款业务',
        'menu_transfer': '转账业务',
        'menu_history': '交易记录',
        'menu_changepwd': '修改密码',
        'menu_lang': 'English',
        'menu_logout': '退出登录',

        'balance_title': '账户当前余额',
        'balance_back': '返回主菜单',

        'deposit_title': '存款业务',
        'deposit_label': '请输入存款金额:',
        'deposit_submit': '提交',
        'deposit_back': '返回',
        'deposit_success': '存款成功，当前余额: %.2f元',

        'withdraw_title': '取款业务',
        'withdraw_label': '请输入取款金额 (100的倍数):',
        'withdraw_submit': '提交',
        'withdraw_back': '返回',
        'withdraw_success': '取款成功，当前余额: %.2f元',

        'transfer_title': '转账业务',
        'transfer_target': '目标账号:',
        'transfer_amount': '转账金额:',
        'transfer_submit': '确认转账',
        'transfer_back': '返回',
        'transfer_success': '转账成功，当前余额: %.2f元',
        'transfer_self': '不能转账给自己',
        'transfer_not_found': '目标账号不存在',

        'history_title': '交易记录',
        'history_back': '返回主菜单',
        'history_empty': '暂无交易记录',
        'history_header': '%s | %s | %s | %s',
        'history_time': '时间',
        'history_type': '类型',
        'history_amount': '金额',
        'history_balance': '余额',
        'type_deposit': '存款',
        'type_withdraw': '取款',
        'type_transfer_out': '转出',
        'type_transfer_in': '转入',

        'changepwd_title': '安全中心 - 修改密码',
        'changepwd_old': '当前旧密码:',
        'changepwd_new': '输入新密码:',
        'changepwd_confirm': '确认新密码:',
        'changepwd_submit': '确认修改',
        'changepwd_back': '返回',
        'changepwd_success': '密码修改成功，请重新登录',

        'err_amount': '请输入有效的数字金额',
        'err_int_amount': '请输入有效的整数金额',
        'err_pwd_empty': '密码不能为空',
        'success': '成功',
        'error': '错误',
        'welcome_back': '欢迎回来，账号: %s',
    },
    'en': {
        'app_title': 'ATM Simulation System - Software Engineering Project',
        'login_title': 'Welcome to ATM System',
        'account': 'Account:',
        'password': 'Password:',
        'login_btn': 'Login',
        'register_link': 'Register',
        'err_login_failed': 'Invalid account or password',
        'err_account_locked': 'Account locked. Please retry in %d minutes',
        'err_invalid_input': 'Please enter account and password',

        'register_title': 'Register New Account',
        'reg_account': 'Set Account:',
        'reg_password': 'Set Password:',
        'reg_confirm': 'Confirm Password:',
        'reg_btn': 'Register',
        'reg_back': 'Back to Login',
        'reg_success': 'Registration successful! Account: %s',
        'reg_exists': 'Account already exists',
        'reg_pwd_mismatch': 'Passwords do not match',
        'reg_pwd_short': 'Password must be at least 6 characters',
        'reg_acc_invalid': 'Account must contain only letters and numbers',
        'reg_acc_short': 'Account must be at least 4 characters',

        'menu_title': 'Please Select a Service',
        'menu_balance': 'Balance',
        'menu_deposit': 'Deposit',
        'menu_withdraw': 'Withdraw',
        'menu_transfer': 'Transfer',
        'menu_history': 'History',
        'menu_changepwd': 'Change Password',
        'menu_lang': '中文',
        'menu_logout': 'Logout',

        'balance_title': 'Current Balance',
        'balance_back': 'Back to Menu',

        'deposit_title': 'Deposit',
        'deposit_label': 'Enter deposit amount:',
        'deposit_submit': 'Submit',
        'deposit_back': 'Back',
        'deposit_success': 'Deposit successful. Balance: %.2f',

        'withdraw_title': 'Withdraw',
        'withdraw_label': 'Enter withdrawal amount (multiple of 100):',
        'withdraw_submit': 'Submit',
        'withdraw_back': 'Back',
        'withdraw_success': 'Withdrawal successful. Balance: %.2f',

        'transfer_title': 'Transfer',
        'transfer_target': 'Target Account:',
        'transfer_amount': 'Amount:',
        'transfer_submit': 'Confirm Transfer',
        'transfer_back': 'Back',
        'transfer_success': 'Transfer successful. Balance: %.2f',
        'transfer_self': 'Cannot transfer to yourself',
        'transfer_not_found': 'Target account not found',

        'history_title': 'Transaction History',
        'history_back': 'Back to Menu',
        'history_empty': 'No transactions yet',
        'history_header': '%s | %s | %s | %s',
        'history_time': 'Time',
        'history_type': 'Type',
        'history_amount': 'Amount',
        'history_balance': 'Balance',
        'type_deposit': 'Deposit',
        'type_withdraw': 'Withdraw',
        'type_transfer_out': 'Transfer Out',
        'type_transfer_in': 'Transfer In',

        'changepwd_title': 'Security Center - Change Password',
        'changepwd_old': 'Current Password:',
        'changepwd_new': 'New Password:',
        'changepwd_confirm': 'Confirm Password:',
        'changepwd_submit': 'Confirm',
        'changepwd_back': 'Back',
        'changepwd_success': 'Password changed. Please login again',

        'err_amount': 'Please enter a valid amount',
        'err_int_amount': 'Please enter a valid integer amount',
        'err_pwd_empty': 'Password cannot be empty',
        'success': 'Success',
        'error': 'Error',
        'welcome_back': 'Welcome back, Account: %s',
    }
}

def set_lang(lang):
    global _current_lang
    _current_lang = lang

def get_lang():
    return _current_lang

def toggle():
    global _current_lang
    _current_lang = 'en' if _current_lang == 'zh' else 'zh'

def tr(key, *args):
    s = STRINGS.get(_current_lang, {}).get(key, key)
    if args:
        return s % args
    return s
