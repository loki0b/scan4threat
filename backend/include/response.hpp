#ifndef RESPONSE_HPP
#define RESPONSE_HPP

#include <string>

class Response {
private:
    std::string response;
public:
    Response(std::string data);
    ~Response();
    std::string getMessage() const;
};

#endif