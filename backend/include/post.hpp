#ifndef POST_HPP
#define POST_HPP

#include "request.hpp"

#define POST "POST"

class RequestPost : public Request {
private:
    std::string body;
    struct curl_slist *headers;
public:
    RequestPost(std::string url, std::string body);
    ~RequestPost();
    Response request() override;
};

#endif