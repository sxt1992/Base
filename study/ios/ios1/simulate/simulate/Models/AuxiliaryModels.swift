//
//  AuxiliaryModels.swift
//  simulate
//
//  Created by tao on 2018/1/2.
//  Copyright © 2018年 tao. All rights reserved.
//
import UIKit
import Foundation

enum MoveDirection {
    case up, right, down, left;
}
enum TileObject {
    case empty;
    case tile(Int);
}

struct MoveCommand {
    let direction: MoveDirection;
    let complettion: (Bool) -> ();
}

struct SquareGameboard<T> {
    let dimension: Int;
    var boardArray: [T];
    
    init(dimension d: Int, initialValue: T){
        dimension = d;
        boardArray = [T](repeating: initialValue, count: d * d);
    }
    
    subscript(row: Int, col: Int) -> T {
        get {
            assert(row > -1 && row < dimension)
            assert(col > -1 && col < dimension)
            return boardArray[row * dimension + col];
        }
        set {
            assert(row > -1 && row < dimension)
            assert(col > -1 && col < dimension)
            boardArray[row * dimension + col] = newValue;
        }
    }
}
