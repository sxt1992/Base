//
//  ViewController.swift
//  simulate
//
//  Created by tao on 2017/12/27.
//  Copyright © 2017年 tao. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func startGameButtonTapped(_ sender: UIButton) {
        let game = NumberTileGameViewController(dimension: 4, threshold: 32768);
        self.present(game, animated: true, completion: nil)
    }
    
}

