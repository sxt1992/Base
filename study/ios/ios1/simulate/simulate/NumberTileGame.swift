//
//  NumberTileGame.swift
//  simulate
//
//  Created by tao on 2017/12/27.
//  Copyright © 2017年 tao. All rights reserved.
//

import UIKit

class NumberTileGameViewController: UIViewController, GameModelProtocol {

    var dimension: Int
    var threshold: Int
    
    var board: GameboardView?
    var model: GameModel?
    var scoreView: ScoreViewProtocol?
    
    let boardWidth: CGFloat = 230.0
    
    init(dimension d: Int, threshold t: Int){
        dimension = d > 2 ? d : 2;
        threshold = t > 8 ? t : 8;
        super.init(nibName: nil, bundle: nil);
        model = GameModel(dimension: dimension, threshold: threshold, delegate: self);
        view.backgroundColor = UIColor.white;
        setupSwipeControls();
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    override func viewDidLoad() {
        super.viewDidLoad();
        setupGame();
    }
    // 游戏滑动事件
    func setupSwipeControls() {}
    // 初始化游戏
    func setupGame() {
        let viewWidth = view.bounds.size.width;
        let viewHeight = view.bounds.size.height;
        
        // 初始化分数榜
        let scoreView = ScoreView(
            bgCor: UIColor.black,
            Cor: UIColor.white,
            font: UIFont.systemFont(ofSize: 16.0),
            radius: 6
        );
        scoreView.score = 0;
        
        var f = scoreView.frame;
        f.origin.x = (viewWidth - 140) / 2;
        f.origin.y = (viewHeight - 320) / 2;
        
        scoreView.frame = f;
        view.addSubview(scoreView);
        
        // 初始化游戏盘
        let gameboard = GameboardView(
            dimension: dimension,
            tileWidth: 50,
            tilePadding: 6,
            cornerRadius: 6,
            bgCor: UIColor.black,
            foreCor: UIColor.darkGray
        );
        
        f = gameboard.frame;
        
        f.origin.x = viewWidth / 2 - 115;
        f.origin.y = viewHeight / 2 - 110;
        
        gameboard.frame = f;
        view.addSubview(gameboard);
        
        self.scoreView = scoreView;
        board = gameboard;
        
        assert(model != nil)
        
        let m = model!;
        m.insertTileAtRandomLocation(withValue: 2);
        m.insertTileAtRandomLocation(withValue: 2);
    }
    
    // protocol
    func scoreChanged(to Score: Int) {
    }
    
    func moveOneTile(from: (Int, Int), to: (Int, Int), value: Int) {
    }
    
    func moveTwoTiles(from: ((Int, Int), (Int, Int)), to: (Int, Int), value: Int) {
    }
    
    func insertTile(at location: (Int, Int), withValue value: Int) {
        assert(board != nil);
        let b = board!;
        b.insertTile(at: location, value: value);
    }
}
