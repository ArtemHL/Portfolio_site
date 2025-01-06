import random
import string

def generate_verification_code(length: int = 6) -> str:
    randomGenerCode = ''.join(random.choices(string.digits, k=length))
    # print(f)
    return randomGenerCode

# generate_verification_code()