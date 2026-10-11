#!/usr/bin/env python3
"""
Regenerates the Open Agents favicon set.

The previous icons were rasterised from Twitter's Twemoji 2764.svg (the red
heart emoji), which shipped as the browser-tab icon. This script renders the
current brand mark instead: a rounded indigo tile containing a terminal
prompt glyph (">_").

Usage:  python scripts/generate-favicon.py
"""

from pathlib import Path

from PIL import Image, ImageDraw

PUBLIC_DIR = Path(__file__).resolve().parent.parent / "public"

# Brand colours — strict monochrome, square (matches the zero-radius UI)
TILE = (0, 0, 0)
GLYPH = (255, 255, 255)
OUTLINE = (255, 255, 255)

SUPERSAMPLE = 8


def render(size: int) -> Image.Image:
    """Render the mark at `size` px with supersampled antialiasing."""
    s = size * SUPERSAMPLE
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))

    tile = Image.new("RGB", (s, s), TILE)

    mask = Image.new("L", (s, s), 0)
    ImageDraw.Draw(mask).rectangle((0, 0, s - 1, s - 1), fill=255)
    img.paste(tile, (0, 0), mask)

    # Terminal prompt ">" + underscore
    draw = ImageDraw.Draw(img)

    # Hairline outline so the black tile stays legible on dark browser chrome.
    hairline = max(1, round(s * 0.045))
    draw.rectangle(
        (hairline // 2, hairline // 2, s - 1 - hairline // 2, s - 1 - hairline // 2),
        outline=OUTLINE,
        width=hairline,
    )
    stroke = max(1, round(s * 0.095))

    def p(x, y):
        return (s * x, s * y)

    draw.line([p(0.33, 0.30), p(0.555, 0.50), p(0.33, 0.70)],
              fill=GLYPH, width=stroke, joint="curve")
    draw.line([p(0.585, 0.70), p(0.79, 0.70)],
              fill=GLYPH, width=stroke)

    # Round the stroke caps so the chevron reads as a clean glyph.
    r = stroke / 2
    for x, y in [(0.33, 0.30), (0.33, 0.70), (0.585, 0.70), (0.79, 0.70)]:
        cx, cy = p(x, y)
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=GLYPH)

    return img.resize((size, size), Image.LANCZOS)


def main():
    sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "apple-touch-icon.png": 180,
        "android-chrome-192x192.png": 192,
        "android-chrome-512x512.png": 512,
    }

    for name, size in sizes.items():
        out = PUBLIC_DIR / name
        render(size).save(out, "PNG")
        print(f"wrote {out.relative_to(PUBLIC_DIR.parent)} ({size}x{size})")

    # Multi-resolution .ico for legacy browsers
    ico = render(64)
    ico.save(PUBLIC_DIR / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("wrote public/favicon.ico (16/32/48)")


if __name__ == "__main__":
    main()
