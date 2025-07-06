#ifndef ANALYSES_HPP
#define ANALYSES_HPP

#include <string>

class Analyses {
public:
    Analyses();
    ~Analyses();
    std::string analyse(std::string id, std::string apiKey);
};

#endif