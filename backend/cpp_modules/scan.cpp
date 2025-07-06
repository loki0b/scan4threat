#include "scan.hpp"
#include "post.hpp"
#include "response.hpp"

using std::string;

Scan::Scan() {
    ;
}

Scan::~Scan() {
    ;
}

string Scan::scanUrl(string body, string apiKey) {
    Post request(URL_URL, body, apiKey);
    request.setHeader(CONTENT_TYPE_URL);

    Response b = request.init();

    return b.getMessage();
}

string Scan::scanFile(string body, string base64File, string apiKey) {
    Post request(URL_FILE, body, apiKey);
    request.setHeader(CONTENT_TYPE_FILE);

    Response b = request.init();

    return b.getMessage();
}