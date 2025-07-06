#ifndef SCANFILE_HPP
#define SCANFILE_HPP

#include <string>

#define URL_FILES "https://www.virustotal.com/api/v3/files"
#define CONTENT_TYPE_FILE "content-type: multipart/form-data"

class ScanFile {
private:
public:
  ScanFile();
  ~ScanFile();
  std::string scan(std::string body, std::string apiKey, std::string base64File);
};

#endif