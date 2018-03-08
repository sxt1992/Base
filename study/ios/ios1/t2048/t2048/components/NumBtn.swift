//
//  NumBtn.swift
//  t2048
//
//  Created by tao on 2017/12/21.
//  Copyright © 2017年 tao. All rights reserved.
//

import UIKit

func num2BgCor(_ num: Int) -> UIColor {
    var c:[CGFloat];
    switch num {
        case 2:
            c = [238,228,218]
        case 4:
            c = [237,224,200]
        case 8:
            c = [242,177,121]
        case 16:
            c = [245,149,99]
        case 32:
            c = [246,124,95]
        case 64:
            c = [246,94,59]
        case 128, 256:
            c = [0,187,2]
        case 512:
            c = [109,51,102]
        case 1024, 2048:
            c = [237,207,114]
        case 4096, 8192, 16384:
            c = [64,197,143]
        default:
            c = [255,255,255]
    }
    return UIColor(red: c[0]/255, green: c[1]/255, blue: c[2]/255, alpha: 1)
}

func num2Cor(_ num: Int) -> UIColor {
    switch num {
        case 2, 4:
            return UIColor(red: 119/255, green: 110/255, blue: 101/255, alpha: 1)
        default:
            if num > 16384 {
                return UIColor.black
            } else {
                return UIColor.white
            }
    }
}

func num2Fs(_ num: Int) -> CGFloat {
    var fontSize:CGFloat = 24;
    if num > 8192 {
        fontSize = 15;
    } else if num > 4096 {
        fontSize = 16;
    } else if num > 2048 {
        fontSize = 17;
    } else if num > 1024 {
        fontSize = 18;
    } else if num > 512 {
        fontSize = 19;
    }
    return fontSize;
}

class NumBtn: UIView {
    var num: Int;

    init(_ r: Int,_ c: Int,_ num: Int){
        self.num = num;
        super.init(frame: CGRect(x: 6 + c * 56, y: 6 + r * 56, width: 50, height: 50));
        layer.cornerRadius = 4;
        self.clipsToBounds = true;
    }
    
    required init(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented");
    }
    
    override func layoutSubviews() {
        super.layoutSubviews();
        
        self.backgroundColor = UIColor.darkGray;
        
        let frame = self.bounds;
        
        let lab = UILabel(frame: frame);
        lab.textAlignment = NSTextAlignment.center;
        if num > 0 {
            lab.text = String(num);
            lab.textColor = num2Cor(num);
            lab.font = UIFont.systemFont(ofSize: num2Fs(num));
            lab.backgroundColor = num2BgCor(num);
        } else {
            lab.backgroundColor = UIColor.darkGray;
        }
        
        self.addSubview(lab);
    }
}
