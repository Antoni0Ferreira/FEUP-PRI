#!/bin/bash

# Create a container 
# docker run --name moviehut_solr -p 8983:8983 solr:9.3

# Create 3 Cores
docker exec moviehut_solr bin/solr create_core -c movies
docker exec moviehut_solr bin/solr create_core -c actors
docker exec moviehut_solr bin/solr create_core -c conversations

