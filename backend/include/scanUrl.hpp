#ifndef SCANURL_HPP
#define SCANURL_HPP

#include <string>

#define URL_URLS "https://www.virustotal.com/api/v3/urls"
#define CONTENT_TYPE_URL "content-type: application/x-www-form-urlencoded"

class ScanUrl {
private:
public:
  ScanUrl();
  ~ScanUrl();
  std::string scan(std::string body, std::string apiKey);
};

#endif