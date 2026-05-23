from datetime import date
from .database import SessionLocal
from .models import Milestone, Project, Resource


def seed():
    db = SessionLocal()

    try:
        if db.query(Milestone).count() > 0:
            print("Database already seeded, skipping.")
            return

        # ── Milestones ────────────────────────────────────────────────────────

        milestones = [
            # Phase 1
            Milestone(phase=1, week_label="Week 1-2", title="Andrew Ng ML Specialization — Course 1",
                      description="Supervised learning, regression, gradient descent", due_date=date(2026, 6, 1)),
            Milestone(phase=1, week_label="Week 1-2", title="Andrew Ng ML Specialization — Course 2",
                      description="Advanced algorithms, bias-variance tradeoff, regularization", due_date=date(2026, 6, 1)),
            Milestone(phase=1, week_label="Week 1-2", title="Andrew Ng ML Specialization — Course 3",
                      description="Unsupervised learning, recommenders, reinforcement learning", due_date=date(2026, 6, 1)),
            Milestone(phase=1, week_label="Week 1-2", title="Kaggle Pandas micro-course",
                      description="Data manipulation with Pandas", due_date=date(2026, 6, 1)),
            Milestone(phase=1, week_label="Week 1-2", title="Kaggle Intro to ML micro-course",
                      description="Decision trees, model validation, underfitting vs overfitting", due_date=date(2026, 6, 1)),

            # Phase 2
            Milestone(phase=2, week_label="Week 3-4", title="Karpathy micrograd video",
                      description="Build autograd engine from scratch, understand backpropagation", due_date=date(2026, 6, 14)),
            Milestone(phase=2, week_label="Week 3-6", title="PyTorch official tutorials",
                      description="Tensors, autograd, building neural networks in PyTorch", due_date=date(2026, 7, 10)),
            Milestone(phase=2, week_label="Week 3-6", title="fast.ai lessons 1-5",
                      description="Practical deep learning, image classification, SGD from scratch", due_date=date(2026, 7, 10)),
            Milestone(phase=2, week_label="Week 5", title="Project: MNIST CNN from scratch",
                      description="Build and train a CNN on MNIST using PyTorch", due_date=date(2026, 6, 30)),
            Milestone(phase=2, week_label="Week 6", title="Project: Kaggle House Prices pipeline",
                      description="End-to-end ML pipeline, feature engineering, submission", due_date=date(2026, 7, 7)),
            Milestone(phase=2, week_label="Week 7", title="Kaggle Playground competition entry",
                      description="Enter a Kaggle Playground competition and submit predictions", due_date=date(2026, 7, 10)),

            # Phase 3
            Milestone(phase=3, week_label="Week 8-9", title="fast.ai lessons 5-8",
                      description="NLP, tabular data, collaborative filtering, foundations", due_date=date(2026, 8, 3)),
            Milestone(phase=3, week_label="Week 10", title="Capstone: Fine-tune ResNet/EfficientNet",
                      description="Custom image dataset, transfer learning, training loop", due_date=date(2026, 8, 10)),
            Milestone(phase=3, week_label="Week 11", title="Capstone: FastAPI backend wrapper",
                      description="Serve model predictions via a REST API", due_date=date(2026, 8, 14)),
            Milestone(phase=3, week_label="Week 11", title="Capstone: Dockerize",
                      description="Containerize the full app with Docker", due_date=date(2026, 8, 17)),
            Milestone(phase=3, week_label="Week 12", title="Capstone: Deploy live",
                      description="Deploy to Railway or Render, get a public URL", due_date=date(2026, 8, 21)),
            Milestone(phase=3, week_label="Week 13", title="GitHub polish",
                      description="Clean READMEs, screenshots, live demo links for every project", due_date=date(2026, 8, 23)),
            Milestone(phase=3, week_label="Week 14", title="Read: Attention Is All You Need",
                      description="Original transformer paper", due_date=date(2026, 8, 24)),
            Milestone(phase=3, week_label="Week 14", title="Read: Original ResNet paper",
                      description="Deep Residual Learning for Image Recognition", due_date=date(2026, 8, 24)),
        ]

        # ── Projects ──────────────────────────────────────────────────────────

        projects = [
            Project(phase=1, name="ML Roadmap Tracker",
                    description="This app — full-stack progress tracker built with React + FastAPI", status="in_progress"),
            Project(phase=2, name="MNIST CNN",
                    description="Convolutional neural network trained on MNIST from scratch in PyTorch", status="not_started"),
            Project(phase=2, name="Kaggle House Prices",
                    description="End-to-end ML pipeline for the Kaggle House Prices competition", status="not_started"),
            Project(phase=2, name="Kaggle Playground Competition",
                    description="Entry in a Kaggle Playground Series competition", status="not_started"),
            Project(phase=3, name="CV Capstone",
                    description="Fine-tuned ResNet/EfficientNet with FastAPI backend, Dockerized and deployed live", status="not_started"),
        ]

        # ── Resources ─────────────────────────────────────────────────────────

        resources = [
            Resource(phase=1, title="Andrew Ng ML Specialization",
                     url="https://www.coursera.org/specializations/machine-learning-introduction", type="course"),
            Resource(phase=1, title="Kaggle Pandas micro-course",
                     url="https://www.kaggle.com/learn/pandas", type="course"),
            Resource(phase=1, title="Kaggle Intro to ML micro-course",
                     url="https://www.kaggle.com/learn/intro-to-machine-learning", type="course"),
            Resource(phase=2, title="PyTorch official tutorials",
                     url="https://pytorch.org/tutorials", type="course"),
            Resource(phase=2, title="fast.ai Practical Deep Learning",
                     url="https://course.fast.ai", type="course"),
            Resource(phase=2, title="Karpathy micrograd",
                     url="https://www.youtube.com/watch?v=VMj-3S1tku0", type="video"),
            Resource(phase=2, title="Kaggle Playground competitions",
                     url="https://www.kaggle.com/competitions?hostSegment=playground", type="competition"),
            Resource(phase=3, title="fast.ai Practical Deep Learning (lessons 5-8)",
                     url="https://course.fast.ai", type="course"),
            Resource(phase=3, title="Attention Is All You Need",
                     url="https://arxiv.org/abs/1706.03762", type="paper"),
            Resource(phase=3, title="Deep Residual Learning for Image Recognition",
                     url="https://arxiv.org/abs/1512.03385", type="paper"),
        ]

        db.add_all(milestones)
        db.add_all(projects)
        db.add_all(resources)
        db.commit()
        print("Database seeded successfully.")

    finally:
        db.close()


if __name__ == "__main__":
    from .database import engine, Base
    Base.metadata.create_all(bind=engine)
    seed()
