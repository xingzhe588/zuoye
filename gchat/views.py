from django.http import JsonResponse, HttpResponse
from django.conf import settings
from gigachat import GigaChat
from gigachat.models import Chat, ChatCompletion, Choices, Messages, MessagesRole
import re
import requests
import uuid
# import json

# Create your views here.
def main(request):
    return JsonResponse({"message": "Hello World"})

def generate(request):
    return JsonResponse({"message": "Answer"})

def get_prompt(request):
    prompt = request.GET.get('prompt', '')
    with  GigaChat(credentials=settings.GIGACHAT_API_KEY, verify_ssl_certs=False) as giga:
        # получаю токен
        rq_uid = str(uuid.uuid4())

        url = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth"

        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'RqUID': rq_uid,
            'Authorization': f'Basic {settings.GIGACHAT_API_KEY}'
        }

        payload={
            'scope': 'GIGACHAT_API_PERS'
        }

        response_token = requests.post(url, headers=headers, data=payload, verify=False)
        giga_token = response_token.json()['access_token']
        print(giga_token)
        #giga_token = ''

        # делаю запрос на создание картинки
        response = giga.chat(Chat(
            messages=[
                Messages(
                    role=MessagesRole.SYSTEM,
                    content='Ты — Василий Кандинский'
                ),
                Messages(
                    role=MessagesRole.USER,
                    content=prompt
                )
            ],
            function_call='auto'
        ))
        
        # получаю картинку
        regex = '<img src="(.*?)"'

        img_src = re.findall(regex, response.choices[0].message.content)
        headers_img = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {giga_token}',
        }
        
        response_img = requests.get(f'https://gigachat.devices.sberbank.ru/api/v1/files/{img_src[0]}/content', headers=headers_img, verify=False)
        
        with open(f'{img_src[0]}.jpg', 'wb') as f:
            f.write(response_img.content)

        return HttpResponse(response_img.content, content_type='image/png')