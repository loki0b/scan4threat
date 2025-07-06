#ifndef REQUEST_HPP
#define REQUEST_HPP

#include <string>
#include <curl/curl.h>
#include "response.hpp"

class Request {
private:
    CURL* handle;
    std::string apiKey;
protected:
    static size_t writeData(void* buffer, size_t size, size_t nmemb, void* userdata);
public:
    Request(std::string apiKey);
    virtual ~Request();
    virtual Response request();
    CURL* getHandle() const;
    std::string getApikey() const;
};

#endif