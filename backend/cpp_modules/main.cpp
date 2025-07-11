#include <iostream>
#include "curl.hpp"
#include "post.hpp"
#include "response.hpp"

int main(int argc, char** argv) {
    Curl a;
    a.init();
    RequestPost b("https://www.virustotal.com/api/v3/urls", argv[1], argv[2]);
    
    Response c = b.request();
    std::cout << c.getMessage() << std::endl;
    a.cleanUp();
    return 0;
}