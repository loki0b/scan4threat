#include "post.hpp"
#include <curl/curl.h>
#include <curl/easy.h>

using std::string;

Post::Post(string url, string body, string apiKey) : Request(), body(body), url(url) {
    string key = "x-apikey: " + apiKey;

    setHeader(ACCEPT_APP_JSON);
    setHeader(key.c_str());
};

Post::~Post() {
   ;
};

Response Post::init() {
    CURL* handle;
    CURLcode retCode;
    string data;
    
    handle = getHandle();

    curl_easy_setopt(handle, CURLOPT_URL, url.c_str());
    curl_easy_setopt(handle, CURLOPT_HTTPHEADER, getHeader());
    curl_easy_setopt(handle, CURLOPT_WRITEFUNCTION, writeData);
    curl_easy_setopt(handle, CURLOPT_WRITEDATA, &data);
    
    //body = "data: value"
    string temp = "url=" + body;
    curl_easy_setopt(handle, CURLOPT_POSTFIELDS, temp.c_str());

    retCode = curl_easy_perform(handle);

    Response response(data);    
    return response;
};
