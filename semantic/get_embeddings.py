import sys
import json
from sentence_transformers import SentenceTransformer

# Load the SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

def get_embedding(text):
    # The model.encode() method already returns a list of floats
    return model.encode(text, convert_to_tensor=False).tolist()

if __name__ == "__main__":
    # Read JSON from STDIN
    data = json.load(sys.stdin)

    # Update each document in the JSON data
    for document in data:
        # Extract fields if they exist, otherwise default to empty strings
        characters = document.get("characters", "")
        movie = document.get("movie", "")
        genres = document.get("genres", "")
        actors = document.get("actors", "")
        transcript = document.get("transcript", "")
        
        # transform list characters to string
        characters = " ".join(characters)
        # transform list genres to string
        genres = " ".join(genres)
        # transform list actors to string
        actors = " ".join(actors)
    
        combined_text = characters + " " + movie + " " + genres + " " + actors + " " + transcript
        document["vector"] = get_embedding(combined_text)

    # Output updated JSON to STDOUT
    json.dump(data, sys.stdout, indent=4, ensure_ascii=False)
