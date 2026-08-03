import contextlib
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.dashboard import router as dashboard_router
from routes.chat import router as chat_router
from routes.health_score import router as health_router
from routes.company import router as company_router
from routes.auth import router as auth_router
from routes.reports import router as reports_router

@contextlib.asynccontextmanager
async def lifespan(app: FastAPI):
    # init_db()
    yield


app = FastAPI(
    title="Virtual COO",
    version="1.0.0",
    lifespan=lifespan
)

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

app.include_router(auth_router)
app.include_router(chat_router)
app.include_router(health_router)
app.include_router(company_router)
app.include_router(dashboard_router)


@app.get("/")
def home():
    return {
        "message": "Virtual COO Running 🚀"
    }