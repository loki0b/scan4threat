#include "request.hpp"

using std::string;

Request::Request(string url) {
    this->url = url;
    this->handle = curl_easy_init();
}

Request::~Request() {
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

string Request::getUrl() const {
    return url;
};

Response Request::request() {
    Response a("a");
    return a;
};