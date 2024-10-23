Instructions to run the server:

1. Create .env file inside server folder and copy contents from example.env
    Command:
        cd server
        mv example.env .env
2. Modify contents of .env
3. Move to /src
    Command:
        cd src
4. Install libraries
    Command:
        pip install -r requirements.txt
5. Run the server
    Command:
        fastapi dev main.py
