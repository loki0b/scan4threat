#ifndef POST_HPP
#define POST_HPP

#include "request.hpp"

#define POST "POST"
#define ACCEPT_APP_JSON "accept: application/json"

// verb POST request
class Post : public Request {
private:
    std::string body;
    std::string url;
public:
    Post(std::string url, std::string body, std::string apiKey);
    ~Post();
    Response init() override;
};

#endif