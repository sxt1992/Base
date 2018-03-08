import UIKit
import React

class ViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let strUrl: String = "http://localhost:8081/index.ios.bundle?platform=ios&dev=true"
        let jsCodeLocation = URL(string: strUrl)
        let rootView = RCTRootView(bundleURL: jsCodeLocation, moduleName: "RNApp", initialProperties: nil, launchOptions: nil)
        view = rootView
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
