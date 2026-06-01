import tkinter as tk
from tkinter import messagebox, scrolledtext
from lang import tr

class ATMView(tk.Tk):
    """视图层 (View): Tkinter GUI, dynamically updates language via controller."""
    def __init__(self, controller=None):
        super().__init__()
        self.controller = controller
        self.title(tr('app_title'))
        self.geometry("520x500")
        self.resizable(False, False)

        self.main_container = tk.Frame(self)
        self.main_container.pack(fill="both", expand=True)

        self.current_frame = None

    def update_title(self):
        self.title(tr('app_title'))

    def switch_frame(self, frame_class, *args, **kwargs):
        new_frame = frame_class(self.main_container, self.controller, *args, **kwargs)
        if self.current_frame is not None:
            self.current_frame.destroy()
        self.current_frame = new_frame
        self.current_frame.pack(fill="both", expand=True)

    def show_message(self, title_key, message, is_error=False):
        if is_error:
            messagebox.showerror(tr('error'), message)
        else:
            messagebox.showinfo(tr('success'), message)

    def refresh_current(self):
        """Re-render the current frame (for language switch)."""
        if hasattr(self, '_current_frame_class') and hasattr(self, '_current_frame_args'):
            self.switch_frame(self._current_frame_class, *self._current_frame_args)

    def switch_frame(self, frame_class, *args, **kwargs):
        self._current_frame_class = frame_class
        self._current_frame_args = args
        new_frame = frame_class(self.main_container, self.controller, *args, **kwargs)
        if self.current_frame is not None:
            self.current_frame.destroy()
        self.current_frame = new_frame
        self.current_frame.pack(fill="both", expand=True)


class LoginFrame(tk.Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller
        self._build()

    def _build(self):
        for w in self.winfo_children():
            w.destroy()
        tk.Label(self, text=tr('login_title'), font=("微软雅黑", 16, "bold")).pack(pady=25)

        tk.Label(self, text=tr('account')).pack()
        self.acc_entry = tk.Entry(self)
        self.acc_entry.pack(pady=5)
        self.acc_entry.insert(0, "123456")

        tk.Label(self, text=tr('password')).pack()
        self.pwd_entry = tk.Entry(self, show="*")
        self.pwd_entry.pack(pady=5)
        self.pwd_entry.insert(0, "123456")

        self.lock_msg = tk.Label(self, text="", fg="red", font=("微软雅黑", 10))
        self.lock_msg.pack(pady=2)

        tk.Button(self, text=tr('login_btn'), width=15, bg="#4CAF50", fg="white",
                  command=lambda: self.controller.login(self.acc_entry.get(), self.pwd_entry.get())
                 ).pack(pady=15)

        tk.Button(self, text=tr('register_link'), width=15,
                  command=self.controller.show_register).pack(pady=2)

    def rebuild(self):
        self._build()

    def show_lock_msg(self, msg):
        self.lock_msg.config(text=msg)


class RegisterFrame(tk.Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller
        self._build()

    def _build(self):
        for w in self.winfo_children():
            w.destroy()
        tk.Label(self, text=tr('register_title'), font=("微软雅黑", 16, "bold")).pack(pady=20)

        tk.Label(self, text=tr('reg_account')).pack()
        self.acc_entry = tk.Entry(self)
        self.acc_entry.pack(pady=5)

        tk.Label(self, text=tr('reg_password')).pack()
        self.pwd_entry = tk.Entry(self, show="*")
        self.pwd_entry.pack(pady=5)

        tk.Label(self, text=tr('reg_confirm')).pack()
        self.confirm_entry = tk.Entry(self, show="*")
        self.confirm_entry.pack(pady=5)

        self.msg_label = tk.Label(self, text="", fg="red", font=("微软雅黑", 10))
        self.msg_label.pack(pady=2)

        tk.Button(self, text=tr('reg_btn'), width=15, bg="#2196F3", fg="white",
                  command=lambda: self.controller.handle_register(
                      self.acc_entry.get(), self.pwd_entry.get(), self.confirm_entry.get())
                 ).pack(pady=10)
        tk.Button(self, text=tr('reg_back'), width=15,
                  command=self.controller.logout).pack()

    def show_msg(self, msg, is_error=True):
        self.msg_label.config(text=msg, fg="red" if is_error else "green")


class MenuFrame(tk.Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller
        self._build()

    def _build(self):
        for w in self.winfo_children():
            w.destroy()

        # Welcome header
        hdr = tk.Frame(self)
        hdr.pack(fill="x", pady=(20, 5), padx=30)
        tk.Label(hdr, text=tr('menu_title'), font=("微软雅黑", 14)).pack()

        acc = self.controller.model.current_account or ""
        tk.Label(hdr, text=tr('welcome_back', acc), font=("微软雅黑", 10),
                 fg="gray").pack()

        # Account info
        if self.controller.model.current_account:
            user = self.controller.model._get_current_user()
            if user:
                info = tk.Label(self, text="%s: %s │ %s: ¥%.2f" %
                                (tr('account').rstrip(':'), user["account"],
                                 tr('balance_title'), user["balance"]),
                                font=("微软雅黑", 9), fg="#555")
                info.pack(pady=(5, 10))

        # Menu buttons
        buttons = [
            (tr('menu_balance'), self.controller.show_balance),
            (tr('menu_deposit'), self.controller.show_deposit),
            (tr('menu_withdraw'), self.controller.show_withdraw),
            (tr('menu_transfer'), self.controller.show_transfer),
            (tr('menu_history'), self.controller.show_history),
            (tr('menu_changepwd'), self.controller.show_change_pwd),
        ]
        btn_frame = tk.Frame(self)
        btn_frame.pack()
        for i, (txt, cmd) in enumerate(buttons):
            row = i // 2
            col = i % 2
            btn = tk.Button(btn_frame, text=txt, width=18, pady=4, command=cmd)
            btn.grid(row=row, column=col, padx=5, pady=4)

        # Bottom row: language + logout
        bottom = tk.Frame(self)
        bottom.pack(pady=15)
        tk.Button(bottom, text=tr('menu_lang'), width=10,
                  command=self.controller.toggle_language).pack(side="left", padx=5)
        tk.Button(bottom, text=tr('menu_logout'), width=10,
                  command=self.controller.logout).pack(side="left", padx=5)


class BalanceFrame(tk.Frame):
    def __init__(self, parent, controller, balance):
        super().__init__(parent)
        self.controller = controller
        tk.Label(self, text=tr('balance_title'), font=("微软雅黑", 14)).pack(pady=25)
        tk.Label(self, text=f"¥ {balance:.2f}", font=("Consolas", 24, "bold"),
                 fg="blue").pack(pady=25)
        tk.Button(self, text=tr('balance_back'), command=controller.show_menu).pack(pady=20)


class ActionFrame(tk.Frame):
    def __init__(self, parent, controller, title_key, label_key, submit_fn, back_fn):
        super().__init__(parent)
        self.controller = controller
        tk.Label(self, text=tr(title_key), font=("微软雅黑", 14)).pack(pady=20)
        tk.Label(self, text=tr(label_key)).pack()
        self.entry = tk.Entry(self, font=("Arial", 14))
        self.entry.pack(pady=10)
        self.msg_label = tk.Label(self, text="", fg="red", font=("微软雅黑", 10))
        self.msg_label.pack()
        tk.Button(self, text=tr('deposit_submit' if 'deposit' in title_key else 'withdraw_submit'),
                  width=15, bg="#2196F3", fg="white",
                  command=lambda: submit_fn(self.entry.get())).pack(pady=8)
        tk.Button(self, text=tr('deposit_back' if 'deposit' in title_key else 'withdraw_back'),
                  width=15, command=back_fn).pack()

    def show_msg(self, msg, is_error=True):
        self.msg_label.config(text=msg, fg="red" if is_error else "green")


class TransferFrame(tk.Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller
        self._build()

    def _build(self):
        tk.Label(self, text=tr('transfer_title'), font=("微软雅黑", 14)).pack(pady=20)
        tk.Label(self, text=tr('transfer_target')).pack()
        self.target_entry = tk.Entry(self)
        self.target_entry.pack(pady=5)
        tk.Label(self, text=tr('transfer_amount')).pack()
        self.amount_entry = tk.Entry(self, font=("Arial", 14))
        self.amount_entry.pack(pady=5)
        self.msg_label = tk.Label(self, text="", fg="red", font=("微软雅黑", 10))
        self.msg_label.pack()
        tk.Button(self, text=tr('transfer_submit'), width=15, bg="#FF9800", fg="white",
                  command=lambda: self.controller.handle_transfer(
                      self.target_entry.get(), self.amount_entry.get())
                 ).pack(pady=8)
        tk.Button(self, text=tr('transfer_back'), width=15,
                  command=self.controller.show_menu).pack()

    def show_msg(self, msg, is_error=True):
        self.msg_label.config(text=msg, fg="red" if is_error else "green")


class HistoryFrame(tk.Frame):
    def __init__(self, parent, controller, transactions):
        super().__init__(parent)
        self.controller = controller
        tk.Label(self, text=tr('history_title'), font=("微软雅黑", 14)).pack(pady=15)

        if not transactions:
            tk.Label(self, text=tr('history_empty'), fg="gray").pack(pady=30)
        else:
            # Header
            hdr_text = tr('history_header',
                          tr('history_time'), tr('history_type'),
                          tr('history_amount'), tr('history_balance'))
            tk.Label(self, text=hdr_text, font=("微软雅黑", 9, "bold"),
                     fg="#555").pack()

            text_area = scrolledtext.ScrolledText(self, height=14, width=60,
                                                  font=("Consolas", 9))
            text_area.pack(padx=10, pady=5, fill="both", expand=True)
            text_area.config(state="normal")
            for t in transactions:
                tx_type = tr('type_' + t["type"]) if t["type"] in ('deposit', 'withdraw', 'transfer_out', 'transfer_in') else t["type"]
                amt = f"+{t['amount']:.0f}" if t["type"] in ('deposit', 'transfer_in') else f"-{t['amount']:.0f}"
                line = f"{t['timestamp']}  {tx_type:>8s}  {amt:>10s}  ¥{t['balance_after']:.2f}"
                if t.get("target"):
                    line += f"  → {t['target']}"
                text_area.insert("end", line + "\n")
            text_area.config(state="disabled")

        tk.Button(self, text=tr('history_back'), command=controller.show_menu).pack(pady=10)


class ChangePwdFrame(tk.Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller
        tk.Label(self, text=tr('changepwd_title'), font=("微软雅黑", 14)).pack(pady=15)

        tk.Label(self, text=tr('changepwd_old')).pack()
        self.old_entry = tk.Entry(self, show="*")
        self.old_entry.pack()

        tk.Label(self, text=tr('changepwd_new')).pack()
        self.new_entry = tk.Entry(self, show="*")
        self.new_entry.pack()

        tk.Label(self, text=tr('changepwd_confirm')).pack()
        self.confirm_entry = tk.Entry(self, show="*")
        self.confirm_entry.pack()

        self.msg_label = tk.Label(self, text="", fg="red", font=("微软雅黑", 10))
        self.msg_label.pack()

        tk.Button(self, text=tr('changepwd_submit'), width=15, bg="#FF9800", fg="white",
                  command=lambda: controller.handle_change_pwd(
                      self.old_entry.get(), self.new_entry.get(), self.confirm_entry.get())
                 ).pack(pady=10)
        tk.Button(self, text=tr('changepwd_back'), width=15,
                  command=controller.show_menu).pack()

    def show_msg(self, msg, is_error=True):
        self.msg_label.config(text=msg, fg="red" if is_error else "green")
