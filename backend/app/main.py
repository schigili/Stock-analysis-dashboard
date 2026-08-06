from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.stock import router as stock_router

app = FastAPI(
    title="Stock Analysis Dashboard API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stock_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to the Stock Analysis Dashboard API!"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }