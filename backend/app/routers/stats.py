from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date, timedelta

from ..database import get_db
from ..models import Milestone, Checkin
from ..schemas import StatsOut

router = APIRouter(prefix="/api/stats", tags=["stats"])

GOAL_DATE = date(2026, 8, 24)


@router.get("", response_model=StatsOut)
def get_stats(db: Session = Depends(get_db)):
    milestones = db.query(Milestone).all()

    total = len(milestones)
    completed = sum(1 for m in milestones if m.completed)
    overall_pct = round((completed / total) * 100, 1) if total > 0 else 0.0

    phases = {1, 2, 3}
    phase_pcts = {}
    for phase in phases:
        phase_milestones = [m for m in milestones if m.phase == phase]
        phase_total = len(phase_milestones)
        phase_done = sum(1 for m in phase_milestones if m.completed)
        phase_pcts[phase] = round((phase_done / phase_total) * 100, 1) if phase_total > 0 else 0.0

    today = date.today()
    streak = 0
    check_date = today
    while True:
        checkin = db.query(Checkin).filter(Checkin.date == check_date, Checkin.studied == True).first()
        if not checkin:
            break
        streak += 1
        check_date -= timedelta(days=1)

    days_remaining = max((GOAL_DATE - today).days, 0)

    return StatsOut(
        overall_pct=overall_pct,
        phase_pcts=phase_pcts,
        streak=streak,
        days_remaining=days_remaining,
        total_milestones=total,
        completed_milestones=completed,
    )
