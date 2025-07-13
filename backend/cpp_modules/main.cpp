#include <iostream>
#include "curl.hpp"
#include "scan.hpp"
#include "analyses.hpp"

using std::cout, std::endl;
using std::string;

int main(int argc, char** argv) {
    Curl a;
    string option = argv[1];
    a.init();
    
    if (option == "analyses") {
        Analyses analyses;
        cout << analyses.analyse(argv[2], argv[3]);
    }

    else if (option == "scan") {

        if (argc == 4) {
            Scan scan;
            cout << scan.scanUrl(argv[2], argv[3]) << endl;
        }

        else if (argc == 5) {
            Scan scan;
            cout << scan.scanFile(argv[1], argv[2], argv[3]) << endl;
        }

        else {
            cout << "Error" << endl;
        }
    }
    
    a.cleanUp();
    return 0;
}