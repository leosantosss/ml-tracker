from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Project
from ..schemas import ProjectOut, ProjectPatch

router = APIRouter(prefix="/api/projects", tags=["projects"])


@router.get("", response_model=list[ProjectOut])
def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).order_by(Project.phase, Project.id).all()


@router.patch("/{project_id}", response_model=ProjectOut)
def update_project(project_id: int, body: ProjectPatch, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    for field, value in body.model_dump(exclude_unset=True).items():
        setattr(project, field, value)

    db.commit()
    db.refresh(project)
    return project
