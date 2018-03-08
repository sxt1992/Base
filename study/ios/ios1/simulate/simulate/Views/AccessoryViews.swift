//
//  AccessoryViews.swift
//  simulate
//
//  Created by tao on 2017/12/27.
//  Copyright © 2017年 tao. All rights reserved.
//

import UIKit

protocol ScoreViewProtocol {
    func scoreChanged(to s: Int)
}

class ScoreView: UIView,ScoreViewProtocol{
    
    var score: Int = 0 {
        didSet {
            label.text = "SCORE: \(score)";
        }
    }
    
    let dFrame = CGRect(x: 0, y: 0, width: 140, height: 40);
    var label: UILabel

    init(bgCor: UIColor, Cor: UIColor, font: UIFont, radius: CGFloat){
        label = UILabel(frame: dFrame);
        super.init(frame: dFrame);
        backgroundColor = bgCor;
        label.textAlignment = NSTextAlignment.center;
        label.font = font;
        label.textColor = Cor;
        layer.cornerRadius = radius;
        addSubview(label);
    }
    
    required init(coder aDecoder: NSCoder) {
        fatalError("NSCoding not supported")
    }
    
    func scoreChanged(to s: Int) {
        score = s;
    }
}
