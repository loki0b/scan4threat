#ifndef GET_HPP
#define GET_HPP

#include "request.hpp"

// verb GET request
class Get : public Request {
private:
    std::string data;
public:
    Get(std::string data, std::string apiKey);
    ~Get();
    Response init() override;
};

#endif
