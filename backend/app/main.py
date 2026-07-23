from fastapi import FastAPI
from app.api.stock import router as stock_router

app = FastAPI(
    title="Stock Analysis Dashboard API",
    version="1.0.0"
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