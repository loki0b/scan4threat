#include <curl/curl.h>
#include "get.hpp"
#include "post.hpp"
#include "request.hpp"
#include <iostream>

#define URL "https://www.virustotal.com/api/v3/analyses/"

using std::string;

Get::Get(string data, string apiKey): Request(), data(data) {
    string key = "x-apikey: " + apiKey;

    setHeader(ACCEPT_APP_JSON);
    setHeader(key.c_str());
}

Get::~Get() {

}

Response Get::init() {
    CURL* handle;
    CURLcode retCode;
    string data;
    string url = URL + this->data;
    std::cout << url << std::endl;

    handle = getHandle();

    curl_easy_setopt(handle, CURLOPT_URL, url.c_str());
    curl_easy_setopt(handle, CURLOPT_HTTPHEADER, getHeader());
    curl_easy_setopt(handle, CURLOPT_WRITEFUNCTION, writeData);
    curl_easy_setopt(handle, CURLOPT_WRITEDATA, &data);

    retCode = curl_easy_perform(handle);

    Response response(data);    
    return response;
}

CURL *hnd = curl_easy_init();

//curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "GET");






CURLcode ret = curl_easy_perform(hnd);