import sys
import json
from sentence_transformers import SentenceTransformer

# Load the SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

def get_embedding(text):
    # The model.encode() method already returns a list of floats
    return model.encode(text, convert_to_tensor=False).tolist()

def process_documents(documents):
    for document in documents:
        transcript = document.get("transcript","")
        combined_text = transcript
        document["vector"] = get_embedding(combined_text)
    return documents

def main():
    file_path = "json/conversations.json"
    with open(file_path, "r") as f:
        data = json.load(f)
    
    chunk_size = 5000
    num_docs = len(data)
    num_chunks = (num_docs + chunk_size - 1) // chunk_size
    
    for i in range(num_chunks):
        start_index = i * chunk_size
        end_index = min((i + 1) * chunk_size, num_docs)
        chunk = data[start_index:end_index]
        
        processed_chunk = process_documents(chunk)
        output_path = f"semantic/semantic_conversations_{i}.json"
        
        with open(output_path, "w", encoding='utf-8') as f:
            json.dump(processed_chunk, f, indent=4, ensure_ascii=False)
        
        print(f"Processed {end_index} documents.")
    
        

if __name__ == "__main__":
    main()
