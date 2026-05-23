from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Resource
from ..schemas import ResourceOut, ResourcePatch

router = APIRouter(prefix="/api/resources", tags=["resources"])


@router.get("", response_model=list[ResourceOut])
def get_resources(db: Session = Depends(get_db)):
    return db.query(Resource).order_by(Resource.phase, Resource.id).all()


@router.patch("/{resource_id}", response_model=ResourceOut)
def update_resource(resource_id: int, body: ResourcePatch, db: Session = Depends(get_db)):
    resource = db.query(Resource).filter(Resource.id == resource_id).first()
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")

    resource.completed = body.completed
    db.commit()
    db.refresh(resource)
    return resource
