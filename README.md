# Youtube Search API

This project queries latest search results and stores them in mongodb, which could be queried with `videos/getVideos` passing title, description.

Returned response supports pagination.

## Instructions
### Pull the container
`docker pull prasadkumkar/youtube-search-api:latest`

### Run the container
`docker run -p 5000:5000 -d  -e API_KEY=YOUR_YOUTUBE_API_KEY -e MONGO_USR=YOUR_MONGODB_USERNAME -e MONGO_PWD=YOUR_MONGODB_PWD --name youtube-api-1 prasadkumkar/youtube-search-api`

### See Logs
`docker logs $(docker ps -f name=youtube-api-1 -q)`

### Query videos from DB
Sample Query
`http://localhost:5000/videos/getVideos?page=3&limit=2&query=blue`<br/>
Response
```
{
    "docs": [
        {
            "_id": "6124d246a1c7da2294f7f0d9",
            "id": "VmqP-1l7eTQ",
            "title": "Blue Jays vs. Mariners Game Highlights (8/14/21) | MLB Highlights",
            "description": "Blue Jays vs. Mariners full game highlights from 8/14/21 Don't forget to subscribe! https://www.youtube.com/mlb Follow us elsewhere too: Twitter: ...",
            "publishTime": "2021-08-15T06:48:16Z",
            "thumbnailUrls": {
                "default": {
                    "url": "https://i.ytimg.com/vi/VmqP-1l7eTQ/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/VmqP-1l7eTQ/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/VmqP-1l7eTQ/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "createdAt": "2021-08-24T11:04:38.379Z",
            "updatedAt": "2021-08-24T11:04:38.379Z",
            "__v": 0
        },
        {
            "_id": "6124d247a1c7da2294f7f0db",
            "id": "VmqP-1l7eTQ",
            "title": "Blue Jays vs. Mariners Game Highlights (8/14/21) | MLB Highlights",
            "description": "Blue Jays vs. Mariners full game highlights from 8/14/21 Don't forget to subscribe! https://www.youtube.com/mlb Follow us elsewhere too: Twitter: ...",
            "publishTime": "2021-08-15T06:48:16Z",
            "thumbnailUrls": {
                "default": {
                    "url": "https://i.ytimg.com/vi/VmqP-1l7eTQ/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/VmqP-1l7eTQ/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/VmqP-1l7eTQ/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "createdAt": "2021-08-24T11:04:39.932Z",
            "updatedAt": "2021-08-24T11:04:39.932Z",
            "__v": 0
        }
    ],
    "totalDocs": 13,
    "limit": 2,
    "totalPages": 7,
    "page": 3,
    "pagingCounter": 5,
    "hasPrevPage": true,
    "hasNextPage": true,
    "prevPage": 2,
    "nextPage": 4
}
```