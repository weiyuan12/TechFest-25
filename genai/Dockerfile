FROM python:3.12-slim

WORKDIR /python-server

COPY ./requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

EXPOSE 5173

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
