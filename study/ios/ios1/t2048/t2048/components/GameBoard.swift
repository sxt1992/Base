import UIKit

class GameBoard: UIView {
    override init(frame:CGRect){
        super.init(frame: frame);
    }
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented");
    }
    override func layoutSubviews() {
        super.layoutSubviews();
        
        let frame = self.bounds;
        print(frame);

        self.backgroundColor = UIColor.black;
        self.layer.cornerRadius = 4;
        
//        lab.backgroundColor = UIColor.red;
//        lab.layer.masksToBounds = true;
//        lab.layer.cornerRadius = 4;
    
        for r in 0...3 {
            for c in 0...3 {
                let tmp = genNum(r, c, arc4random_uniform(2) < 1 ? 0 : Int(pow(2 as Double,Double(arc4random_uniform(16) + 1))));
                self.addSubview(tmp);
//                var f = tmp.frame;
//                f.origin.x += 10;
//                tmp.frame = f;
            }
        }
    }
    func genNum(_ x: Int,_ y: Int, _ num: Int) -> UIView{
        return NumBtn(x,y,num);
    }
}
