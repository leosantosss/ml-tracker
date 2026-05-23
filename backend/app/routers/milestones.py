from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timezone

from ..database import get_db
from ..models import Milestone
from ..schemas import MilestoneOut, MilestonePatch

router = APIRouter(prefix="/api/milestones", tags=["milestones"])


@router.get("", response_model=list[MilestoneOut])
def get_milestones(db: Session = Depends(get_db)):
    return db.query(Milestone).order_by(Milestone.phase, Milestone.id).all()


@router.patch("/{milestone_id}", response_model=MilestoneOut)
def update_milestone(milestone_id: int, body: MilestonePatch, db: Session = Depends(get_db)):
    milestone = db.query(Milestone).filter(Milestone.id == milestone_id).first()
    if not milestone:
        raise HTTPException(status_code=404, detail="Milestone not found")

    milestone.completed = body.completed
    milestone.completed_at = datetime.now(timezone.utc) if body.completed else None
    db.commit()
    db.refresh(milestone)
    return milestone
