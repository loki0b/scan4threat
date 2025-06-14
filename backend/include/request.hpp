#ifndef REQUEST_HPP
#define REQUEST_HPP

#include <string>
#include "response.hpp"

class Request {
private:
    std::string url;
    size_t writeData(char* ptr, size_t size, size_t nmemb, void* userdata);
public:
    Request(std::string url);
    ~Request();
    virtual Response request();
};

#endif