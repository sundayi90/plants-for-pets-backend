# plants-for-pets-backend
반려동물을 위한 식물정보 backend

mariaDB 테이블구조
plant: id, name, engName, desc, img
toxic: id, plantId, petType, toxicLevel, msg
- pet type : cat | dog
- Toxic level : 00 정보없음 10 안전 20 주의 30 위험 40 심각

[GET]
- 모든 식물 정보 가져오기
`/plants`

- 해당 식물 정보 가져오기
`/plants/:id`

- 식물 검색하기
`/plants/search?name='식물이름'`

- 동물별(필수), 위험도별(선택) 정보 가져오기
`/plants/to/:type`
`/plants/to/:type?level='위험도'`

[POST]
- 신규 식물정보 추가(반려동물 영향정보까지)
`/plants`
```
{
  "name": "몬스테라",
  "engName": "Monstera",
  "desc": "공기 정화에 좋은 식물",
  "species": "Araceae",
  "petToxicities": [
    {
      "petType": "dog",
      "toxicLevel": "주의",
      "msg": "섭취 시 구토와 설사를 유발할 수 있음"
    },
    {
      "petType": "cat",
      "toxicLevel": "위험",
      "msg": "섭취 시 심각한 중독 증상이 발생할 수 있음"
    }
  ]
}
```

[PATCH]
- 식물정보 수정
`/plants/:id`
```
{
  "desc": "반려동물에게 주의가 필요한 식물",
  "petToxicities": [
    {
      "petType": "dog",
      "toxicLevel": "위험",
      "msg": "섭취 시 심각한 중독 증상이 발생할 수 있음"
    }
  ]
}
```

[PUT]
- 식물관련 동물타입 정보수정
`/plants/:id/:type`

 위험도 테이블에 해당정보가 없을 경우 새로 생성. 생성시 level값은 필수
```
{
  "toxicDto": {
    "msg": "수정할 내용"
  }
}
```

[DELETE]
- 해당 식물정보 삭제 (CASCADE로 Toxic테이블 관련 정보도 같이 삭제)
`/plants/:id` 
- 해당 해로운 영향 정보 삭제
`/plants/toxic/:id`