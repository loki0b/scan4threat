#ifndef GET_HPP
#define GET_HPP

#include "request.hpp"

class requestGet : public Request {
private:
public:
    requestGet();
    ~requestGet();
    Response request() override;
};

#endif