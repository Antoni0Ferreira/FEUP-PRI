#!/bin/bash

# Create a container 
# docker run --name moviehut_solr -p 8983:8983 solr:9.3

# if core already exists, delete it
docker exec moviehut_solr bin/solr delete -c movies
docker exec moviehut_solr bin/solr delete -c actors
docker exec moviehut_solr bin/solr delete -c conversations

# Create 3 Cores, define their schemas and populate them
docker exec moviehut_solr bin/solr create_core -c movies

curl -X POST -H 'Content-type:application/json' \
    --data-binary "@movie_schema.json" \
    http://localhost:8983/solr/movies/schema

curl -X POST -H 'Content-type:application/json' \
    --data-binary "@movies.json" \
    http://localhost:8983/solr/movies/update?commit=true


#-----------------#

docker exec moviehut_solr bin/solr create_core -c actors

curl -X POST -H 'Content-type:application/json' \
    --data-binary "@actors_schema.json" \
    http://localhost:8983/solr/actors/schema

curl -X POST -H 'Content-type:application/json' \
    --data-binary "@actors.json" \
    http://localhost:8983/solr/actors/update?commit=true

#-----------------#

docker exec moviehut_solr bin/solr create_core -c conversations

#curl -X POST -H 'Content-type:application/json' \
#    --data-binary "@conversations_schema.json" \
#    http://localhost:8983/solr/conversations/schema

curl -X POST -H 'Content-type:application/json' \
    --data-binary "@conversations.json" \
    http://localhost:8983/solr/conversations/update?commit=true
