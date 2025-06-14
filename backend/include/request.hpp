#ifndef REQUEST_HPP
#define REQUEST_HPP

#include <string>
#include <curl/curl.h>
#include "response.hpp"

class Request {
private:
    CURL* handle;
    std::string url;
protected:
    static size_t writeData(void* buffer, size_t size, size_t nmemb, void* userdata);
public:
    Request(std::string url);
    virtual ~Request();
    virtual Response request();
    CURL* getHandle() const;
    std::string getUrl() const;
};

#endif