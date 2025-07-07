#ifndef SCAN_HPP
#define SCAN_HPP

#include <string>

#define URL_FILE "https://www.virustotal.com/api/v3/files"
#define CONTENT_TYPE_FILE "content-type: multipart/form-data"

#define URL_URL "https://www.virustotal.com/api/v3/urls"
#define CONTENT_TYPE_URL "content-type: application/x-www-form-urlencoded"

// where the api_handler will give us the scan payload -> the id of entity scanned
class Scan {
public:
    Scan();
    ~Scan();
    std::string scanUrl(std::string body, std::string apiKey);
    std::string scanFile(std::string body, std::string base64File, std::string apiKey);
};

#endif