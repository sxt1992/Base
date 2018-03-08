//
//  AppearanceProvider.swift
//  simulate
//
//  Created by tao on 2017/12/27.
//  Copyright © 2017年 tao. All rights reserved.
//

import UIKit

protocol AppearanceProviderProtocol:class {
    func tileColor(_ num: Int) -> UIColor
    func numberColor(_ num: Int) -> UIColor
    func fontForNumbers() -> UIFont
}
class AppearanceProvider: AppearanceProviderProtocol{

    func tileColor(_ num: Int) -> UIColor {
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
        return UIColor(red: c[0]/255, green: c[1]/255, blue: c[2]/255, alpha: 1);
    }

    func numberColor(_ num: Int) -> UIColor {
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

    func fontForNumbers() -> UIFont {
        if let font = UIFont(name: "HelveticaNeue-Bold", size: 20) {
            return font
        }
        return UIFont.systemFont(ofSize: 20)
    }
}
