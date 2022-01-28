import aiohttp_cors
import json


from aiohttp import web
from aiohttp_cors.resource_options import ResourceOptions


from py_server.u256_handler import u256_handler


INDEX_HTML = """
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <!-- Dependencies -->
    <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;1,400;1,600&family=Source+Code+Pro:ital,wght@0,400;0,600;1,400;1,600&family=Ubuntu:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet">

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
    <!-- End Dependencies -->

    <link rel="stylesheet" href="./index.css">
</head>

<body>


    <script src="./index.js"></script>
    <!-- <script src="https://unpkg.com/tx_browser/build/index.min.js"></script> -->
</body>

</html>
"""

# TODO
# dirname = os.path.dirname(__file__)
# CSS = os.path.join(dirname, '..', 'dev', 'index.css')
# JS = os.path.join(dirname, '..', 'dev', 'index.js')


async def u256_route(request: web.Request):

    data = await request.json()

    result = u256_handler(data)

    resp = web.Response(content_type="application/json",
                        body=json.dumps(result))

    return resp


async def index(request):
    return web.Response(content_type="text/html", text=INDEX_HTML)


async def css(request):
    # p = os.path.abspath('..', 'dev')
    # print(p)
    with open('/home/kairat/tx_browser/dev/index.css', 'r') as f:
        _css = f.read()
        return web.Response(text=_css)


async def js(request):
    pass


def init_func(argv):
    app = web.Application()

    if 'dev' in argv:
        cors = aiohttp_cors.setup(app)
        resource = cors.add(app.router.add_resource("/u256"))
        cors.add(
            resource.add_route("POST", u256_route), {
                "http://localhost:5500": aiohttp_cors.ResourceOptions(
                    allow_credentials=True,
                    expose_headers=("X-Custom-Server-Header",),
                    allow_headers=(
                        "X-Requested-With",
                        "Content-Type",
                        "Access-Control-Allow-Origin"
                    ),
                    max_age=3600,
                )
            })
    # cors.add(route)
        app.add_routes([
            web.get('/', index),
            web.get('/index.css', css),
            web.get('/index.js', js),
        ])
    else:
        app.add_routes([
            web.get('/', index),
            web.post('/u256', u256_route),
            web.get('/index.css', css),
            web.get('/index.js', js),
        ])

    print(argv)

    return app

# async def main():
#     app = web.Application()

#     pass


# if __name__ == "__main__":
#     try:
#         asyncio.run(main())
#     except KeyboardInterrupt:
#         print("KEYBOARD_INTERRUPT")
