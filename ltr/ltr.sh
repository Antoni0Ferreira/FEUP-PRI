#!/bin/bash

curl -XGET 'http://localhost:8983/solr/conversations/schema/model-store'

# Delete old features 

curl -XDELETE 'http://localhost:8983/solr/conversations/schema/feature-store/_DEFAULT_'

# Delete old models

curl -XDELETE 'http://localhost:8983/solr/conversations/schema/model-store/myModel'

#reload the collection

curl -XPOST 'http://localhost:8983/solr/conversations/update?commit=true'

# Upload features for LTR
curl -XPUT 'http://localhost:8983/solr/conversations/schema/feature-store' --data-binary "@ltr_features.json" -H 'Content-type:application/json'

# Upload model for LTR
curl -XPUT 'http://localhost:8983/solr/conversations/schema/model-store' --data-binary "@ltr_model.json" -H 'Content-type:application/json'

# reload the collection

curl -XPOST 'http://localhost:8983/solr/conversations/update?commit=true'