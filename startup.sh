#!/bin/bash

# Create a container 
#docker run --name moviehut_solr -p 8983:8983 solr:9.3

# if core already exists, delete it
docker exec moviehut_solr bin/solr delete -c movies
docker exec moviehut_solr bin/solr delete -c actors
docker exec moviehut_solr bin/solr delete -c conversations
docker exec moviehut_solr bin/solr delete -c complex_actors
docker exec moviehut_solr bin/solr delete -c complex_conversations
docker exec moviehut_solr bin/solr delete -c complex_movies
docker exec moviehut_solr bin/solr delete -c simple_actors
docker exec moviehut_solr bin/solr delete -c simple_conversations
docker exec moviehut_solr bin/solr delete -c simple_movies

# Create 6 Cores, define their schemas and populate them
docker exec moviehut_solr bin/solr create_core -c simple_movies

curl -X POST -H 'Content-type:application/json' \
    --data-binary "@simple_movie_schema.json" \
    http://localhost:8983/solr/simple_movies/schema

curl -X POST -H 'Content-type:application/json' \
    --data-binary "@movies.json" \
    http://localhost:8983/solr/simple_movies/update?commit=true
    
#-----------------#

docker exec moviehut_solr bin/solr create_core -c complex_movies

docker cp namesynonyms.txt moviehut_solr:/var/solr/data/complex_movies/namesynonyms.txt
docker cp othersynonyms.txt moviehut_solr:/var/solr/data/complex_movies/othersynonyms.txt

curl -X POST -H 'Content-type:application/json' \
    --data-binary "@complex_movie_schema.json" \
    http://localhost:8983/solr/complex_movies/schema

curl -X POST -H 'Content-type:application/json' \
    --data-binary "@movies.json" \
    http://localhost:8983/solr/complex_movies/update?commit=true

#-----------------#

docker exec moviehut_solr bin/solr create_core -c simple_actors

curl -X POST -H 'Content-type:application/json' \
    --data-binary "@simple_actors_schema.json" \
    http://localhost:8983/solr/simple_actors/schema

curl -X POST -H 'Content-type:application/json' \
    --data-binary "@actors.json" \
    http://localhost:8983/solr/simple_actors/update?commit=true

#-----------------#

docker exec moviehut_solr bin/solr create_core -c simple_conversations

curl -X POST -H 'Content-type:application/json' \
    --data-binary "@simple_conversation_schema.json" \
    http://localhost:8983/solr/simple_conversations/schema

curl -X POST -H 'Content-type:application/json' \
    --data-binary "@conversations.json" \
    http://localhost:8983/solr/simple_conversations/update?commit=true

#-----------------#

docker exec moviehut_solr bin/solr create_core -c complex_actors

docker cp namesynonyms.txt moviehut_solr:/var/solr/data/complex_actors/namesynonyms.txt

curl -X POST -H 'Content-type:application/json' \
    --data-binary "@complex_actors_schema.json" \
    http://localhost:8983/solr/complex_actors/schema

curl -X POST -H 'Content-type:application/json' \
    --data-binary "@actors.json" \
    http://localhost:8983/solr/complex_actors/update?commit=true

#-----------------#

docker exec moviehut_solr bin/solr create_core -c complex_conversations

docker cp namesynonyms.txt moviehut_solr:/var/solr/data/complex_conversations/namesynonyms.txt
docker cp othersynonyms.txt moviehut_solr:/var/solr/data/complex_conversations/othersynonyms.txt

curl -X POST -H 'Content-type:application/json' \
    --data-binary "@complex_conversation_schema.json" \
    http://localhost:8983/solr/complex_conversations/schema

curl -X POST -H 'Content-type:application/json' \
    --data-binary "@conversations.json" \
    http://localhost:8983/solr/complex_conversations/update?commit=true
