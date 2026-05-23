from sqlalchemy import Column, Integer, String, Boolean, Float, Date, DateTime, Text
from sqlalchemy.sql import func
from .database import Base

class Milestone(Base):
    __tablename__ = "milestones"

    id = Column(Integer, primary_key=True, index=True)
    phase = Column(Integer, nullable=False)
    week_label = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, default="")
    due_date = Column(Date, nullable=True)
    completed = Column(Boolean, default=False)
    completed_at = Column(DateTime, nullable=True)


class Checkin(Base):
    __tablename__ = "checkins"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, unique=True, nullable=False)
    studied = Column(Boolean, default=True)
    hours = Column(Float, nullable=True)
    notes = Column(Text, default="")
    created_at = Column(DateTime, server_default=func.now())


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    phase = Column(Integer, nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text, default="")
    status = Column(String, default="not_started")  # not_started | in_progress | shipped | on_github
    github_url = Column(String, nullable=True)
    demo_url = Column(String, nullable=True)


class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    phase = Column(Integer, nullable=False)
    title = Column(String, nullable=False)
    url = Column(String, nullable=True)
    type = Column(String, default="course")  # course | video | competition | paper
    completed = Column(Boolean, default=False)
