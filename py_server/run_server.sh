#!/bin/sh

python -m aiohttp.web -H localhost -P 12345 py_server.main:init_func dev