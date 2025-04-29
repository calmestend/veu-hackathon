import cv2
import os
import numpy as np
from deepface import DeepFace
from tqdm import tqdm

def analyze_video_emotions(video_path, output_path, skip_frames=5):
    """
    Analiza las emociones en un video usando DeepFace y sobrepone los resultados.
    
    Args:
        video_path: Ruta al video MP4 de entrada
        output_path: Ruta donde guardar el video resultante
        skip_frames: Número de frames para saltar (para acelerar el proceso)
    """
    # Verificar que el archivo existe
    if not os.path.exists(video_path):
        print(f"El archivo {video_path} no existe.")
        return
    
    # Abrir el video
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Error al abrir el video {video_path}")
        return
    
    # Obtener información del video
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    # Configurar el codec y escritor de video
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
    
    # Colores para las emociones (en formato BGR)
    emotion_colors = {
        'angry': (0, 0, 255),    # Rojo
        'disgust': (0, 140, 255), # Naranja
        'fear': (0, 255, 255),   # Amarillo
        'happy': (0, 255, 0),    # Verde
        'sad': (255, 0, 0),      # Azul
        'surprise': (255, 0, 255), # Magenta
        'neutral': (255, 255, 255) # Blanco
    }
    
    frame_count = 0
    
    # Procesar el video frame por frame con barra de progreso
    with tqdm(total=total_frames, desc="Procesando video") as pbar:
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            
            frame_count += 1
            pbar.update(1)
            
            # Analizar solo cada N frames para reducir el tiempo de procesamiento
            if frame_count % skip_frames != 0:
                out.write(frame)
                continue
            
            # Crear una copia del frame para dibujar encima
            result_frame = frame.copy()
            
            try:
                # Analizar el frame con DeepFace
                analysis = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
                
                # Si hay detecciones de rostros
                if analysis:
                    for face_analysis in analysis:
                        # Obtener las coordenadas del rostro
                        if 'region' in face_analysis:
                            x = face_analysis['region']['x']
                            y = face_analysis['region']['y']
                            w = face_analysis['region']['w']
                            h = face_analysis['region']['h']
                            
                            # Obtener la emoción dominante
                            emotions = face_analysis['emotion']
                            dominant_emotion = max(emotions, key=emotions.get)
                            dominant_score = emotions[dominant_emotion]
                            
                            # Dibujar rectángulo alrededor del rostro
                            color = emotion_colors.get(dominant_emotion, (255, 255, 255))
                            cv2.rectangle(result_frame, (x, y), (x+w, y+h), color, 3)  # Grosor aumentado a 3
                            
                            # Mejorar la visibilidad del texto de la emoción dominante
                            text = f"{dominant_emotion.upper()}: {dominant_score:.2f}"
                            text_size = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 0.9, 2)[0]
                            
                            # Dibujar un rectángulo de fondo para el texto
                            cv2.rectangle(result_frame, 
                                        (x, y-text_size[1]-10), 
                                        (x+text_size[0]+10, y), 
                                        (0, 0, 0), -1)  # Fondo negro
                            
                            # Texto con mayor tamaño y grosor
                            cv2.putText(result_frame, text, (x+5, y-10), 
                                      cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)
                            
                            # Mostrar todas las emociones en una barra lateral con mejor visibilidad
                            bar_height = 25  # Aumentar altura de la barra
                            start_y = y
                            
                            # Dibujar un panel de fondo para todas las emociones
                            panel_width = 230  # Ancho fijo para el panel
                            panel_height = bar_height * len(emotions)
                            cv2.rectangle(result_frame,
                                        (x+w+10, start_y),
                                        (x+w+10+panel_width, start_y+panel_height),
                                        (0, 0, 0), -1)  # Fondo negro
                            
                            # Margen para el texto y las barras
                            margin = 5
                            
                            for emotion, score in emotions.items():
                                emotion_color = emotion_colors.get(emotion, (255, 255, 255))
                                
                                # Calcular ancho de barra proporcional al score pero con un mínimo visible
                                bar_width = max(int(150 * score), 5)
                                
                                # Dibujar barra de emoción
                                cv2.rectangle(result_frame, 
                                           (x+w+10+margin, start_y+margin), 
                                           (x+w+10+margin+bar_width, start_y+bar_height-margin), 
                                           emotion_color, -1)
                                
                                # Añadir texto de la emoción con mejor visibilidad
                                emotion_text = f"{emotion}: {score:.2f}"
                                cv2.putText(result_frame, emotion_text, 
                                          (x+w+10+margin+bar_width+5, start_y+bar_height-margin-5), 
                                          cv2.FONT_HERSHEY_SIMPLEX, 0.6, emotion_color, 2)
                                
                                start_y += bar_height
            
            except Exception as e:
                print(f"Error en frame {frame_count}: {str(e)}")
            
            # Escribir el frame resultante
            out.write(result_frame)
    
    # Liberar recursos
    cap.release()
    out.release()
    print(f"Análisis completado. Video guardado en {output_path}")

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Analiza emociones en un video usando DeepFace")
    parser.add_argument("input_video", help="Ruta al video MP4 de entrada")
    parser.add_argument("--output", "-o", default="output_video.mp4", help="Ruta para guardar el video resultante")
    parser.add_argument("--skip", "-s", type=int, default=5, help="Número de frames para saltar")
    
    args = parser.parse_args()
    
    analyze_video_emotions(args.input_video, args.output, args.skip)
