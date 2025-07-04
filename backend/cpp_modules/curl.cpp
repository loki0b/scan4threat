#include <curl/curl.h>
#include "curl.hpp"

Curl::Curl() {
    ;
}

Curl::~Curl() {
    ;
}

void Curl::init() {
    curl_global_init(CURL_GLOBAL_ALL);
}

void Curl::cleanUp() {
    curl_global_cleanup();
}