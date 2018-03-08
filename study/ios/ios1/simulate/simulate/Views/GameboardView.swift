//
//  GameboardView.swift
//  simulate
//
//  Created by tao on 2017/12/27.
//  Copyright © 2017年 tao. All rights reserved.
//

import UIKit

class GameboardView: UIView {
    var dimension: Int;
    var tileWidth: CGFloat;
    var tilePadding: CGFloat;
    var cornerRadius: CGFloat;
    let provider = AppearanceProvider();
    
    init(dimension d: Int, tileWidth width: CGFloat, tilePadding padding: CGFloat, cornerRadius radius: CGFloat, bgCor: UIColor, foreCor: UIColor) {
        dimension = d;
        tileWidth = width;
        tilePadding = padding;
        cornerRadius = radius;

        let sideLength = padding + CGFloat(dimension)*(width + padding);
        super.init(frame: CGRect(x: 0, y: 0, width: sideLength, height: sideLength));
        layer.cornerRadius = radius;

        setBg(bgCor: bgCor, tileCor: foreCor);
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    func setBg(bgCor: UIColor, tileCor: UIColor){
        backgroundColor = bgCor;
        
        var x: CGFloat = tilePadding;
        var y: CGFloat;
        let bgRadius = (cornerRadius >= 2) ? cornerRadius - 2 : 0;
        
        for _ in 0..<dimension {
            y = tilePadding;
            for _ in 0..<dimension {
                let tileBg = UIView(frame: CGRect(x: x, y: y, width: tileWidth, height: tileWidth));
                tileBg.backgroundColor = tileCor;
                tileBg.layer.cornerRadius = bgRadius;
                addSubview(tileBg);
                y += tilePadding + tileWidth;
            }
            x += tilePadding + tileWidth;
        }
    }
    
    func positionIsValid(_ pos: (Int, Int)) -> Bool{
        let (x, y) = pos;
        return x > -1 && y > -1 && x < dimension && y < dimension;
    }
    func insertTile(at pos: (Int, Int), value: Int) {
        assert(positionIsValid(pos));
        let (row, col) = pos;
        let x = tilePadding + CGFloat(col) * (tilePadding + tileWidth);
        let y = tilePadding + CGFloat(row) * (tilePadding + tileWidth);
        let r = (cornerRadius >= 2) ? cornerRadius - 2 : 0;
        let tile = TileView(tileFrame: CGRect(x: x,y: y, width: tileWidth, height: tileWidth), numFrame: CGRect(x: 0,y: 0, width: tileWidth, height: tileWidth), value: value, radius: r, delegate: provider);
        addSubview(tile);
    }
}



