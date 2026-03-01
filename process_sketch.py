from PIL import Image
import sys

def process_sketch(input_path, output_path, color="moss"):
    """Convert a black-on-white sketch to a transparent colored version."""
    colors = {
        "moss": (74, 94, 62),      # #4a5e3e - matches contour lines
        "amber": (196, 162, 78),    # #c4a24e - matches accent color
        "leather": (122, 92, 58),   # #7a5c3a - matches secondary accent
    }
    
    r_t, g_t, b_t = colors.get(color, colors["moss"])
    
    img = Image.open(input_path).convert("RGBA")
    
    # Crop whitespace
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    
    # Resize to max 600px wide
    if img.width > 600:
        img = img.resize((600, int(600 * img.height / img.width)), Image.LANCZOS)
    
    pixels = img.load()
    w, h = img.size
    
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            brightness = (r + g + b) / 3
            
            if brightness > 210:
                pixels[x, y] = (0, 0, 0, 0)  # transparent
            else:
                ink_opacity = int((1 - brightness / 255) * 220)
                pixels[x, y] = (r_t, g_t, b_t, min(ink_opacity, 200))
    
    img.save(output_path)
    print(f"Saved {output_path} ({w}x{h})")

if __name__ == "__main__":
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else "output.png"
    color = sys.argv[3] if len(sys.argv) > 3 else "moss"
    process_sketch(input_file, output_file, color)