#include "scanUrl.hpp"
#include "post.hpp"
#include "response.hpp"

using std::string;

ScanUrl::ScanUrl() {
  ;
}

ScanUrl::~ScanUrl() {
  ;
}

string ScanUrl::scan(string body, string apiKey) {
  RequestPost req(URL_URLS, body, apiKey);
  req.setHeader(CONTENT_TYPE_URL);

  Response b = req.request();

  return b.getMessage();
}