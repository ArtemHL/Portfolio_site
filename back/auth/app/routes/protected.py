from fastapi import APIRouter, Depends
from ..security import security

router = APIRouter()

@router.get("/protected")
def protected(auth=Depends(security.token_required())):
    return {"data": "Shhii"}
