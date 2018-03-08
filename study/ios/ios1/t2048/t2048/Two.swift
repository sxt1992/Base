//
//  Two.swift
//  t2048
//
//  Created by tao on 2017/12/21.
//  Copyright © 2017年 tao. All rights reserved.
//

import UIKit

class Two: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.white;
        
        let sB = self.view.bounds;
        
        let score = UILabel(frame: CGRect(x: (sB.width - 140) / 2, y: (sB.height - 320) / 2, width: 140, height: 40));
        score.text = "SCORE: 0";
        score.textColor = UIColor.white;
        score.font = UIFont.systemFont(ofSize: 16, weight: UIFont.Weight.bold);
        score.backgroundColor = UIColor.black;
        score.layer.cornerRadius = 4;
        score.layer.masksToBounds = true;
        score.textAlignment = NSTextAlignment.center;
        
        self.view.addSubview(score);
        
        let gb = GameBoard(frame: CGRect(x:sB.width/2 - 115,y:sB.height/2 - 110,width:230,height:230));

        self.view.addSubview(gb);
        
        
//        let btn = UIButton.init(type: UIButtonType.system);
//        btn.frame = CGRect(x: 10,y: 300,width: 100,height:100);
//        btn.setTitle("Start Game", for: UIControlState.normal);
//        btn.setTitleColor(UIColor(red: 0.34, green: 0.34, blue: 0.76, alpha: 1), for: UIControlState.normal);
//        btn.sizeToFit();
//        var frame = btn.frame;
//        frame.origin.x = (UIScreen.main.bounds.width - frame.width) / 2;
//        frame.origin.y = (UIScreen.main.bounds.height - frame.height) / 2;
//        btn.frame = frame;
//        btn.addTarget(self, action: #selector(self.startGame), for: UIControlEvents.touchUpInside)
//
//        self.view.addSubview(btn);
//
//        let btn2 = NumBtn(frame: CGRect(x:30,y:100,width:180,height:200));
//        btn2.backgroundColor = UIColor.magenta;
//
//        self.view.addSubview(btn2);
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    @objc private func startGame() {
        self.dismiss(animated: true, completion: nil);
    }
}
