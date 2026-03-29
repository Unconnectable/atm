from models import ATMModel
from views import ATMView
from controllers import ATMController

def main():
    """
    主程序入口点：初始化 MVC 三层并启动程序。
    """
    # 1. 实例化模型 (数据层)
    model = ATMModel()
    
    # 2. 实例化视图 (界面层)
    view = ATMView()
    
    # 3. 实例化控制器 (逻辑层)，并注入模型和视图
    controller = ATMController(model, view)
    
    # 4. 开启主循环
    view.mainloop()

if __name__ == "__main__":
    main()
