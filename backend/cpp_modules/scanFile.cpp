#include "scanFile.hpp"
#include "post.hpp"
#include "response.hpp"

using std::string;

ScanFile::ScanFile() {
  ;
}

ScanFile::~ScanFile() {
  ;
}

string ScanFile::scan(string body, string apiKey, string base64File) {
  RequestPost req(URL_FILES, body, apiKey);
  req.setHeader(CONTENT_TYPE_FILE);

  Response b = req.request();

  return b.getMessage();
}