#ifndef REQUEST_HPP
#define REQUEST_HPP

#include <string>
#include <curl/curl.h>
#include "response.hpp"

class Request {
private:
    CURL* handle;
    struct curl_slist* headers;
protected:
    static size_t writeData(void* buffer, size_t size, size_t nmemb, void* userdata);
public:
    Request();
    virtual ~Request();
    virtual Response init();
    CURL* getHandle() const;
    struct curl_slist* getHeader() const; 
    void setHeader(std::string header);
};

#endif