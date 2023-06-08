from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class TextMessage(BaseModel):
    message: str

@app.post("/text_message")
async def process_text_message(text_message: TextMessage):
    return {"message": text_message.message}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
