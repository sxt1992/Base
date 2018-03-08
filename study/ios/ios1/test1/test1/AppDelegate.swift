//
//  AppDelegate.swift
//  test1
//
//  Created by tao on 2017/12/18.
//  Copyright © 2017年 tao. All rights reserved.
//

import UIKit
//import ViewController

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?


    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        print("程序启动成功")
//        self.window
        //1.创建UIWindow对象
        //self.window = UIWindow.init()
        
        //frame是UIView中的属性,确定视图显示在屏幕上的位置和大小
        //UIScreen.main 拿到手机屏幕
//        
        self.window = UIWindow(frame: UIScreen.main.bounds)
//
//        //2.设置根视图控制器
        self.window?.rootViewController = ViewController()
        self.window?.makeKeyAndVisible();
//
//        //3.设置背景颜色
//        self.window?.backgroundColor = UIColor.yellow
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
        print("将要成为非活跃状态")
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
        print("进入后台")
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
        print("将要进入前台")
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
        print("已经变成活跃状态")
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
        print("应用程序将要终止")
    }


}

