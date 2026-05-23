from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

# ── Milestones ──────────────────────────────────────────────────────────────

class MilestoneOut(BaseModel):
    id: int
    phase: int
    week_label: str
    title: str
    description: str
    due_date: Optional[date]
    completed: bool
    completed_at: Optional[datetime]

    model_config = {"from_attributes": True}

class MilestonePatch(BaseModel):
    completed: bool

# ── Check-ins ────────────────────────────────────────────────────────────────

class CheckinCreate(BaseModel):
    date: date
    studied: bool = True
    hours: Optional[float] = None
    notes: str = ""

class CheckinOut(BaseModel):
    id: int
    date: date
    studied: bool
    hours: Optional[float]
    notes: str
    created_at: datetime

    model_config = {"from_attributes": True}

# ── Projects ─────────────────────────────────────────────────────────────────

class ProjectOut(BaseModel):
    id: int
    phase: int
    name: str
    description: str
    status: str
    github_url: Optional[str]
    demo_url: Optional[str]

    model_config = {"from_attributes": True}

class ProjectPatch(BaseModel):
    status: Optional[str] = None
    github_url: Optional[str] = None
    demo_url: Optional[str] = None

# ── Resources ────────────────────────────────────────────────────────────────

class ResourceOut(BaseModel):
    id: int
    phase: int
    title: str
    url: Optional[str]
    type: str
    completed: bool

    model_config = {"from_attributes": True}

class ResourcePatch(BaseModel):
    completed: bool

# ── Stats ─────────────────────────────────────────────────────────────────────

class StatsOut(BaseModel):
    overall_pct: float
    phase_pcts: dict[int, float]
    streak: int
    days_remaining: int
    total_milestones: int
    completed_milestones: int
