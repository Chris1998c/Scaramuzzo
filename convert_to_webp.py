import os
from PIL import Image

# Cartella public del progetto (PERCORSO GIÀ CORRETTO)
folder = "C:/Users/conte/Desktop/Programmatore/scaramuzzo-hair-salon/public"

def convert_to_webp(folder_path):
    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.lower().endswith(".png"):
                full_path = os.path.join(root, file)
                
                img = Image.open(full_path).convert("RGBA")
                
                new_name = os.path.splitext(full_path)[0] + ".webp"

                img.save(new_name, "WEBP", quality=90)

                print(f"✔ Convertito: {file} → {os.path.basename(new_name)}")

    print("\n✨ Conversione completata!")

convert_to_webp(folder)
