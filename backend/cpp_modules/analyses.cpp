#include "analyses.hpp"
#include "get.hpp"
#include "response.hpp"

using std::string;

Analyses::Analyses() {}
Analyses::~Analyses() {}

string Analyses::analyse(string id, string apiKey) {
    Get request(id, apiKey);
    
    Response b = request.init();

    return b.getMessage();
}