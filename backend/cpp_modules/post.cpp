#include "post.hpp"
#include <curl/curl.h>
#include <curl/easy.h>

using std::string;

RequestPost::RequestPost(string url, string body, string apiKey) : Request(apiKey), body(body), url(url) {
    string key = "x-apikey: " + apiKey;

    this->headers = nullptr;
    this->headers = curl_slist_append(headers, ACCEPT_APP_JSON);
    this->headers = curl_slist_append(headers, key.c_str());
};

RequestPost::~RequestPost() {
    curl_slist_free_all(headers);
};

Response RequestPost::request() {
    CURL* handle;
    CURLcode retCode;
    string data;
    
    handle = getHandle();

    curl_easy_setopt(handle, CURLOPT_URL, url.c_str());
    curl_easy_setopt(handle, CURLOPT_HTTPHEADER, headers);
    curl_easy_setopt(handle, CURLOPT_WRITEFUNCTION, writeData);
    curl_easy_setopt(handle, CURLOPT_WRITEDATA, &data);
    
    //body = "data: value"
    string temp = "url=" + body;
    curl_easy_setopt(handle, CURLOPT_POSTFIELDS, temp.c_str());

    retCode = curl_easy_perform(handle);

    Response response(data);    
    return response;
};

void RequestPost::setHeader(string header) {
    headers = curl_slist_append(headers, header.c_str());
}