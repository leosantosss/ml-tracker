from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from .database import engine, Base
from .routers import milestones, checkins, projects, resources, stats

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ML Roadmap Tracker")

allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(milestones.router)
app.include_router(checkins.router)
app.include_router(projects.router)
app.include_router(resources.router)
app.include_router(stats.router)
