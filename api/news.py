"""
GET /api/news - 저장된 뉴스 데이터 반환 (Vercel Serverless Function)
"""

import json
import os
from typing import Dict, Any

def handler(request) -> Dict[str, Any]:
    """Vercel Serverless Function"""

    try:
        # data/news_latest.json 읽기
        with open('data/news_latest.json', 'r', encoding='utf-8') as f:
            data = json.load(f)

        # 카테고리 필터링
        category = request.args.get('category')
        if category:
            data['articles'] = [
                a for a in data['articles']
                if a.get('category') == category
            ]

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(data, ensure_ascii=False)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
