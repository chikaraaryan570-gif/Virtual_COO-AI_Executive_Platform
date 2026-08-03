from fastapi import APIRouter, HTTPException, Depends, Header
from firebase_admin import auth as firebase_auth

router = APIRouter(prefix="/api/auth", tags=["auth"])

def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing.")
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format.")
    
    token = authorization.split(" ")[1]
    
    try:
        decoded_token = firebase_auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid or expired token: {str(e)}")

@router.get("/me")
def get_me(user = Depends(get_current_user)):
    return {"user": user}
