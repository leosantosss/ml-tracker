from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Checkin
from ..schemas import CheckinCreate, CheckinOut

router = APIRouter(prefix="/api/checkins", tags=["checkins"])


@router.get("", response_model=list[CheckinOut])
def get_checkins(db: Session = Depends(get_db)):
    return db.query(Checkin).order_by(Checkin.date.desc()).all()


@router.post("", response_model=CheckinOut)
def upsert_checkin(body: CheckinCreate, db: Session = Depends(get_db)):
    existing = db.query(Checkin).filter(Checkin.date == body.date).first()

    if existing:
        existing.studied = body.studied
        existing.hours = body.hours
        existing.notes = body.notes
    else:
        existing = Checkin(**body.model_dump())
        db.add(existing)

    db.commit()
    db.refresh(existing)
    return existing
