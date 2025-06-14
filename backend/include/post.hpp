#ifndef POST_HPP
#define POST_HPP

#include "request.hpp"

class requestPost : public Request {
private:
public:
    requestPost();
    ~requestPost();
    Response request() override;
};

#endif