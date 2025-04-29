# Mobility Hackathon

## How to use


Clone repository
```sh
git clone https://github.com/calmestend/veu-hackathon    
```

Run API
You need to modify the file ".env" (veu-hackathon/api/.env)
```sh 
    cd veu-hackathon/api
    npm i && npm run start
```

Run desktop app in GNU/Linux
```sh
    cd veu-hackathon/app
    npm i && npm run tauri dev
```

Run AI Model
```sh
    cd veu-hackathon/deepface-emotions
    
    # Enable virtual environment
    python -m venv .venv
    ./.venv/source/activate

    # Install dependencies
    pip install opencv-python deepface numpy tqdm tf-keras
    python app.py input_video.mp4 --output output_video.mp4 --skip 5
```

