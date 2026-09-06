Put your background video here as techweek-bg.mp4
(or update the BG_VIDEO path in src/components/FocusSection.jsx to match
whatever filename you use).

Tips for a smooth autoplay background video:
- Keep it under ~10MB if you can — big files delay the first paint.
- Export as H.264 .mp4, no audio track needed (browsers require autoplay
  videos to be muted anyway).
- 1920x1080 or lower is plenty since it's stretched behind text, not
  shown full-size.
