#include "post.hpp"

using std::string;

RequestPost::RequestPost(string url, string body, string apiKey) : Request(url, apiKey), body(body) {
    string key = "x-apikey: " + apiKey;
    
    this->headers = nullptr;
    this->headers = curl_slist_append(headers, "accept: application/json");
    this->headers = curl_slist_append(headers, key.c_str());
    this->headers = curl_slist_append(headers, "content-type: application/x-www-form-urlencoded");
};

RequestPost::~RequestPost() {
    curl_slist_free_all(headers);
};

Response RequestPost::request() {
    CURL* handle;
    CURLcode retCode;
    string data;
    
    handle = getHandle();

    curl_easy_setopt(handle, CURLOPT_URL, getUrl().c_str());
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
