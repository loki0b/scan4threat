#ifndef ANALYSES_HPP
#define ANALYSES_HPP

#include <string>

// Where the api_handler will give us the analyses payload of a entity
class Analyses {
public:
    Analyses();
    ~Analyses();
    std::string analyse(std::string id, std::string apiKey);
};

#endif