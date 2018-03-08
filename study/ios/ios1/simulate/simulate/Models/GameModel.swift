//
//  GameModel.swift
//  simulate
//
//  Created by tao on 2017/12/27.
//  Copyright © 2017年 tao. All rights reserved.
//

import UIKit

protocol GameModelProtocol: class {
    func scoreChanged(to Score: Int)
    func moveOneTile(from: (Int, Int), to: (Int, Int), value: Int)
    func moveTwoTiles(from: ((Int, Int),(Int, Int)), to: (Int, Int), value: Int)
    func insertTile(at location: (Int, Int), withValue value: Int)
}
class GameModel: NSObject {
    let dimension: Int;
    let threshold: Int;
    
    var gameboard: SquareGameboard<TileObject>
    unowned let delegate : GameModelProtocol;
    
    var queue: [MoveCommand];
    var timer: Timer;
    
    let maxCommands = 100;
    let queueDelay = 0.3;
    
    
    init(dimension d: Int, threshold t: Int, delegate: GameModelProtocol){
        dimension = d;
        threshold = t;
        self.delegate = delegate;
        queue = [MoveCommand]();
        timer = Timer();
        gameboard =  SquareGameboard(dimension: d, initialValue: .empty);
        super.init();
    }
    // ---------------------------------------------------------
    func insertTile(at location: (Int, Int), value: Int) {
        let (x, y) = location;
        if case .empty = gameboard[x, y] {
            gameboard[x, y] = TileObject.tile(value);
            delegate.insertTile(at: location, withValue: value);
        }
    }
    func insertTileAtRandomLocation(withValue value: Int) {
        let openSpots = gameboardEmptySpots();
        if openSpots.isEmpty {
            return;
        }
        let idx = Int(arc4random_uniform(UInt32(openSpots.count)));
        let (x, y) = openSpots[idx];
        insertTile(at: (x, y), value: value);
    }
    func gameboardEmptySpots() -> [(Int, Int)] {
        var buffer: [(Int, Int)] = [];
        for i in 0..<dimension {
            for j in 0..<dimension {
                if case .empty = gameboard[i, j] {
                    buffer += [(i, j)];
                }
            }
        }
        return buffer;
    }
    // -----------------------------------------------------------
}







