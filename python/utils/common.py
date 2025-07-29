def log_message(message):
    print(f"[LOG]: {message}")

def handle_error(error):
    print(f"[ERROR]: {error}")

def validate_response(response):
    if response is None:
        handle_error("Received None response")
        return False
    if not isinstance(response, dict):
        handle_error("Response is not a dictionary")
        return False
    return True