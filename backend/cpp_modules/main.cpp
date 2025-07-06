#include <iostream>
#include "curl.hpp"
#include "scanUrl.hpp"
#include "scanFile.hpp"

using std::cout, std::endl;

int main(int argc, char** argv) {
    Curl a;
    a.init();
    
    if (argc == 3) {
        ScanUrl scan;
        cout << scan.scan(argv[1], argv[2]) << endl;
    }

    else if (argc == 4) {
        ScanFile scan;
        cout << scan.scan(argv[1], argv[2], argv[3]) << endl;
    }

    else {
        cout << "Error" << endl;
    }
    
    a.cleanUp();
    return 0;
}