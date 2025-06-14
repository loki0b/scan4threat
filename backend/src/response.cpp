#include "response.hpp"

using std::string;

Response::Response(string data) {
    this->response = data;
};

Response::~Response() {

};

string Response::getMessage() const {
    return response;
}