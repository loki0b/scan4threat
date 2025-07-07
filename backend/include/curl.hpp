#ifndef CURL_HPP
#define CURL_HPP

// encapsulating curl lib c
class Curl {
public:
    Curl();
    ~Curl();
    void init();
    void cleanUp();
};

#endif