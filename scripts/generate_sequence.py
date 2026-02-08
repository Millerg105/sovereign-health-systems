from PIL import Image, ImageDraw, ImageFont
import os
import math

# Configuration
WIDTH = 1920
HEIGHT = 1080
FRAMES = 120
OUTPUT_DIR = "../public/sequence"
BG_COLOR = "#050505"
CYAN = "#22d3ee"
BLUE = "#2563eb"
NAVY = "#1e3a8a"

def ensure_dir(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

def draw_frame(frame_num):
    # progress 0.0 to 1.0
    p = frame_num / FRAMES
    
    img = Image.new('RGB', (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    
    # Center: The Pulse (The "Heartbeat" of the clinic)
    center_x, center_y = WIDTH // 2, HEIGHT // 2
    
    # Grid lines (The Foundation) - Fade in 0.0 - 0.2
    grid_alpha = int(255 * min(1, p * 5))
    if grid_alpha > 0:
        step = 100
        for x in range(0, WIDTH, step):
            draw.line([(x, 0), (x, HEIGHT)], fill=f"#1e3a8a{grid_alpha:02x}", width=1)
        for y in range(0, HEIGHT, step):
            draw.line([(0, y), (WIDTH, y)], fill=f"#1e3a8a{grid_alpha:02x}", width=1)

    # Main Dashboard Container - Expands from center 0.1 - 0.4
    if p > 0.1:
        dash_p = min(1, (p - 0.1) * 3) # 0 to 1
        dash_w = 1200 * dash_p
        dash_h = 800 * dash_p
        rect = [
            center_x - dash_w // 2,
            center_y - dash_h // 2,
            center_x + dash_w // 2,
            center_y + dash_h // 2
        ]
        draw.rounded_rectangle(rect, radius=20, outline=CYAN, width=2)
        
        # Header Bar
        if p > 0.2:
            header_h = 60
            draw.line([(rect[0], rect[1] + header_h), (rect[2], rect[1] + header_h)], fill=CYAN, width=1)
            # Fake URL
            draw.text((rect[0] + 20, rect[1] + 20), "sovereign.systems/intelligence", fill=CYAN)

    # Widgets - Pop in 0.3 - 0.6
    if p > 0.3:
        # Left Panel (Missed Calls)
        panel_p = min(1, (p - 0.3) * 3)
        px, py = center_x - 500, center_y - 200
        pw, ph = 300, 400
        draw.rectangle([px, py, px + pw, py + ph * panel_p], outline=BLUE, width=2)
        if panel_p > 0.8:
            draw.text((px + 20, py + 20), "MISSED CALLS", fill=BLUE)
            draw.text((px + 20, py + 60), "12 DETECTED", fill="white", font_size=30)
            
        # Right Panel (Bookings)
        px2 = center_x + 200
        draw.rectangle([px2, py, px2 + pw, py + ph * panel_p], outline=BLUE, width=2)
        if panel_p > 0.8:
            draw.text((px2 + 20, py + 20), "REVENUE RECOVERED", fill=BLUE)
            draw.text((px2 + 20, py + 60), "£2,450", fill=CYAN)

    # Data Streams - scrolling lines 0.5 - 1.0
    if p > 0.5:
        chart_p = min(1, (p - 0.5) * 2)
        # Draw a graph line
        points = []
        for i in range(100):
            x = center_x - 400 + (i * 8)
            # sin wave growing
            base_y = center_y + 200
            amp = 50 * chart_p
            y = base_y - abs(math.sin(i * 0.2 + p * 10) * amp)
            points.append((x, y))
        
        if len(points) > 1:
            draw.line(points, fill=CYAN, width=3)

    return img

def main():
    print(f"Generating {FRAMES} frames into {OUTPUT_DIR}...")
    ensure_dir(OUTPUT_DIR)
    
    for i in range(FRAMES):
        img = draw_frame(i)
        filename = f"{OUTPUT_DIR}/frame_{i}.webp"
        img.save(filename, "WEBP")
        if i % 10 == 0:
            print(f"Generated frame {i}/{FRAMES}")
            
    print("Done! Sequence generated.")

if __name__ == "__main__":
    main()
