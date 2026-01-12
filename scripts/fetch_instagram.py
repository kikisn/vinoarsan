import instaloader
import json
from pathlib import Path
import sys

TARGET_USERNAME = "vino.arsan"
LOGIN_USERNAME = "poulette.anna"
POST_LIMIT = 10

try:
    L = instaloader.Instaloader(
        download_pictures=False,
        download_videos=False,
        download_video_thumbnails=False,
        download_comments=False,
        save_metadata=False,
        quiet=False,
        max_connection_attempts=1,
        request_timeout=60,
    )

    # ✅ Load session created locally
    L.load_session_from_file(LOGIN_USERNAME)
    print("✅ Session loaded")

    profile = instaloader.Profile.from_username(L.context, TARGET_USERNAME)

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
    print("❌ ERROR fetching Instagram posts")
    print(str(e))
    print("\n💡 Fix: recreate the session locally and update INSTAGRAM_SESSION_B64")
    sys.exit(1)
