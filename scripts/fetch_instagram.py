import instaloader
import json
from pathlib import Path
import sys

USERNAME = "vino.arsan"
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

    # ✅ LOAD SAVED SESSION (CRITICAL)
    L.load_session_from_file("vino.arsan")

    profile = instaloader.Profile.from_username(L.context, USERNAME)

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
    print("✅ Instagram posts fetched successfully")

except Exception as e:
    print("❌ ERROR fetching Instagram posts:")
    print(str(e))
    sys.exit(1)
