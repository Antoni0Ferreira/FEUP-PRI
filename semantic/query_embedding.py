import requests
from sentence_transformers import SentenceTransformer


def solr_text_query(endpoint, collection, query):
    url = f"{endpoint}/{collection}/select"

    data = {
        "q": query,
        "fl": "id,movie,score,transcript",
        "sort": "score desc, imdb_votes desc, imdb_rating desc",
        "defType": "edismax",
        "qf":"transcript^10.0 movie^5.0 actors^3 characters^3 actors_synonyms^1.0 characters_synonyms^1.0",
        "pf":"transcript^10.0 movie^5.0 actors^3 characters^3 actors_synonyms^1.0 characters_synonyms^1.0",
        "ps" : "2",
        "rows": 30,
        "wt": "json"
    }

    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    response = requests.post(url, data=data, headers=headers)
    response.raise_for_status()
    return response.json()


def text_to_embedding(text):
    model = SentenceTransformer('all-MiniLM-L6-v2')
    embedding = model.encode(text, convert_to_tensor=False).tolist()
    
    # Convert the embedding to the expected format
    embedding_str = "[" + ",".join(map(str, embedding)) + "]"
    return embedding_str

def solr_knn_query(endpoint, collection, embedding, query):
    url = f"{endpoint}/{collection}/select"

    data = {
        "q": f"{{!knn f=vector topK=10}}{embedding}",
        "fl": "id,movie,score,transcript",
        "rq": "{!rerank reRankQuery=$rqq reRankDocs=80000 reRankWeight=3}",
        "rqq": "{!edismax qf=transcript pf=transcript}" + query ,
        "rows": 10,
        "wt": "json"
    }
    
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    
    response = requests.post(url, data=data, headers=headers)
    response.raise_for_status()
    return response.json()

def merge_results(results_text, results_semantic):
    merged_results = {doc["id"]: doc for doc in results_semantic}
    
    for doc in results_text:
        if doc["id"] not in merged_results:
            merged_results[doc["id"]] = doc
    
    return list(merged_results.values())

def display_results(results):
    docs = results.get("response", {}).get("docs", [])
    if not docs:
        print("No results found.")
        return

    for doc in docs:
        print(f"* {doc.get('id')} {doc.get('movie')} {doc.get('transcript')} [score: {doc.get('score'):.2f}]")

def get_results(results):
    docs = results.get("response", {}).get("docs", [])
    if not docs:
        print("No results found.")
        return
    else:
        return docs
    
def main():
    solr_endpoint = "http://localhost:8983/solr"
    collection = "semantic_conversations"
    
    query_text = input("Enter your query: ")
    embedding = text_to_embedding(query_text)

    try:
        semantic_results = solr_knn_query(solr_endpoint, collection, embedding, query_text)
        #display_results(semantic_results)
    except requests.HTTPError as e:
        print(f"Error {e.response.status_code}: {e.response.text}")
        
    #---------------------#

    collection = "complex_conversations"
    try:
        # Regular Text Search
        text_results = solr_text_query(solr_endpoint, collection, query_text)
        print("\nRegular Text Search Results:")
        #display_results(text_results)
    except requests.HTTPError as e:
        print(f"Error {e.response.status_code}: {e.response.text}")
    
    
    merged_results = merge_results(get_results(text_results), get_results(semantic_results))
    
    print("\nMerged Results:")
    display_results({"response": {"docs": merged_results}})
    

if __name__ == "__main__":
    main()
