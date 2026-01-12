import instaloader
import json
from pathlib import Path
import sys
import os

USERNAME = "vino.arsan"
POST_LIMIT = 10

try:
    session_file = "session-vino.arsan"
    
    L = instaloader.Instaloader(
        download_pictures=False,
        download_videos=False,
        download_video_thumbnails=False,
        download_comments=False,
        save_metadata=False,
        quiet=False,
        max_connection_attempts=3,
        request_timeout=60,
    )

    # ✅ Try to load session
    session_loaded = False
    if os.path.exists(session_file):
        try:
            L.load_session_from_file(USERNAME, session_file)
            session_loaded = True
            print("✅ Session loaded successfully")
        except Exception as e:
            print(f"⚠️ Could not load session: {e}")
    
    # If no session or session invalid, try with password from environment
    if not session_loaded:
        password = os.environ.get("INSTAGRAM_PASSWORD")
        if password:
            print("🔐 Attempting login with password...")
            L.login(USERNAME, password)
        else:
            raise Exception("No valid session and no password provided")

    # Test if we're actually logged in by trying to access profile
    try:
        profile = instaloader.Profile.from_username(L.context, USERNAME)
    except instaloader.exceptions.LoginRequiredException:
        raise Exception("Session expired and login required. Please recreate the session file.")

    posts = []
    for post in profile.get_posts():
        posts.append({
            "image": post.url,
            "caption": post.caption or "",
            "link": f"https://www.instagram.com/p/{post.shortcode}/"
        })
        if len(posts) >= POST_LIMIT:
            break

    Path("posts.json").write_text(json.dumps(posts, indent=2))
    print(f"✅ Instagram posts fetched successfully ({len(posts)} posts)")

except Exception as e:
    print("❌ ERROR fetching Instagram posts:")
    print(str(e))
    print("\n💡 Solution: Recreate your session file locally and update INSTAGRAM_SESSION_B64 secret")
    sys.exit(1)