import base64
import cv2
import numpy as np
from deepface import DeepFace

def get_face_encoding(image_file):
    """
    Given an image file (BytesIO), return the face encoding as a numpy array using DeepFace Facenet model.
    """
    try:
        # Read the BytesIO to a numpy array (OpenCV format)
        file_bytes = np.asarray(bytearray(image_file.read()), dtype=np.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        
        # Extract embeddings using Facenet model with RetinaFace backend for highest detection accuracy
        results = DeepFace.represent(img_path=img, model_name="Facenet", detector_backend="retinaface", enforce_detection=True)
        
        if results and len(results) > 0:
            # We take the first detected face's embedding
            return np.array(results[0]["embedding"])
    except Exception as e:
        print(f"Face extraction error: {e}")
        
    return None

def get_cosine_distance(a, b):
    """
    Calculate the mathematical cosine distance between two 1D numpy arrays.
    Returns a value between 0 and 2. Lower is more similar.
    """
    a = np.array(a)
    b = np.array(b)
    if np.linalg.norm(a) == 0 or np.linalg.norm(b) == 0:
        return 1.0
    return 1 - np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def compare_faces(known_encodings, face_to_check_encoding, threshold=0.40):
    """
    Compare a list of known face encodings against a candidate encoding.
    Returns a list of booleans indicating if each known face matches the candidate.
    Facenet cosine distance threshold is typically 0.40.
    """
    if not known_encodings or face_to_check_encoding is None:
        return []
    
    matches = []
    for known in known_encodings:
        distance = get_cosine_distance(known, face_to_check_encoding)
        matches.append(distance <= threshold)
        
    return matches

def get_face_distances(known_encodings, face_to_check_encoding):
    """
    Get the cosine distance for each known face against the candidate.
    """
    if not known_encodings or face_to_check_encoding is None:
        return []
    
    return [get_cosine_distance(known, face_to_check_encoding) for known in known_encodings]

def decode_base64_image(data_url):
    """
    Decode a base64 data URL to a numpy array (OpenCV format).
    """
    try:
        _, encoded = data_url.split(',', 1)
        image_data = base64.b64decode(encoded)
        nparr = np.frombuffer(image_data, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        return frame
    except Exception:
        return None
