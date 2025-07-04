#include <iostream>
#include <cstdlib>
#include "curl.hpp"
#include "post.hpp"
#include "response.hpp"

int main(int argc, char** argv) {
    const char* varName = "API_KEY";
    const char* envVar = getenv(envVar);
    const char apiKey[] = "e1b7b92e4a808ed5627dac50b1fc2aa4f003950b4da1c68ad98b158514ff4ebb";

    Curl a;
    a.init();
    RequestPost b("https://www.virustotal.com/api/v3/urls", argv[1], apiKey);
    
    Response c = b.request();
    std::cout << c.getMessage() << std::endl;
    a.cleanUp();
    return 0;
}