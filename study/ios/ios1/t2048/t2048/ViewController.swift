import UIKit

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad();
        let btn = UIButton.init(type: UIButtonType.system);
        btn.frame = CGRect(x: 10,y: 300,width: 100,height:100);
        btn.setTitle("Start Game", for: UIControlState.normal);
        btn.setTitleColor(UIColor(red: 0.34, green: 0.34, blue: 0.76, alpha: 1), for: UIControlState.normal);
        btn.sizeToFit();
        var frame = btn.frame;
        frame.origin.x = (UIScreen.main.bounds.width - frame.width) / 2;
        frame.origin.y = (UIScreen.main.bounds.height - frame.height) / 2;
        btn.frame = frame;
        btn.addTarget(self, action: #selector(self.startGame), for: UIControlEvents.touchUpInside)
        
        self.view.addSubview(btn);
    }
    
    @objc private func startGame() {
        let twoVC = Two();
        self.present(twoVC, animated: true, completion: nil);
//        self.navigationController?.pushViewController(twoVC, animated: true);
        
    }
    
    override func viewDidAppear(_ animated: Bool) {
        self.startGame();
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
}

