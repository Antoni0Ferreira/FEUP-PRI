#!/bin/bash

docker run --name moviehut_solr -d -p 8983:8983 solr:9.3 -Dsolr.ltr.enabled=true

# if core already exists, delete it
docker exec moviehut_solr bin/solr delete -c conversations

# create core 
docker exec moviehut_solr bin/solr create_core -c conversations

docker cp namesynonyms.txt moviehut_solr:/var/solr/data/conversations/name_synonyms.txt
docker cp othersynonyms.txt moviehut_solr:/var/solr/data/conversations/other_synonyms.txt

docker cp ltr/ltr-plugin.xml moviehut_solr:/var/solr/data/conversations/ltr-plugin.xml

docker exec moviehut_solr bash -c "sed -i $'/<\/config>/{e cat /var/solr/data/conversations/ltr-plugin.xml\n}' /var/solr/data/conversations/conf/solrconfig.xml"

curl -X POST -H 'Content-type:application/json' \
    --data-binary "@schemas/conversations_schema.json" \
    http://localhost:8983/solr/conversations/schema

# Upload features for LTR
curl -XPUT 'http://localhost:8983/solr/conversations/schema/feature-store' --data-binary "@ltr/ltr_features.json" -H 'Content-type:application/json'

# Upload model for LTR
curl -XPUT 'http://localhost:8983/solr/conversations/schema/model-store' --data-binary "@ltr/ltr_model.json" -H 'Content-type:application/json'

# this is done this way because of the limit on the number of characters in a curl command
for file in semantic/semantic_conversations_{0..16}.json; do
    curl -X POST -H 'Content-type:application/json' \
    --data-binary "@$file" \
    http://localhost:8983/solr/conversations/update?commit=true
done

#docker exec moviehut_solr bin/solr restart -f -Dsolr.ltr.enabled=true
