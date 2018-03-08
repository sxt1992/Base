//
//  TileView.swift
//  simulate
//
//  Created by tao on 2018/1/5.
//  Copyright © 2018年 tao. All rights reserved.
//

import UIKit

class TileView: UIView {
    var value : Int = 0 {
        didSet {
            backgroundColor = delegate.tileColor(value)
            numberLabel.textColor = delegate.numberColor(value)
            numberLabel.text = "\(value)"
        }
    }
    
    unowned let delegate: AppearanceProviderProtocol;
    let numberLabel: UILabel;

    init(tileFrame: CGRect, numFrame: CGRect, value: Int, radius: CGFloat, delegate d: AppearanceProviderProtocol) {
        delegate = d;
        numberLabel = UILabel(frame: numFrame);
        numberLabel.textAlignment = NSTextAlignment.center;
        numberLabel.minimumScaleFactor = 0.5
        numberLabel.font = delegate.fontForNumbers();
        
        super.init(frame: tileFrame);
        addSubview(numberLabel);
        layer.cornerRadius = radius;
        
        self.value = value;
        let a = delegate.tileColor(value);
        let b = delegate.numberColor(value);
        backgroundColor = a;
        numberLabel.textColor = b;
        numberLabel.text = "\(value)";
    }
    
    required init(coder: NSCoder) {
        fatalError("NSCoding not supported")
    }
}
