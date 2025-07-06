#include "request.hpp"
#include "response.hpp"
#include <cstddef>
#include <curl/curl.h>

using std::string;

Request::Request() {
    this->handle = curl_easy_init();
    headers = nullptr;
}

Request::~Request() {
     curl_slist_free_all(headers);
    curl_easy_cleanup(handle);    
}

size_t Request::writeData(void* buffer, size_t size, size_t nmemb, void* userdata) {
    size_t totalSize;
    string *data;
    
    totalSize = size * nmemb;
    data = static_cast<string*>(userdata);
    data->append(static_cast<char*>(buffer), totalSize);

    return totalSize;
};

CURL* Request::getHandle() const {
    return handle;
};

Response Request::init() {
    return Response("");
};

struct curl_slist* Request::getHeader() const {
    return headers;
}

void Request::setHeader(string header) {
    headers = curl_slist_append(headers, header.c_str());
}
