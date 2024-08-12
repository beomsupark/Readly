#!/usr/bin/env python
# coding: utf-8

# In[15]:

from fastapi import FastAPI
import pandas as pd
import numpy as np
import faiss
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer , util

embedder = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
df = pd.read_csv("./books.csv",encoding='cp949').fillna(" ")
sentences = df['D']
embeddings = embedder.encode(sentences)
index = faiss.IndexFlatL2(embeddings.shape[1]) # 초기화 : 벡터의 크기를 지정
index.add(embeddings) # 임베딩을 추가 
app = FastAPI()

class InnerObject(BaseModel):
    foo: int

class OuterObject(BaseModel):
    bar: list[InnerObject]


@app.post("/ai/recommand", response_model=OuterObject)
async def root(query: str):
    top_k = 10
    query_embedding = embedder.encode(query, normalize_embeddings=True ,convert_to_tensor=False)
    distances, indices = index.search(np.expand_dims(query_embedding,axis=0),top_k)
    temp = df.iloc[indices[0][0]].BookNum
    objects = []
    objects.append(InnerObject(foo=df.iloc[indices[0][0]].BookNum))
    objects.append(InnerObject(foo=df.iloc[indices[0][1]].BookNum))
    objects.append(InnerObject(foo=df.iloc[indices[0][2]].BookNum))
    objects.append(InnerObject(foo=df.iloc[indices[0][3]].BookNum))
    objects.append(InnerObject(foo=df.iloc[indices[0][4]].BookNum))
    objects.append(InnerObject(foo=df.iloc[indices[0][5]].BookNum))
    return OuterObject(bar=objects)


# In[ ]:





# In[ ]:





# In[ ]:

