#ifndef POST_HPP
#define POST_HPP

#include "request.hpp"

#define POST "POST"
#define ACCEPT_APP_JSON "accept: application/json"

class RequestPost : public Request {
private:
    std::string body;
    std::string url;
    struct curl_slist* headers;
public:
    RequestPost(std::string url, std::string body, std::string apiKey);
    ~RequestPost();
    void setHeader(std::string header);
    Response request() override;
};

#endif