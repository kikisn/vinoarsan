import instaloader
import json
from pathlib import Path

USERNAME = "vino.arsan"
POST_LIMIT = 10

L = instaloader.Instaloader(
    download_pictures=False,
    download_videos=False,
    download_video_thumbnails=False,
    download_comments=False,
    save_metadata=False,
    quiet=True,
)

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
