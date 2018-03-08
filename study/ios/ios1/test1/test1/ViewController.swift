//
//  ViewController.swift
//  test1
//
//  Created by tao on 2017/12/18.
//  Copyright © 2017年 tao. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.red;
        // Do any additional setup after loading the view, typically from a nib.
//        let redView = UIView()
//
//        redView.frame = CGRect(x: 10, y: 20,
//                               width: UIScreen.main.bounds.width / 2,
//                               height: UIScreen.main.bounds.height / 2)
        let redView = UIView(frame: CGRect(x: 0, y: 20,
                                           width: UIScreen.main.bounds.width / 2,
                                           height: UIScreen.main.bounds.height / 2))

        //三.将视图添加到界面上
        
        //四.设置背景颜色
        //视图的背景颜色默认是透明色
        //颜色的创建方式:
        //1.通过类型方法创建指定颜色
        //
        redView.backgroundColor = UIColor(red: 0.5, green: 0.8, blue: 0, alpha: 0.6)
//        redView.transform = CGAffineTransformMakeScale(0.5, 0.5)
//        redView.transform = CGAffineTransform(scaleX: 0.5, y: 0.5)
//        redView.transform = CGAffineTransform(rotationAngle: CGFloat(Double.pi/4))
        redView.transform = CGAffineTransform(scaleX: 0.5, y: 0.5).rotated(by: CGFloat(Double.pi / 3))
        
        let rotate = CGAffineTransform(rotationAngle: 0.2)
        //平移形变
        let transLation = CGAffineTransform(translationX: 100, y: 100)
        //将旋转形变和平移形变组合
        redView.transform = rotate.concatenating(transLation)
        
        self.view.addSubview(redView)
        
        print(redView.center)
        print(redView.frame)
        print(redView.bounds)
        
        //通过三原色来创建颜色
        //CGFloat就是UI中的浮点型
        //参数1,2,3:红,绿,蓝的值(0~1)-(0/255~255/255)
        //参数4:透明度
        
        //redView.backgroundColor = UIColor(red: 149/255.0, green: 106/255.0, blue: 55/255.0, alpha: 1)
        //设置不同程度的灰色
        //redView.backgroundColor = UIColor(white: 0.2, alpha: 1)
        
        //练习:创建一个黄色的矩形,显示在红色视图的中心位置,大小(50,50)
        //方式1:
        //创建视图对象并且设置frame属性
        /*
         let yellowView = UIView.init()
         yellowView.frame = CGRectMake(35, 35, 50, 50)
         //添加到界面上
         self.view.addSubview(yellowView)
         //设置背景颜色
         yellowView.backgroundColor = UIColor.yellowColor()
         */
        
        //方式2:
//        let yellowView = UIView(frame: CGRect(25,25,50,50))
//        redView.addSubview(yellowView)
//        yellowView.backgroundColor = UIColor.yellow
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

