# plants-for-pets-backend
반려동물을 위한 식물정보 backend

mariaDB 테이블구조
plant: id, name, engName, desc, img
harmful: id, plantId, animalType, harmfulLevel, msg
- animal type : cat | dog
- harmful level : 00 정보없음 10 안전 20 주의 30 위험 40 심각

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
  "plantDto": {
    "name": "식물이름",
    "engName": "식물영어이름",
    "desc": "식물정보",
    "img": "이미지 url"
  },
  "harmful": [
    {
      "animalType": "cat",
      "harmfulLevel": "00",
      "msg": "고양이관련 내용"
    }
  ]
}
```

[PUT]
- 식물정보 수정
`/plants/:id`
```
{
  "plantDto": {
    "engName": "수정할 내용",
  },
}
```

[PUT]
- 식물관련 동물타입 정보수정
`/plants/:id/:type`

 위험도 테이블에 해당정보가 없을 경우 새로 생성. 생성시 level값은 필수
```
{
  "harmful": {
    "msg": "수정할 내용"
  }
}
```

[DELETE]
- 해당 식물정보 삭제 (CASCADE로 harmful테이블 관련 정보도 같이 삭제)
`/plants/:id` 
- 해당 해로운 영향 정보 삭제
`/plants/harmful/:id`